import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import config from '../config/config';
import TopBar from '../Components/TopBar';
import { Container, Form, Image, Button} from 'react-bootstrap';
import SendIcon from '@mui/icons-material/Send';
import {useQuery, useQueryClient } from 'react-query';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useHistory } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import profilephoto from '../Images/profilephoto.png';
import '../Styles/messages.scss';
import { useForm } from "react-hook-form";
import styled from 'styled-components'
import {SocketContext} from '../context/socket';
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

const VideoChat = ({match}) => {
    //const [yourID, setYourID] = useState("");
    //const [users, setUsers] = useState({});
    const [stream,setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false);


    const userVideo = useRef()
    const partnerVideo = useRef();
    const socket = useContext(SocketContext)

    const setRoom = () => {
        const userid = localStorage.getItem("user_id")
        const conversationid = match.params.id
        socket.emit("join room",{userid, conversationid})
    }



    useEffect(() => { 
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
            setStream(stream);
            if (userVideo.current) {
              userVideo.current.srcObject = stream;
            }
          })
          setRoom()
          socket.on("callReceived", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
          })

        return (() => {socket.off()})
    }, [])

    const callPeer = (id) => {
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
    
        peer.on("signal", data => {
          socket.current.emit("callUser", { userToCall: id, signalData: data, from: yourID })
        })
    
        peer.on("stream", stream => {
          if (partnerVideo.current) {
            partnerVideo.current.srcObject = stream;
          }
        });
    
        socket.current.on("callAccepted", signal => {
          setCallAccepted(true);
          peer.signal(signal);
        })
    
      }

      const acceptCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });
        peer.on("signal", data => {
          socket.current.emit("acceptCall", { signal: data, to: caller })
        })
    
        peer.on("stream", stream => {
          partnerVideo.current.srcObject = stream;
        });
    
        peer.signal(callerSignal);
      }

      const acceptCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });
        peer.on("signal", data => {
          socket.current.emit("acceptCall", { signal: data, to: caller })
        })
    
        peer.on("stream", stream => {
          partnerVideo.current.srcObject = stream;
        });
    
        peer.signal(callerSignal);
      }

      let UserVideo;
      if (stream) {
        UserVideo = (
          <Video playsInline muted ref={userVideo} autoPlay />
        );
      }
    
      let PartnerVideo;
      if (callAccepted) {
        PartnerVideo = (
          <Video playsInline ref={partnerVideo} autoPlay />
        );
      }
    
      let incomingCall;
      if (receivingCall) {
        incomingCall = (
          <div>
            <h1>{caller} is calling you</h1>
            <button onClick={acceptCall}>Accept</button>
          </div>
        )
      }

      return (
        <Container>
          <Row>
            {UserVideo}
            {PartnerVideo}
          </Row>
          <Row>
            {Object.keys(users).map(key => {
              if (key === yourID) {
                return null;
              }
              return (
                <button onClick={() => callPeer(key)}>Call {key}</button>
              );
            })}
          </Row>
          <Row>
            {incomingCall}
          </Row>
        </Container>
      );
    

}

export default VideoChat;

