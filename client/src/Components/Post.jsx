import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Modal, Spinner, Dropdown, DropdownButton, Image, Container, Row} from 'react-bootstrap';
import '../Styles/home.scss';
import profilephoto from '../Images/profilephoto.png'; 
import likephoto from '../Images/like.png'; 
import dots from '../Images/dots.png'; 
import { useHistory } from "react-router-dom";
import config from '../config/config';
import '../Styles/post.scss';
import ReactPlayer from 'react-player';

const Post = (props) => { 
    const history = useHistory();
    const [comments, setComments] = useState([]);
    const [borderColor, setBorderColor]= useState('transparent');
    const [errorMsg, setErrorMsg]= useState('');
    const [commentsRerender, setCommentsRerender]= useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const getLikeCount = () => {
      axios
      .get(`${config.baseURL}/getFeedLikes/${props.post.postid}`)
      .then(response => {
          setLikeCount(response.data.rowCount)
      })
      .catch(error => {
        console.log(error);
      })

    }

    const getLiked = () => {
      if (localStorage.getItem('token') != null) {
      axios
      .get(`${config.baseURL}/userlike/${props.post.postid}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
      })
      .then(response => {
          setLiked(response.data.exists)
      })
      .catch(error => {
        console.log(error);
      })
      }
    }

    const getComments = () => {
      axios
      .get(`${config.baseURL}/comments/${props.post.postid}`)
      .then(response => {
          setComments(response.data)
      })
      .catch(error => {
        console.log(error);
    })
  }

    useEffect(() => {
      let isCancelled = false; 
      if (!isCancelled) {
        getComments()
        getLikeCount()
        getLiked()
      }
      /*
      axios
      .get(`${config.baseURL}/comments/${props.post.postid}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
      })
      .then(response => {
        if (!isCancelled) {
          setComments(response.data)
          console.log(isCancelled)
        }
      })
      .catch(error => {
        if (!isCancelled) {
        console.log(error);
        }
        
    })
    */
    
    return (() => {
      isCancelled = true;
    });
    
  }, [commentsRerender])

  const [showError, setShowError] = useState(false);

  const handleCloseError = () => {
    setShowError(false);
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
      .post(`${config.baseURL}/createComment`, {"content": TextInput.content, "postid": props.post.postid}, { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        })
      .then(response => {
          setTextFormLoading(false)
          console.log(response);
          handleCloseTextForm()
          setCommentsRerender(rerender => !rerender)        
      })
      .catch(error => {
          setTextFormLoading(false)
          setBorderColor('red')
          setErrorMsg(error.response.data.message);
      })
  }





    const handleDelete = (id) => {
        axios
        .delete(`${config.baseURL}/post/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => {
              props.setRerender(rerender => !rerender) 
        })
        .catch(error => {
            console.log(error);
        })
      }

      const likepost = () => {
        if (localStorage.getItem('token') != null) {
          axios
          .post(`${config.baseURL}/like`, {"postid": props.post.postid}, { 
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
              }
            })
          .then(response => {
              console.log(response);
              setLiked(true);
              setCommentsRerender(rerender => !rerender);    
          })
          .catch(error => {
              console.log(error);
              setErrorMsg(error.response.data.message);
          })
        } else {
          setShowError(true);
        }


      }

      const unlikepost = () => {
        if (localStorage.getItem('token') != null) {
          axios
          .delete(`${config.baseURL}/like/${props.post.postid}`, { 
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
              }
            })
          .then(response => {
              console.log(response);
              setLiked(false);
              setCommentsRerender(rerender => !rerender);    
          })
          .catch(error => {
              console.log(error);
              setErrorMsg(error.response.data.message);
          })
        } else {
          setShowError(true);
        }
      }


      const handleDeleteComment = (id) => { 
        axios
        .delete(`${config.baseURL}/deleteComment/${id}`, { 
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        })
        .then(response => {
          setCommentsRerender(rerender => !rerender)   
        })
        .catch(error => {
            console.log(error);
        })
      }

    return (
      <>
        <Modal show={showTextForm} onHide={handleCloseTextForm} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{fontWeight: 600,fontSize: "1.25em"}}>Create Comment</Modal.Title>
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


        <Modal show={showError} onHide={handleCloseError} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center" style={{fontWeight: 600,fontSize: "1.25em"}}>No Access!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please login first!</p>
        </Modal.Body>
        </Modal>




        
                <Container className="shadow post">
                    <div style={{display: "flex", flexDirection: "row", padding: 5}} onClick = {()=>{
                        history.push(`./profile/${props.post.id}`)
                    }}>
                    {props.post.picurl == null? <Image style={{marginBottom: 10,flexShrink: 0.2}} src={profilephoto} width="50px" height="50px" roundedCircle  />: <Image style={{marginBottom: 10,flexShrink: 0.2}} src={props.post.picurl} width="50px" height="50px" roundedCircle />}
                    <div style={{flexGrow: 1}}>
                        <p style={{marginLeft: 10, fontWeight: 600, textTransform: "capitalize"}}>{props.post.name}</p>
                        {props.post.editdate == null ?
                        <p style={{marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383"}}>{props.post.date.substring(0, 16).replace("T", " ")}</p>
                        : <p style={{marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383"}}>{props.post.date.substring(0, 16).replace("T", " ")} (Edited {props.post.editdate.substring(0, 16).replace("T", " ")})</p>
                        }
                    </div>
                    </div>
                    <hr style={{marginTop: -5, marginRight:"-2%",marginLeft:"-2%",color: "d3d3d3"}}/>
                    {props.post.cloudinaryurl == null ?
                    <p style={{marginLeft: "1%", fontSize: "1.15em"}}>{props.post.content}</p>:
                    <>
                    {props.post.caption == null? <></>: <p style={{marginLeft: "1%", fontSize: "1.15em"}}>{props.post.caption}</p>}
                    {props.post.type=="image" ?
                    <Image width="100%" style={{marginBottom: 15}}src={props.post.cloudinaryurl} fluid />:
                    <ReactPlayer width="100%" controls={true} style={{marginBottom: 15}} url={props.post.cloudinaryurl}/>
                    }
                    </>
                }
                
                {props.post.id == localStorage.getItem("user_id")? 
                <div style={{display: "flex",flexDirection: "row", justifyItems: "center"}}>
                  {liked == true ? <Button onClick={() => unlikepost()} style={{justifySelf:"start",marginBottom: 15, backgroundColor: "#4267B2", border: "solid 1px #d3d3d3", color: "white", fontWeight: 600}}><Image src={likephoto}  style={{width: 20, marginTop: -5}} fluid /> Liked {likeCount}</Button>: 
                <Button onClick={() => likepost()} style={{justifySelf:"start",marginBottom: 15, backgroundColor: "#e3e8ee", border: "solid 1px #d3d3d3", color: "#4267B2", fontWeight: 600}}><Image src={likephoto}  style={{width: 20, marginTop: -5}} fluid /> Like {likeCount}</Button>}
                    <DropdownButton
                      id={`dropdown-button-drop-up`}
                      drop={"up"}
                      style={{justifySelf:"end", marginLeft: "auto"}}
                      title={
                          <Image style={{marginBottom: 15, height: 20}} src={dots} fluid>

                          </Image>
                      }
                    >
                      <Dropdown.Item eventKey="1" onClick={() => {history.push(`/editpost/${props.post.postid}`)} }>Edit</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="2" style={{color: "red" }} onClick={() => handleDelete(props.post.postid)}>Delete</Dropdown.Item>
                    </DropdownButton>
                    </div>
                    
                : <div style={{display: "flex",flexDirection: "row", justifyContent: "flex-start"}}>{liked == true ? <Button onClick={() => unlikepost()} style={{marginBottom: 15, backgroundColor: "#4267B2", border: "solid 1px #d3d3d3", color: "white", fontWeight: 600}}><Image src={likephoto}  style={{width: 20, marginTop: -5}} fluid /> Liked {likeCount}</Button>: 
                <Button onClick={() => likepost()} style={{marginBottom: 15, backgroundColor: "#e3e8ee", border: "solid 1px #d3d3d3", color: "#4267B2", fontWeight: 600}}><Image src={likephoto}  style={{width: 20, marginTop: -5}} fluid /> Like {likeCount}</Button>}</div>}

                {/*localStorage.getItem("user_id")==null?<></>:
                [
                  (liked == true ? <Button onClick={() => unlikepost()} style={{backgroundColor: "#4267B2", border: "solid 1px #d3d3d3", color: "white", fontWeight: 600}}><Image src={likephoto}  style={{width: 20, marginTop: -5}} fluid /> Liked {likeCount}</Button>: 
                <Button onClick={() => likepost()} style={{justifyContent: "flex-start", backgroundColor: "#e3e8ee", border: "solid 1px #d3d3d3", color: "#4267B2", fontWeight: 600}}><Image src={likephoto}  style={{width: 20, marginTop: -5}} fluid /> Like {likeCount}</Button>),
                
                (props.post.id == localStorage.getItem("user_id")? 
                <div style={{display: "flex",flexDirection: "row", justifyContent: "flex-end"}}>
                    <DropdownButton
                      id={`dropdown-button-drop-up`}
                      drop={"up"}
                      title={
                          <Image style={{marginBottom: 15, height: 20}} src={dots} fluid>
                          </Image>
                      }
                    >
                      <Dropdown.Item eventKey="1" onClick={() => {history.push(`/editpost/${props.post.postid}`)} }>Edit</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item eventKey="2" style={{color: "red" }} onClick={() => handleDelete(props.post.postid)}>Delete</Dropdown.Item>
                    </DropdownButton>
                    </div>
                    
                : <></>)]
                    */}
                

                <Row style={{ backgroundColor: "#e3e8ee"}}>
                {localStorage.getItem("user_id")==null ? <></> :
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <button onClick={handleShowTextForm} style={{width: "100%", backgroundColor: "white", borderRadius: "20px", textAlign: "left", marginBottom: 15,marginTop: 15}} type="button" className="btn text-secondary">Type a comment...</button>
                </div>
                }

                {comments.map(comment =>  
                  <Container key={comment.commentid} style={{paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10}}>
                    <div style={{display: "flex", flexDirection: "row", padding: 5}} onClick = {()=>{
                      history.push(`./profile/${comment.id}`)
                  }}>
                  {comment.picurl == null? <Image style={{marginBottom: 10,flexShrink: 0.2}} src={profilephoto} width="50px" height="50px" roundedCircle  />: <Image style={{marginBottom: 10,flexShrink: 0.2}} src={comment.picurl} width="50px" height="50px" roundedCircle />}
                  <div style={{flexGrow: 1}}>
                      <p style={{marginLeft: 10, fontWeight: 600, textTransform: "capitalize"}}>{comment.name}</p>
                      {comment.editdate == null ?
                      <p style={{marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383"}}>{comment.date.substring(0, 16).replace("T", " ")}</p>
                      : <p style={{marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383"}}>{comment.date.substring(0, 16).replace("T", " ")} (Edited {comment.editdate.substring(0, 16).replace("T", " ")})</p>
                      }
                  </div>
                  </div>
                <p>{comment.content}</p>
                {localStorage.getItem("user_id")==comment.id ? 
                <div>
                  <button className="commentedit" onClick={() => {history.push(`/editcomment/${comment.commentid}`)} }>Edit</button>
                  <button className="commentdelete" onClick={() => handleDeleteComment(comment.commentid)}>Delete</button>
                </div>
                
                :<></>}
                </Container> 

               )}

                </Row>
                </Container>


      </>
    )
}
export default Post;