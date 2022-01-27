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

//const queryClient = new QueryClient()

const TextForm = (props) => {
    const queryClient = useQueryClient()

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const  [convertedContent, setConvertedContent] = useState(null);

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
      }
      const convertContentToHTML = () => {
        //let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        
        let currentContentAsHTML = convertToHTML({
            /*
            styleToHTML: (style) => {
              if (style === 'BOLD') {
                return <span style={{color: 'blue'}} />;
              }
            },*/
            blockToHTML: (block) => {
              if (block.type === 'PARAGRAPH') {
                return <p />;
              }
            },
            entityToHTML: (entity, originalText) => {
              if (entity.type === 'LINK') {
                return <a href={entity.data.url} target="_blank" rel="noopener noreferrer">{originalText}</a>;
              }
              return originalText;
            }
          })(editorState.getCurrentContent())
          
        setConvertedContent(currentContentAsHTML);
              
      }

    const handleCloseForm = () => {
        props.setShowForm(false);
    }

    const mutation = useMutation( async (data) => {
        await axios.post(`${config.baseURL}/text`, {"content": data}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
    }, {
        onSuccess: () => {
           queryClient.invalidateQueries('feedPosts')
        }
    })

    const handleSubmit = () => {
        //alert(convertedContent)
        mutation.mutate(convertedContent, {onSuccess: () => props.setShowForm(false)})
    }

    return( 
    <Modal show={props.showForm} onHide={handleCloseForm} centered> 
    <Modal.Header closeButton>
      <Modal.Title className="text-center" style={{fontWeight: 600,fontSize: "1.25em"}}>Create Post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Editor defaultEditorState={editorState} onEditorStateChange={handleEditorChange} editorClassName="editor-class" />
    {mutation.isError ? <p style={{color: "red", fontSize: "0.85em", marginLeft: 15}}>{mutation.error.response.data.message}!</p>: <></>}
        {!mutation.isLoading ?
        <Button style={{backgroundColor: "#4267B2", width: "100%"}} variant="primary" onClick={handleSubmit} >Submit</Button>:
        <Button variant="primary" disabled style={{backgroundColor: "#4267B2", width: "100%"}}>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
    </Button>}

    </Modal.Body>
    </Modal>
    )
}


