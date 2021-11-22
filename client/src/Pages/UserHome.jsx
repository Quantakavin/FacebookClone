import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import { Dropdown, DropdownButton, Image, Spinner, Form, Button, Container, Modal } from 'react-bootstrap';
import '../Styles/home.scss';
import photo from '../Images/photo.png'; 
import video from '../Images/video.png'; 
import profilephoto from '../Images/profilephoto.png'; 
import dots from '../Images/dots.png'; 
import { useHistory } from "react-router-dom";

const UserHome = () => { 
    //const [postid,setPostid] = useState(0);
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [borderColor, setBorderColor]= useState('transparent');
    const [errorMsg, setErrorMsg]= useState('');

    useEffect(() => {
        getFeed()
    }, [])

    const getFeed = () => {
        axios
        .get('http://localhost:5000/api/feed', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => {
            console.log("promise fulfilled")
          console.log('response at userhome.js line 31 is \n' + JSON.stringify(response.data))
          setPosts(response.data)
        })
        .catch(error => {
          console.log(error);
      })
    }

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
            getFeed()
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
            getFeed()
        })
        .catch(error => {
            setImageFormLoading(false)
            setBorderColor('red')
            setErrorMsg(error.response.data.message);
        })
    }
    const handleDelete = (id) => {
        axios
        .delete(`http://localhost:5000/api/post/${id}`, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => {
            getFeed()
        })
        .catch(error => {
            console.log(error);
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
                <Form.Control style={{borderColor: borderColor}} name="content" className="text-secondary" as="textarea" rows={5} placeholder={`Whats on your mind, ${localStorage.getItem("username")}?`} value={TextInput.content} onChange={handleTextChange}/>
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

        <div style={{backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto',paddingTop: "50px",paddingBottom: "50px" }}>
            <Container className="formcontainer shadow" style={{height: "auto", marginBottom: 0, display: "flex", flexDirection: "row"}}>
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
            <Container className="postscontainer">
                <h2 style={{marginTop: 10, marginBottom: 20}}>Your Feed</h2>
                {posts.length==0? 
                <p style={{color: "#838383"}}>No content to display</p>
                
                :<></>}    
                {posts.map(post => 
                <Container className="shadow post">
                    <div style={{display: "flex", flexDirection: "row", padding: 5}} onClick = {()=>{
                        history.push(`./profile/${post.id}`)
                    }}>
                    {post.picurl == null? <Image style={{marginBottom: 10,flexShrink: 0.2}} src={profilephoto} width="50px" height="50px" roundedCircle  />: <Image style={{marginBottom: 10,flexShrink: 0.2}} src={post.picurl} width="50px" height="50px" roundedCircle />}
                    <div style={{flexGrow: 1}}>
                        <p style={{marginLeft: 10, fontWeight: 600, textTransform: "capitalize"}}>{post.name}</p>
                        {post.editdate == null ?
                        <p style={{marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383"}}>{post.date.substring(0, 16).replace("T", " ")}</p>
                        : <p style={{marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383"}}>{post.date.substring(0, 16).replace("T", " ")} (Edited {post.editdate.substring(0, 16).replace("T", " ")})</p>
                        }
                    </div>
                    </div>
                    <hr style={{marginTop: -5, marginRight:"-2%",marginLeft:"-2%",color: "d3d3d3"}}/>
                    {post.cloudinaryurl == null ?
                    <p style={{marginLeft: "1%", fontSize: "1.15em"}}>{post.content}</p>:
                    <>
                    {post.caption == null? <></>: <p style={{marginLeft: "1%", fontSize: "1.15em"}}>{post.caption}</p>}
                    <Image style={{marginBottom: 15}}src={post.cloudinaryurl} fluid />
                    </>
                }
                {post.id == localStorage.getItem("user_id")? 
                    <div style={{display: "flex",flexDirection: "row", justifyContent: "flex-end"}}>
                    <DropdownButton
                      id={`dropdown-button-drop-up`}
                      drop={"up"}
                      title={
                          <Image style={{marginBottom: 15, height: 20}} src={dots} fluid>

                          </Image>
                      }
                    >
                      <Dropdown.Item eventKey="1" onClick={() => {history.push(`/editpost/${post.postid}`)} }>Edit</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="2" style={{color: "red" }} onClick={() => handleDelete(post.postid)}>Delete</Dropdown.Item>
                    </DropdownButton>
                    </div>
                : <></>}
                </Container>
               )}
            </Container>
        </div>
        </>
    )

}

export default UserHome;