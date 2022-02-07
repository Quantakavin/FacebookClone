import React, { useEffect, useState, useRef, useContext } from 'react';
//import './App.css';
import TopBar from '../Components/TopBar';
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import CallEndIcon from '@mui/icons-material/CallEnd';
import CallIcon from '@mui/icons-material/Call';
import { useHistory } from "react-router-dom";
import {SocketContext} from '../context/socket';

const Container = styled.div`
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #e3e8ee;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  background-color: #23272A;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 81vh;
`;

const BottomMenu = styled.div`
background-color: #e3e8ee;
bottom: 0px;
display: flex;
align-items: center;
justify-content: center;
width: "100%";
padding-bottom: 15;
`

function VideoChat({match}) {
  //const [yourID, setYourID] = useState("");
  //const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useContext(SocketContext)
  const history = useHistory();

  const conversationid = match.params.id

  const setRoom = () => {
    const userid = localStorage.getItem("user_id")
    //const conversationid = match.params.id
    socket.emit("join room",{userid, conversationid})
}

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })

    setRoom();

    socket.on("callReceived", (data) => {
      if (data.from != localStorage.getItem("username")) {
        setReceivingCall(true);
        setCaller(data.from)
        setCallerSignal(data.signal);
      }
    })

    return (() => {    
      if (stream != null) {
        stream.getTracks().forEach(function(track) {
          track.stop();
        })
        
      }
    })
  }, []);

  const callPeer = (id)  =>{
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socket.emit("callUser", {signalData: data, from: localStorage.getItem("username")})
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", signal => {
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
      socket.emit("acceptCall", { signal: data })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  const stopVideoOnly = (stream) => {
    stream.getTracks().forEach(function(track) {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    });
  }

  const stopAudioOnly = (stream) => {
    stream.getTracks().forEach(function(track) {
        if (track.readyState == 'live' && track.kind === 'audio') {
            track.stop();
        }
    });
}

const restartStream = () => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    setStream(stream);
    if (userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  })
}

  const leaveConversation = () => {
    stream.getTracks().forEach(function(track) {
      track.stop();
    });
    history.push(`/messages/${conversationid}`)
  }

  return (
    <>
        <header>
            <TopBar />
        </header>
        {(receivingCall && !callAccepted)?      
       <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>:<></>}
    <Container>
      <Row>
        {stream ? <Video playsInline muted ref={userVideo} autoPlay /> : <></>}
        {callAccepted ? <Video playsInline ref={partnerVideo} autoPlay />: <></>}
      </Row>
      {/*
      <Row>
        {Object.keys(users).map(key => {
          if (key === yourID) {
            return null;
          }
          return (
            <button onClick={() => callPeer(key)}>Call {key}</button>
          );
        })}
      </Row>*/}
      {/*
      <Row>
        {incomingCall}
      </Row>*/}
      <BottomMenu>
        {
          !callAccepted ? <button onClick={() => callPeer(localStorage.getItem("user_id"))} style={{backgroundColor: "#5cb85c", color:"white", marginTop: "1%", marginBottom: "1%", borderRadius:"50%", padding: 10}}><CallIcon fontSize="large"/></button> :
          <button onClick={() => leaveConversation()} style={{backgroundColor: "#d9534f", color:"white", marginTop: "1%", marginBottom: "1%", borderRadius:"50%", padding: 10}}><CallEndIcon fontSize="large"/></button>
        }
      </BottomMenu>
    </Container>
    </>
  );
}

export default VideoChat;