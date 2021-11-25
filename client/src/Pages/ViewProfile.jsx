import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import { Dropdown, DropdownButton, Image, Spinner, Form, Button, Container, Modal, Row, Col, Alert } from 'react-bootstrap';
import '../Styles/home.scss';
import photo from '../Images/photo.png';
import video from '../Images/video.png';
import profilephoto from '../Images/profilephoto.png';
import dots from '../Images/dots.png';
import { useHistory } from "react-router-dom";
//picture upload does not work yet and I need the form to have default value of userprofile.name and userprofile.bio

const Profile = ({ match }) => {
    //const [postid,setPostid] = useState(0);
    const history = useHistory();
    const [posts, setPosts] = useState([]);
    const [userProfile, setUserProfile] = useState({})
    const [PageProfile, setPageProfile] = useState({})
    const [borderColor, setBorderColor] = useState('transparent');
    const [errorMsg, setErrorMsg] = useState('');
    const [alertContent, setAlertContent] = useState('');

    useEffect(() => {
        getFeed()
        getUsersProfile()
        getPageProfile()
    }, [])
    const [Input, setInput] = useState({
        name: '',
        bio: ''
    });
    const getFeed = () => {
        axios
            .get(`http://localhost:5000/api/post/${match.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                console.log(response.data)
                setPosts(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }
    const getUsersProfile = () => {
        axios.get(`http://localhost:5000/api/getDataOfUser/${localStorage.getItem('user_id')}`)
            .then(response => {
                console.log("you are user " + localStorage.getItem('user_id'))
                console.log(response)
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
        axios.get(`http://localhost:5000/api/getDataOfUser/${match.params.id}`)
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
        event.preventDefault();
        axios
            //.post('http://evening-plateau-18994.herokuapp.com/api/login', {"email": Input.email,"password": Input.password})
            .put('http://localhost:5000/api/updateUser/' + localStorage.getItem("user_id"), { "name": Input.name, "bio": Input.bio, "userid":localStorage.getItem("user_id") }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((response) => {
                console.log(response.data)
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
            .put('http://localhost:5000/api/updatePFP', webFormData, {
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
                        <Col class="d-flex justify-content-center">

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
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail" onSubmit={handleSubmit}>
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
                        <Container className="shadow post">
                            <div style={{ display: "flex", flexDirection: "row", padding: 5 }}>
                                {post.picurl == null ? <Image style={{ marginBottom: 10, flexShrink: 0.2 }} src={profilephoto} width="50px" height="50px" roundedCircle /> : <Image style={{ marginBottom: 10, flexShrink: 0.2 }} src={post.picurl} width="50px" height="50px" roundedCircle />}
                                <div style={{ flexGrow: 1 }}>
                                    <p style={{ marginLeft: 10, fontWeight: 600, textTransform: "capitalize" }}>{post.name}</p>
                                    {post.editdate == null ?
                                        <p style={{ marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383" }}>{post.date.substring(0, 16).replace("T", " ")}</p>
                                        : <p style={{ marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383" }}>{post.date.substring(0, 16).replace("T", " ")} (Edited {post.editdate.substring(0, 16).replace("T", " ")})</p>
                                    }
                                </div>
                            </div>
                            <hr style={{ marginTop: -5, marginRight: "-2%", marginLeft: "-2%", color: "d3d3d3" }} />
                            {post.cloudinaryurl == null ?
                                <p style={{ marginLeft: "1%", fontSize: "1.15em" }}>{post.content}</p> :
                                <>
                                    {post.caption == null ? <></> : <p style={{ marginLeft: "1%", fontSize: "1.15em" }}>{post.caption}</p>}
                                    <Image style={{ marginBottom: 15 }} src={post.cloudinaryurl} fluid />
                                </>
                            }
                            {post.id == localStorage.getItem("user_id") ?
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                                    <DropdownButton
                                        id={`dropdown-button-drop-up`}
                                        drop={"up"}
                                        title={
                                            <Image style={{ marginBottom: 15, height: 20 }} src={dots} fluid>

                                            </Image>
                                        }
                                    >
                                        <Dropdown.Item eventKey="1" onClick={() => { history.push(`/editpost/${post.postid}`) }}>Edit</Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item eventKey="2" style={{ color: "red" }}>Delete</Dropdown.Item>
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

export default Profile;