const ImageForm = (props) => {
    const queryClient = useQueryClient()

    const handleCloseForm = () => {
        props.setShowForm(false);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const mutation = useMutation( async (data) => {
        await axios.post(`${config.baseURL}/photo`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
      }, {
        onSuccess: () => {
            queryClient.invalidateQueries('feedPosts')
        }
    })

    const onSubmit = data => {
        let webFormData = new FormData();
        webFormData.append('caption', data.caption);
        webFormData.append("file", data.file[0]);
        mutation.mutate(webFormData, {onSuccess: () => props.setShowForm(false)})
    }

    return(
    <Modal show={props.showForm} onHide={handleCloseForm} centered> 
    <Modal.Header closeButton>
      <Modal.Title className="text-center" style={{fontWeight: 600,fontSize: "1.25em"}}>Upload Image</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control style={{borderColor: 'transparent'}} className="text-secondary" as="textarea" rows={1} placeholder="Image caption (optional)" {...register("caption")}/>
        </Form.Group>
        <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Control  type="file" size="sm"  {...register("file",  { required: "Please select a file!" })}/>
        </Form.Group>
        <p style={{color: "red", fontSize: "0.85em", marginLeft: 15}}>{errors.file?.message}</p>
        {mutation.isError ? <p style={{color: "red", fontSize: "0.85em", marginLeft: 15}}>{mutation.error.response.data.message}!</p>: <></>}
        {!mutation.isLoading ?
        <Button style={{backgroundColor: "#4267B2", width: "100%"}} variant="primary" type="submit" >Submit</Button>:
        <Button variant="primary" disabled style={{backgroundColor: "#4267B2", width: "100%"}}>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
    </Button>}
    </Form>
    </Modal.Body>
    </Modal>
    )
}

const VideoForm = (props) => {
    const queryClient = useQueryClient()

    const handleCloseForm = () => {
        props.setShowForm(false);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const mutation = useMutation(async (data) => {
        await axios.post(`${config.baseURL}/video`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('feedPosts')
        }
    })

    const onSubmit = data => {
        let webFormData = new FormData();
        webFormData.append('caption', data.caption);
        webFormData.append("file", data.file[0]);
        mutation.mutate(webFormData, {onSuccess: () => props.setShowForm(false)})
    }

    return(
    <Modal show={props.showForm} onHide={handleCloseForm} centered> 
    <Modal.Header closeButton>
      <Modal.Title className="text-center" style={{fontWeight: 600,fontSize: "1.25em"}}>Upload Video</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control style={{borderColor: 'transparent'}} className="text-secondary" as="textarea" rows={1} placeholder="Video caption (optional)" {...register("caption")}/>
        </Form.Group>
        <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Control  type="file" size="sm"  {...register("file",  { required: "Please select a file!" })}/>
        </Form.Group>
        <p style={{color: "red", fontSize: "0.85em", marginLeft: 15}}>{errors.file?.message}</p>
        {mutation.isError ? <p style={{color: "red", fontSize: "0.85em", marginLeft: 15}}>{mutation.error.response.data.message}!</p>: <></>}
        {!mutation.isLoading ?
        <Button style={{backgroundColor: "#4267B2", width: "100%"}} variant="primary" type="submit" >Submit</Button>:
        <Button variant="primary" disabled style={{backgroundColor: "#4267B2", width: "100%"}}>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
    </Button>}
    </Form>
    </Modal.Body>
    </Modal>
    )
}


const Feed = () => {
    const [rerender, setRerender]= useState(false);
    const { isLoading, error, data } = useQuery(['feedPosts',rerender], async () =>
    await axios.get(`${config.baseURL}/feed`, {
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

const UserHome = () => { 
    const [showTextForm, setShowTextForm] = useState(false);
    const [showImageForm, setShowImageForm] = useState(false);
    const [showVideoForm, setShowVideoForm] = useState(false);

    return( 
        <>
        <header>
<<<<<<< HEAD
            <TopBar />
=======
            <TopBar/>
>>>>>>> a6a5236f31c92535b8003cfffeadedfd261da596
        </header>
        <TextForm showForm={showTextForm} setShowForm={setShowTextForm}/>
        <ImageForm showForm={showImageForm} setShowForm={setShowImageForm}/>
        <VideoForm showForm={showVideoForm} setShowForm={setShowVideoForm}/>
        <div style={{backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto',paddingTop: "50px",paddingBottom: "50px" }}>
            
        <Container className="formcontainer shadow" style={{height: 'auto', marginBottom: 0, display: "flex", flexDirection: "row", alignItems: 'center', justifyContent: 'center'}}>
 
            <button onClick={() => setShowTextForm(true)}  style={{flexGrow: 12, backgroundColor: "#e3e8ee", borderRadius: "20px", width: "100%",textAlign: "left"}} type="button" className="btn text-secondary">Whats on your mind, {localStorage.getItem("username")}?</button>
         
            
            <Button onClick={() => setShowImageForm(true)} style={{flexShrink: 0.5, marginLeft: 10, marginRight: -10, border:"none", backgroundColor: "transparent"}}><Image src={photo} alt="Upload photo" height="30px" /></Button>

 
            <Button onClick={() => setShowVideoForm(true)} style={{flexShrink: 0.5, border:"none", backgroundColor: "transparent"}}><Image src={video} alt="Upload video" height="30px"  /></Button>
        
        </Container>
        <Container className="postscontainer">
        <h2 style={{marginTop: 10, marginBottom: 20}}>Your Feed</h2>
        <Feed />
       </Container>


        </div>
        </>
    )
}

export default UserHome;