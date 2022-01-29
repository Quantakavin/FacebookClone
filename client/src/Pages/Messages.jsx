import React, { useState, useEffect, useContext } from 'react';
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
//import { io } from "socket.io-client";
import styled from 'styled-components'
import {SocketContext} from '../context/socket';


const ConversationsList = ()  => {
    const history = useHistory();

    const { isLoading, error, data } = useQuery(['conversationList'], async () =>
    await axios.get(`${config.baseURL}/conversations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    })
    ) 

    if (error) {
        console.log(error)
        return <p style={{color: "#838383"}}>No content to display</p> 
    }
    return (
        <>
        <div style={{backgroundColor: "white", paddingTop: 15}}>
            <h4 style={{textAlign: "center", borderBottom: "solid 1px #d3d3d3", paddingBottom: 15}}>Conversations</h4>
            {isLoading? <></>:
            <>
            {data.data.rows.map(conversation => 
            <div key={conversation.conversationid} onClick = {()=>{history.push(`/messages/${conversation.conversationid}`)}} className="conversationbox" style={{display: "flex", flexDirection: "row", borderBottom: "solid 1px #d3d3d3", paddingTop: 15, paddingBottom: 15, paddingLeft: "5%", paddingRight: "5%"}}>
                <div style={{flexGrow: 1}}>{conversation.picurl==null ? <Image src={profilephoto}  roundedCircle width="50px" height="50px" /> : <Image src={conversation.picurl}  roundedCircle width="50px" height="50px"/> }</div>
                <div style={{flexGrow: 4}}>
                    <p style={{textTransform: "capitalize", fontWeight: "bold", textAlign: "left"}}>{conversation.name}</p> 
                </div>
            </div>
            )}
            </>
        }
        </div>
        </>
    )
}


const Messages = ({ match }) => { 
    const [messages, setMessages] = useState();
    const [messagesLoading, setMessagesLoading] = useState(true);
    const [socketMessages, setSocketMessages] = useState([]);
    const [socketMessageLoading, setSocketMessagesLoading] = useState(false);
    const socket = useContext(SocketContext);

    const conversationQuery = useQuery(['currentConversation', match.params.id], async () =>
    await axios.get(`${config.baseURL}/conversation/${match.params.id}`,  {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
    })
    ) 

    const getMessages = () => {
        axios.get(`${config.baseURL}/messages/${match.params.id}`,  {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => {
            setMessages(response.data);
            setMessagesLoading(false);
        })
        .catch(error => {
            console.log(error);
            setMessagesLoading(false);
        })
    }

    const setRoom = () => {
        const userid = localStorage.getItem("user_id")
        const conversationid = match.params.id
        socket.emit("join room",{userid, conversationid})
    }

    const saveMessage = (message) => {
        axios.post(`${config.baseURL}/message/${match.params.id}`, {content: message} , {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })


    }

    useEffect(() => {
        getMessages();
        setRoom();
        socket.on('message', (addedmessage)  => {
            let  belongstouser = (addedmessage.userid == localStorage.getItem("user_id"))
            const newMessage = {id: 1, case: belongstouser, content: addedmessage.text, date: addedmessage.date}
            setSocketMessages([...socketMessages, newMessage]);
        });  

        return (() => {socket.off()})
    }, [match.params.id, socketMessages])

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = message => {
        socket.emit('chat', message.content);
        saveMessage(message.content)
    }
    
    const MessageBox = styled.div`
    background-color: ${props => props.mymessage ? "#006AFF" : "white"};
    color: ${props => props.mymessage ? "white" : "black"};
    align-self: ${props => props.mymessage ? "flex-start" : "flex-end"};
    border: 1px solid #d3d3d3;
    border-radius: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-bottom: 5px;
    padding-top: 5px;
    padding-left: 2%;
    padding-right: 2%;
    font-weight: 500;
    @media screen and (min-width: 900px) {
      width: 350px !important;
      margin-left: 5%;
    }
    @media screen and (max-width: 800px) {
        max-width: auto;
        margin-left: 10px;
        margin-right: 10px;
    }
    `

    return(
        <>
        <header>
            <TopBar />
        </header>
        <div style={{display: "flex", width: "100%", minHeight: "calc(100vh - 80px)"}}> 
            <div style={{flexGrow: 1}} className="d-none d-sm-block">
            <ConversationsList />
            </div>
            <div style={{flexGrow:9, borderLeft: "solid 1px #d3d3d3"}} >
            <div style={{height: "auto", display: "block", backgroundColor: "white", borderBottom: "solid 1px #d3d3d3", paddingTop: 15, paddingBottom: 15, paddingLeft: "5%", paddingRight: "5%"}}>
            {conversationQuery.isLoading? <></>: 
            <div style={{display: "flex", flexDirection: "row"}}>
            {conversationQuery.data.data.rows[0].picurl==null ? <Image src={profilephoto} style={{flexShrink: 2}} roundedCircle width="65px" height="65px" /> : <Image src={conversationQuery.data.data.rows[0].picurl} style={{flexShrink: 2}} roundedCircle width="65px" height="65px"/> }
            <h2 style={{marginLeft: 20, marginTop: 10,textTransform: "capitalize", flexGrow: 15}}>{conversationQuery.data.data.rows[0].name}</h2>
            </div>
            }
            </div>

            <div style={{display: "flex", flexDirection: "column"}} >

            <div style={{overflowY: "scroll", height: "72vh", display: "flex", flexDirection: "column", backgroundColor: "#e3e8ee", flexGrow: 4}}>
                {
                    messagesLoading ? <></> :
                    <div style={{paddingBottom: 20}}>
                    {messages.rows.map(message => 
                    <React.Fragment key={message.id}>
                    {message.case === true ?
                    <>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <MessageBox className="shadow" mymessage style={{display: "flex", flexDirection: "row"}}>
                            <div style={{flexGrow: 9}}>
                            <p style={{ marginTop: 10}}>{message.content}</p>
                            </div>
                        </MessageBox> 
                    </div>
                    <p className="yourmessagedate" style={{color: "#838383", fontSize: "0.8em"}}>{message.date.substring(0, 16).replace("T", " ")}</p>
                    </>
                    : 
                    <>
                    <div key={message.id} style={{display: "flex", flexDirection: "row"}}>
                        <MessageBox className="shadow" style={{display: "flex", flexDirection: "row"}}>
                            <div style={{flexGrow: 9}}>
                            <p style={{ marginTop: 10}}>{message.content}</p> 
                            </div>
                        </MessageBox>
                    </div>
                    <p className="othermessagedate" style={{color: "#838383", fontSize: "0.8em"}}>{message.date.substring(0, 16).replace("T", " ")}</p>
                    </>
                    }
                    </ React.Fragment>
                )}
                    </div>
                }
                {
                    socketMessages.length == 0 ? <></> :
                    <div style={{paddingBottom: 20}}>
                    {socketMessages.map(message => 
                    <React.Fragment key={message.id}>
                    {message.case === true ?
                    <>
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <MessageBox className="shadow" mymessage style={{display: "flex", flexDirection: "row"}}>
                            <div style={{flexGrow: 9}}>
                            <p style={{ marginTop: 10}}>{message.content}</p>
                            </div>
                        </MessageBox> 
                    </div>
                    <p className="yourmessagedate" style={{color: "#838383", fontSize: "0.8em"}}>{message.date.substring(0, 16).replace("T", " ")}</p>
                    </>
                    : 
                    <>
                    <div key={message.id} style={{display: "flex", flexDirection: "row"}}>
                        <MessageBox className="shadow" style={{display: "flex", flexDirection: "row"}}>
                            <div style={{flexGrow: 9}}>
                            <p style={{ marginTop: 10}}>{message.content}</p> 
                            </div>
                        </MessageBox>
                    </div>
                    <p className="othermessagedate" style={{color: "#838383", fontSize: "0.8em"}}>{message.date.substring(0, 16).replace("T", " ")}</p>
                    </>
                    }
                    </ React.Fragment>
                )}
                    </div>
                }
                </div>

                <div style={{backgroundColor: "white",bottom: 0, display: "block", width: "100%", paddingBottom: 15, paddingTop: 10, flexGrow: 1}}>
                <Form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
                <Form.Control type="text" placeholder="Send Message..." style={{width: "auto", minWidth: "70%", paddingTop: 10, paddingBottom: 10}} {...register("content",  { required: "Message cannot be empty!"})} />
                <Button style={{backgroundColor: "#4267B2", marginLeft: 15}} type="submit" className=""><SendIcon /></Button>
                </Form>
                </div>

                </div>
            </div>
        </div>
        </>
    )

}

export default Messages;