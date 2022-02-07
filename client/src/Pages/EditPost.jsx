import React, { useState } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import { Alert, Button, Form, Container, Spinner } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../Styles/form.scss';
import config from '../config/config';
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

const TextForm = (props) => {
    const queryClient = useQueryClient()

    const history = useHistory();

    const post = props.data.data;

    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(DOMPurify.sanitize(post.content))
            )
          ),
    );

    const  [convertedContent, setConvertedContent] = useState(null);

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML(); 
      }
      const convertContentToHTML = () => {
        
        let currentContentAsHTML = convertToHTML({
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

    const mutation = useMutation( async (data) => {
        await axios.put(`${config.baseURL}/text/${post.postid}`, {"content": data}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
    })

    const handleSubmit = () => {

        mutation.mutate(convertedContent, {onSuccess: () => {
            queryClient.invalidateQueries('currentPost')
            queryClient.invalidateQueries('feedPosts')
            history.push('/userhome')
        }})
    }

    return(
        <>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <div style={{width:"85%"}}>
        <Editor defaultEditorState={editorState} onEditorStateChange={handleEditorChange} editorClassName="editor-class" />
        </div>
        </div>
        {mutation.isError ? <p style={{color: "red", fontSize: "0.85em", marginLeft: '8%'}}>{mutation.error.response.data.message}!</p>: <></>}
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        {!mutation.isLoading ?
        <Button className="submitbutton"  variant="primary" onClick={handleSubmit} >Submit</Button>:
        <Button className="submitbutton"  variant="primary" disabled>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
        </Button>}
        </div>
        </>
    )
}

const ImageForm = (props) => {
    const queryClient = useQueryClient()

    const history = useHistory();

    const post = props.data.data;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const mutation = useMutation(async (data) => {
        await axios.put(`${config.baseURL}/photo/${post.postid}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
    })

    const onSubmit = data => {
        let webFormData = new FormData();
        webFormData.append('caption', data.caption);
        webFormData.append("file", data.file[0]);
        mutation.mutate(webFormData, {onSuccess: () => {
            queryClient.invalidateQueries('currentPost')
            queryClient.invalidateQueries('feedPosts')
            history.push('/userhome')}
        })
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control style={{width: "85%",borderColor: 'transparent'}} className="text-secondary" as="textarea" rows={1} placeholder="Image caption (optional)" {...register("caption")}/>
                </div>
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control style={{width: "85%"}} type="file" size="sm"  {...register("file",  { required: "Please select a file!" })}/>
                </div>
            </Form.Group>
            <p style={{color: "red", fontSize: "0.85em", marginLeft: 15, marginLeft: '8%'}}>{errors.file?.message}</p>
            {mutation.isError ? <p style={{color: "red", fontSize: "0.85em", marginLeft: '8%'}}>{mutation.error.response.data.message}!</p>: <></>}
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 40}}>
            {!mutation.isLoading?
                <Button className="submitbutton"  variant="primary" type="submit" >Submit</Button>:
                <Button className="submitbutton" variant="primary" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
            </Button>}
            </div>

        </Form>
    )
    
}

const VideoForm = (props) => {
    const queryClient = useQueryClient()

    const history = useHistory();

    const post = props.data.data;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const mutation = useMutation(async (data) => {
        await axios.put(`${config.baseURL}/video/${post.postid}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
    })

    const onSubmit = data => {
        let webFormData = new FormData();
        webFormData.append('caption', data.caption);
        webFormData.append("file", data.file[0]);
        mutation.mutate(webFormData, {onSuccess: () => {
            queryClient.invalidateQueries('currentPost')
            queryClient.invalidateQueries('feedPosts')
            history.push('/userhome')}
        })
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)}> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control style={{width: "85%",borderColor: 'transparent'}} className="text-secondary" as="textarea" rows={1} placeholder="Video caption (optional)" {...register("caption")}/>
                </div>
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control style={{width: "85%"}} type="file" size="sm"  {...register("file",  { required: "Please select a file!" })}/>
                </div>
            </Form.Group>
            <p style={{color: "red", fontSize: "0.85em", marginLeft: 15, marginLeft: '8%'}}>{errors.file?.message}</p>
            {mutation.isError ? <p style={{color: "red", fontSize: "0.85em", marginLeft: '8%'}}>{mutation.error.response.data.message}!</p>: <></>}
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 40}}>
            {!mutation.isLoading?
                <Button className="submitbutton"  variant="primary" type="submit" >Submit</Button>:
                <Button className="submitbutton" variant="primary" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
            </Button>}
            </div>

        </Form>
    )
    
}


const EditPost = ({match}) => { 

    let form;

    const { isLoading, error, data } = useQuery('currentPost', async () =>
        await axios.get(`${config.baseURL}/post/${match.params.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
    ) 


    if (data) {
        console.log(data.data.type)
        if (data.data.type === "text") {
            form = <TextForm data={data}/>
        } else if (data.data.type === "image") {
            form = <ImageForm data={data}/>
        } else if (data.data.type === "video") {
            form = <VideoForm data={data}/>
        }

    }
          
    return (
    <>
      <header>
          <TopBar />
      </header>
    <div  style={{backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto'}}>
    {!isLoading?
    <>
        {
        error?
        <Container style={{marginTop: 50,display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Alert style={{width: "80%"}} variant="danger">
         <Alert.Heading>Forbidden!</Alert.Heading>
         <p>
           You do not have access to edit this post. 
         </p>
       </Alert>
     </Container>:<>
    {localStorage.getItem("user_id")==data.data.id?
    <Container className="formcontainer shadow" style={{marginTop: 100}}>
        <h2 style={{marginLeft: '8%',paddingBottom: 20, fontWeight: 600}}>Edit Post</h2>
        {form}
    </Container>
    : 
    <Container style={{marginTop: 50,display: 'flex',  justifyContent:'center', alignItems:'center'}}>
       <Alert style={{width: "80%"}} variant="danger">
        <Alert.Heading>Forbidden!</Alert.Heading>
        <p>
          You do not have access to edit this post. 
        </p>
      </Alert>
    </Container>
    }
    </>
    }
    </>
        :
        <div style={{textAlign: "center", marginTop: 100}}>
        <Spinner animation="border" style={{color: "#4267B2"}} />
        </div>
        
    }
    </div>
    </>
    )
}

export default EditPost; 