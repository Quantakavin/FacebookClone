import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import { Image, Spinner, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import '../Styles/home.scss';
import '../Styles/privacyswitch.css';
import { useHistory } from "react-router-dom";
import Post from '../Components/Post';
import config from '../config/config';
import Switch from '@mui/material/Switch';


const ViewPost = ({ match }) => {
    const [rerender, setRerender]= useState(false);
    const [loading, setLoading]= useState(true);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios
        .get(`${config.baseURL}/post/${match.params.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => {
            setPosts(response.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error);
            setLoading(false)
        })
    }, [rerender])



    return(
        <>
         <header>
            <TopBar />
        </header>
        <div style={{backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto',paddingTop: "50px",paddingBottom: "50px" }}>
            {
                loading ? <>
                </>:
                <>
                    <Post key={posts.postid} post={posts} setRerender={setRerender} ></Post>
                </>
                
            }


        </div>
        </>
    )

}

export default ViewPost;