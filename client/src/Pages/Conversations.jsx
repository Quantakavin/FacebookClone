import React, { useState } from 'react';
import axios from 'axios';
import config from '../config/config';
import TopBar from '../Components/TopBar';
import { Container, Row, Image, Button} from 'react-bootstrap';
import {useQuery, useQueryClient, useMutation } from 'react-query';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useHistory } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import profilephoto from '../Images/profilephoto.png';
import '../Styles/messages.scss';
import ConversationSkeleton from '../skeletons/ConversationSkeleton';

const Contacts = () => {
    const history = useHistory();

    const { isLoading, error, data } = useQuery(['conversations'], async () =>
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

    return(
        <>
        {isLoading?
              <>
              {Array.from(new Array(5)).map((item, index) => <ConversationSkeleton key={index}/>)}
            </>
        :<>
        {data.data.rows.length===0? 
        <p style={{color: "#838383"}}>No content to display</p> 
        
        :<></>}    
        {data.data.rows.map(conversation => 
        <div key={conversation.conversationid} className="shadow conversation" style={{display: "flex", flexDirection: "row"}}>
            <div style={{flexGrow: 1}}>{conversation.picurl==null ? <Image src={profilephoto}  roundedCircle width="100px" height="100px" /> : <Image src={conversation.picurl}  roundedCircle width="100px" height="100px"/> }</div>
            <div style={{flexGrow: 9}}>
            <h4 style={{textTransform: "capitalize", marginTop: 10}}>{conversation.name}</h4> 
            </div>
            <div style={{flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button  style={{width: "auto", marginBottom: 10, marginTop: 5, border: "1px solid #d3d3d3", backgroundColor: "#32CD32", borderRadius: 5, fontWeight: 500}} onClick={() => history.push(`/messages/${conversation.conversationid}`)}>Message</Button>
            </div>
        </div>
       )}
        
        </>}
        </>
    )

}

const Conversations = () => {

    return(
        <>
        <header>
            <TopBar />
        </header>
        <div style={{position: "relative",backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto',paddingTop: 50, paddingBottom: 50}}>
        <Container>
            <Row>
                <h2 style={{marginTop: 10, marginBottom: 20}}>Conversations</h2>
            </Row>
            <Contacts />
        </Container>
        </div>
        </>
    )

}

export default Conversations;