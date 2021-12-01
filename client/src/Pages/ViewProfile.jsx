import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import {  Image, Spinner, Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import '../Styles/home.scss';
import profilephoto from '../Images/profilephoto.png';
import { useHistory } from "react-router-dom";
import Post from '../Components/Post';
import config from '../config/config';

const Profile = ({ match }) => {
    //const [postid,setPostid] = useState(0);
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [userProfile, setUserProfile] = useState([])
    const [PageProfile, setPageProfile] = useState([])
    const [borderColor, setBorderColor] = useState('transparent');
    const [errorMsg, setErrorMsg] = useState('');
    const [alertContent, setAlertContent] = useState('');
    const [rerender, setRerender]= useState(false);

    useEffect(() => {
        getFeed()
        getUsersProfile()
        getPageProfile()
    }, [rerender])
    const [Input, setInput] = useState({
        name: '',
        bio: ''
    });

    const getFeed = () => {
        axios
            .get(`${config.baseURL}/posts/${match.params.id}`)
            .then(response => {
                console.log(response.data)
                setPosts(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    
    const getUsersProfile = () => {
        axios.get(`${config.baseURL}/getDataOfUser/${localStorage.getItem('user_id')}`)
            .then(response => {
                console.log("you are user " + localStorage.getItem('user_id'))
                console.log(response.data)
                setUserProfile(response.data)
                if (localStorage.getItem("user_id") == match.params.id) {
                    setInput({ name: response.data.name, bio: response.data.bio })
                }
            }
            ).catch(error => {
                console.log("error in frontend")
                console.log(error);
            })
    }
    

    const getPageProfile = () => {
        axios.get(`${config.baseURL}/getDataOfUser/${match.params.id}`)
            .then(response => {
                console.log("you are viewing profile of user " + match.params.id)
                console.log(response)
                setPageProfile(response.data)
            }
            ).catch(error => {
                console.log("error in frontend")
                console.log(error);
            })
    }

    const handleChange = (event) => {
        setInput({
            ...Input,
            [event.target.name]: event.target.value

        })
    }

    const handleSubmit = (event) => {
        // console.log(event.target.name.value)
        // console.log(event.target.bio.value)
        // console.log(localStorage.getItem("user_id"))

        event.preventDefault();
        axios
            .put(`${config.baseURL}/updateUser`,
                {
                    "newName": event.target.name.value,
                    "newBio": event.target.bio.value,
                    "userid": localStorage.getItem("user_id")
                }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                console.log(response.data)
                history.push(`/profile/${localStorage.getItem("user_id")}`)
            })
            .catch(error => {
                setAlertContent(error.response.data.message);
            })
    }



    const [ImageFormLoading, setImageFormLoading] = useState(false);
    const [ImageInput, setImageInput] = useState({
        file: ''
    });
    const handleImageUploadChange = (event) => {
        let files = event.target.files
        setImageInput({
            ...ImageInput,
            file: files[0]
        })
    }

    const createImagePost = (event) => {

        setImageFormLoading(true);
        let webFormData = new FormData();
        webFormData.append("file", ImageInput.file);
        axios
            .put(`${config.baseURL}/updatePFP`, webFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                setImageFormLoading(false)
                console.log(response);
                getFeed()
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
            <div style={{ backgroundColor: "#e3e8ee", height: "100vh", overflow: 'auto', paddingTop: "50px", paddingBottom: "50px" }}>
                <Container className="postscontainer"
                    style={
                        { backgroundColor: "#fff" }
                    }>
                    <Row>
                        <Col>

                            {PageProfile.picurl == null ?
                                <Image className="shadow post" src={profilephoto} style={{
                                    width: '120px',
                                    height: '120px'
                                }} roundedCircle></Image>
                                :
                                <Image className="shadow post" src={PageProfile.picurl} style={{
                                    width: '120px',
                                    height: '120px'
                                }} roundedCircle></Image>
                            }
                            {
                                localStorage.getItem("user_id") == match.params.id ?
                                    <div>
                                        <Form onSubmit={createImagePost}>
                                            <Form.Group controlId="formFileSm" className="mb-3">
                                                <Form.Control name="file" type="file" size="sm" onChange={handleImageUploadChange} />
                                            </Form.Group>
                                            {errorMsg != '' ? <p style={{ color: "red", fontSize: "0.85em", marginLeft: 15 }}>{errorMsg}!</p> : <></>}
                                            {!null ?
                                                <Button style={{ backgroundColor: "#4267B2", width: "100%" }} variant="primary" type="submit" >Upload photo</Button> :
                                                <Button variant="primary" disabled style={{ backgroundColor: "#4267B2", width: "100%" }}>
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                </Button>}
                                        </Form>
                                    </div> : ""
                            }


                        </Col>
                        <Col>
                            {PageProfile.id == userProfile.id ?
                                <Container>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={handleChange}>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" name="name" onChange={handleChange} value={Input.name} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Bio</Form.Label>
                                            <Form.Control type="text" name="bio" as="textarea" onChange={handleChange} value={Input.bio} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Submit
                                        </Button>
                                    </Form>
                                    {
                                        alertContent == null ? <Alert variant="danger">
                                            <Alert.Heading>Error!</Alert.Heading>
                                            <p>
                                                {alertContent}
                                            </p>
                                        </Alert> : ""
                                    }

                                </Container>

                                :
                                <Container>
                                    <h2 style={{ marginTop: 10, marginBottom: 20 }}>{PageProfile.name}</h2>
                                    <p style={{ marginTop: 10, marginBottom: 20 }}>{PageProfile.bio == null ? "no bio yet" : PageProfile.bio}</p>
                                </Container>
                            }
                        </Col>
                    </Row>


                </Container>

                <Container className="postscontainer">
                    <h2 style={{ marginTop: 10, marginBottom: 20 }}>Posts</h2>
                    {posts.length == 0 ?
                        <p style={{ color: "#838383" }}>No content to display</p>
                        : <></>}
                    {posts.map(post =>
                    <Post key={post.postid} post={post} setRerender={setRerender}></Post>
                    )}
                </Container>
            </div>
        </>
    )

}

export default Profile;