import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import { Alert, Button, Form, Container, Spinner } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../Styles/form.scss';
import config from '../config/config';

const EditPost = ({match}) => { 
    const [post, setPost] = useState([]);
    const history = useHistory();
    const [borderColor, setBorderColor]= useState('transparent');
    const [errorMsg, setErrorMsg]= useState('');


    useEffect(() => {
        axios
        .get(`${config.baseURL}/post/${match.params.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => {
          console.log('promise fulfilled')
          setPost(response.data)
        })
        .catch(error => {
          console.log(error);
      })
    }, [])

    const [textFormLoading,setTextFormLoading] = useState(false);
    const [TextInput, setTextInput] = useState({
        content: post.content
      });
    const handleTextChange = (event) => {
        setTextInput({
            ...TextInput,
            [event.target.name]: event.target.value

        })
    }
    const createTextPost = (event) => { 
        event.preventDefault();
        setTextFormLoading(true);
        axios
        //.post('http://evening-plateau-18994.herokuapp.com/api/login', {"email": Input.email,"password": Input.password})
        .put(`${config.baseURL}/text/${match.params.id}`, {"content": TextInput.content}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
          })
        .then(response => {
            setTextFormLoading(false)
            console.log(response);
            setBorderColor('transparent')
            setErrorMsg('');
            history.push('/userhome')
        })
        .catch(error => {
            setTextFormLoading(false)
            setBorderColor('red')
            setErrorMsg(error.response.data.message);
        })
    }

    const [ImageFormLoading,setImageFormLoading] = useState(false);

    const [ImageInput, setImageInput] = useState({
        caption: post.caption,
        file: ''
      });
    const handleImageChange = (event) => {
        setImageInput({
            ...ImageInput,
            [event.target.name]: event.target.value
        })
    }

    const handleImageUploadChange = (event) => {
        let files = event.target.files
        setImageInput({
            ...ImageInput,
            file: files[0]
        })
    }
    const createImagePost = (event) => { 
        event.preventDefault();
        setImageFormLoading(true);

        let webFormData = new FormData();
        webFormData.append('caption', ImageInput.caption);
        webFormData.append("file", ImageInput.file);

        axios
        //.post('http://evening-plateau-18994.herokuapp.com/api/login', {"email": Input.email,"password": Input.password})
        .put(`${config.baseURL}/photo/${match.params.id}`, webFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
          })
        .then(response => {
            setImageFormLoading(false)
            console.log(response);
            setBorderColor('transparent')
            setErrorMsg('');
            history.push('/userhome')
        })
        .catch(error => {
            setImageFormLoading(false)
            setBorderColor('red')
            setErrorMsg(error.response.data.message);
        })
    }
    return (
      <>
      <header>
          <TopBar />
      </header>
    <div  style={{backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto'}}>
      {localStorage.getItem("user_id")==post.user_id?
    <Container className="formcontainer shadow" style={{marginTop: 100}}>
          {post.type == "text" ? 
          <>
          <h2 style={{marginLeft: '8%',paddingBottom: 20, fontWeight: 600}}>Edit Post</h2>
          <Form onSubmit={createTextPost}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control style={{borderColor: borderColor,width: "85%"}} name="content" className="text-secondary" as="textarea" rows={5} placeholder={post.content} value={TextInput.content} onChange={handleTextChange}/>
            </div>
            </Form.Group>
            {errorMsg != '' ? <p style={{color: "red", fontSize: "0.85em", marginLeft: '8%'}}>{errorMsg}!</p>: <></>}
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 40}}>
            {!textFormLoading?
            <Button className="submitbutton" variant="primary" type="submit" >Submit</Button>:
            <Button className="submitbutton" variant="primary" disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
        </Button>}
        </div>
        </Form>
        </>
        : <></>
        }
        {post.type == "image" ? 
                <>
                <h2 style={{marginLeft: '8%',paddingBottom: 20, fontWeight: 600}}>Edit Post</h2>
                <Form onSubmit={createImagePost}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Form.Control style={{borderColor: borderColor,width: "85%"}} name="caption" className="text-secondary" as="textarea" rows={1} placeholder="Image caption (optional)" value={ImageInput.caption} onChange={handleImageChange}/>
                </div>
                </Form.Group>
                <Form.Group controlId="formFileSm" className="mb-3">
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                    <Form.Control style={{width: "85%"}} name="file" type="file" size="sm" onChange={handleImageUploadChange} />
                </div>
                </Form.Group>
                {errorMsg != '' ? <p style={{color: "red", fontSize: "0.85em", marginLeft: '8%'}}>{errorMsg}!</p>: <></>}
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 40}}>
                {!ImageFormLoading?
                <Button className="submitbutton"  variant="primary" type="submit" >Submit</Button>:
                <Button className="submitbutton" variant="primary" disabled>
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
            </Button>}
            </div>
            </Form>
            </>
             :<></>}
    </Container>: 
    <Container style={{marginTop: 50,display: 'flex',  justifyContent:'center', alignItems:'center'}}>
       <Alert style={{width: "80%"}} variant="danger">
        <Alert.Heading>Forbidden!</Alert.Heading>
        <p>
          You do not have access to edit this post.
        </p>
      </Alert>
    </Container>
    }
    </div>
    </>
    )
}

export default EditPost; 