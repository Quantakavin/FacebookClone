import React, { useState } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import { Image, Spinner, Form, Button, Container, Modal } from 'react-bootstrap';
import '../Styles/home.scss';
import photo from '../Images/photo.png'; 
import video from '../Images/video.png'; 

const UserHome = () => {

    const [borderColor, setBorderColor]= useState('transparent');
    const [errorMsg, setErrorMsg]= useState('');

    const [showTextForm, setShowTextForm] = useState(false);
    const handleCloseTextForm = () => {
        setBorderColor('transparent')
        setErrorMsg('');
        setShowTextForm(false);
        setTextInput({
            ...TextInput,
            content: ''

        })
    }
    const handleShowTextForm = () => setShowTextForm(true);

    const [textFormLoading,setTextFormLoading] = useState(false);

    const [TextInput, setTextInput] = useState({
        content: ''
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
        .post('http://localhost:5000/api/text', {"content": TextInput.content}, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
          })
        .then(response => {
            setTextFormLoading(false)
            console.log(response);
            handleCloseTextForm()
        })
        .catch(error => {
            setTextFormLoading(false)
            setBorderColor('red')
            setErrorMsg(error.response.data.message);
        })
    }



    const [showImageForm, setShowImageForm] = useState(false);
    const handleCloseImageForm = () => {
        setBorderColor('transparent')
        setErrorMsg('');
        setShowImageForm(false);
        setImageInput({
            ...ImageInput,
            caption: '',
            file: []

        })
    }
    const handleShowImageForm = () => setShowImageForm(true);

    const [ImageFormLoading,setImageFormLoading] = useState(false);

    const [ImageInput, setImageInput] = useState({
        caption: '',
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
        .post('http://localhost:5000/api/photo', webFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
          })
        .then(response => {
            setImageFormLoading(false)
            console.log(response);
            handleCloseImageForm()
        })
        .catch(error => {
            setImageFormLoading(false)
            setBorderColor('red')
            setErrorMsg(error.response.data.message);
        })
    }


    return(
        <>
        <header>
            <TopBar />
        </header>
        <Modal show={showTextForm} onHide={handleCloseTextForm} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{fontWeight: 600,fontSize: "1.25em"}}>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={createTextPost}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control style={{borderColor: borderColor}} name="content" className="text-secondary" as="textarea" rows={5} placeholder={`Whats on your mind, ${localStorage.getItem("username")}?`} value={TextInput.Content} onChange={handleTextChange}/>
            </Form.Group>
            {errorMsg != '' ? <p style={{color: "red", fontSize: "0.85em", marginLeft: 15}}>{errorMsg}!</p>: <></>}
            {!textFormLoading?
            <Button style={{backgroundColor: "#4267B2", width: "100%"}} variant="primary" type="submit" >Submit</Button>:
            <Button variant="primary" disabled style={{backgroundColor: "#4267B2", width: "100%"}}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
        </Button>}
        </Form>
        </Modal.Body>
        </Modal>

        <Modal show={showImageForm} onHide={handleCloseImageForm} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{fontWeight: 600,fontSize: "1.25em"}}>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={createImagePost}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Control style={{borderColor: borderColor}} name="caption" className="text-secondary" as="textarea" rows={1} placeholder="Image caption (optional)" value={ImageInput.caption} onChange={handleImageChange}/>
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
                <Form.Control name="file" type="file" size="sm" onChange={handleImageUploadChange} />
            </Form.Group>
            {errorMsg != '' ? <p style={{color: "red", fontSize: "0.85em", marginLeft: 15}}>{errorMsg}!</p>: <></>}
            {!ImageFormLoading?
            <Button style={{backgroundColor: "#4267B2", width: "100%"}} variant="primary" type="submit" >Submit</Button>:
            <Button variant="primary" disabled style={{backgroundColor: "#4267B2", width: "100%"}}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
        </Button>}
        </Form>
        </Modal.Body>
        </Modal>

        <div style={{backgroundColor: "#e3e8ee", height: "100vh",paddingTop: "50px"}}>
            <Container className="formcontainer shadow" style={{display: "flex", flexDirection: "row"}}>
            <div style={{flexGrow: 12,marginBottom: "-3%"}}>
            <button onClick={handleShowTextForm} style={{backgroundColor: "#e3e8ee", borderRadius: "20px", width: "100%",textAlign: "left"}} type="button" className="btn text-secondary">Whats on your mind, {localStorage.getItem("username")}?</button>
            </div>
            <div style={{flexShrink: 0.5, marginLeft: 10, marginRight: -10,marginBottom: "-3%"}}>
            <Button onClick={handleShowImageForm} style={{border:"none", backgroundColor: "transparent"}}><Image src={photo} alt="Upload photo" height="30px" /></Button>
            </div>
            <div style={{flexShrink: 0.5,marginBottom: "-3%"}}>
            <Button style={{border:"none", backgroundColor: "transparent"}}><Image src={video} alt="Upload video" height="30px"  /></Button>
            </div>
            </Container>
        </div>
        </>
    )

}

export default UserHome;