import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import Post from '../Components/Post'
import { Image, Spinner, Form, Button, Container, Modal } from 'react-bootstrap';
import '../Styles/home.scss';
import photo from '../Images/photo.png'; 
import video from '../Images/video.png'; 
import config from '../config/config';
import { useForm } from "react-hook-form";
import {useQuery, useQueryClient, useMutation } from 'react-query';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';

const ViewPost = (props) => {
    const [rerender, setRerender]= useState(false);
    const { isLoading, error, data } = useQuery(['feedPosts',rerender], async () =>
    await axios.get(`${config.baseURL}/post/?id=${props.post.postid}`, {
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
        <Card sx={{ m: 2 }}>
        <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />} 
        title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent>
        <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
        </>
        </CardContent>

     
        </Card>
        <Card sx={{ m: 2}}>
        <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />} 
        title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent>
        <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
        </>
        </CardContent>

     
        </Card>
        <Card sx={{ m: 2 }}>
        <CardHeader
        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />} 
        title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
        <CardContent>
        <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
        </>
        </CardContent>

     
        </Card>
        </>
        
        
        :
        <>
        {data.data.length===0? 
        <p style={{color: "#838383"}}>No content to display</p> 
        
        :<></>}    
        {data.data.map(post => 
        <Post key={post.postid} post={post} setRerender={setRerender}></Post>
       )}
       </>
        }
        </>
      )

}

export default ViewPost