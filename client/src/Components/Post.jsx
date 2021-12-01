import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton, Image, Container, Row, Button } from 'react-bootstrap';
import '../Styles/home.scss';
import profilephoto from '../Images/profilephoto.png';
import dots from '../Images/dots.png';
import { useHistory } from "react-router-dom";
import config from '../config/config';
import '../Styles/post.scss';
import ReactPlayer from 'react-player'

const Post = (props) => {
  const history = useHistory();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [likesInfo, setLikesInfo] = useState({})

  useEffect(() => {
    let isCancelled = false;
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
        console.log(props.post.postid+"post id")
        axios.get(`${config.baseURL}/getPostLikes`, {params:{ uid: localStorage.getItem('user_id'), pid: props.post.postid }})
          .then(
            likesResult => {
              console.log(likesResult.data)
              console.log("post " + props.post.postid)
              setLikesInfo(likesResult.data)
            }
          )
          .catch(error => {
            if (!isCancelled) {
              console.log(error);
            }
          })
      })
      .catch(error => {
        if (!isCancelled) {
          console.log(error);
        }
      })

    return (() => {
      isCancelled = true;
    });

  }, [])


  const handleDelete = (id) => {
    axios
      .delete(`${config.baseURL}/post/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        props.setRerender(prevState => ({
          render: !prevState.render
        }))
      })
      .catch(error => {
        console.log(error);
      })
  }

  const clickLikeButton = (event) => {
    if (likesInfo.likedByCurrentUser) {
      axios.delete(`${config.baseURL}/deleteLike`)
        .then(setLikesInfo({
          likedByCurrentUser: false,
          likes: likesInfo.likes - 1
        }))
        .catch(error => {
          console.log(error);
        })
    } else {
      axios.post(`${config.baseURL}/postLike`)
        .then(setLikesInfo({
          likedByCurrentUser: true,
          likes: likesInfo.likes + 1
        }))
        .catch(error => {
          console.log(error);
        })
    }
    event.preventDefault();
  }

  return (
    <>
      <Container className="shadow post">
        <div style={{ display: "flex", flexDirection: "row", padding: 5 }} onClick={() => {
          history.push(`/profile/${props.post.id}`)
          window.location.reload();
        }}>

          {props.post.picurl == null ? <Image style={{ marginBottom: 10, flexShrink: 0.2 }} src={profilephoto} width="50px" height="50px" roundedCircle /> : <Image style={{ marginBottom: 10, flexShrink: 0.2 }} src={props.post.picurl} width="50px" height="50px" roundedCircle />}
          <div style={{ flexGrow: 1 }}>
            <p style={{ marginLeft: 10, fontWeight: 600, textTransform: "capitalize" }}>{props.post.name}</p>
            {props.post.editdate == null ?
              <p style={{ marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383" }}>{props.post.date.substring(0, 16).replace("T", " ")}</p>
              : <p style={{ marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383" }}>{props.post.date.substring(0, 16).replace("T", " ")} (Edited {props.post.editdate.substring(0, 16).replace("T", " ")})</p>
            }
          </div>
          <div>
            {
              likesInfo.likes
            } likes
            <Button onClick={() => { clickLikeButton() }}>
              {
                likesInfo.likedByCurrentUser ? "Unlike" : "Like"
              }
            </Button>
          </div>
        </div>
        <hr style={{ marginTop: -5, marginRight: "-2%", marginLeft: "-2%", color: "d3d3d3" }} />
        {props.post.cloudinaryurl == null ?
          <p style={{ marginLeft: "1%", fontSize: "1.15em" }}>{props.post.content}</p> :
          <>
            {props.post.caption == null ? <></> : <p style={{ marginLeft: "1%", fontSize: "1.15em" }}>{props.post.caption}</p>}
            {props.post.type == "image" ?
              <Image width="100%" style={{ marginBottom: 15 }} src={props.post.cloudinaryurl} fluid /> :
              <ReactPlayer width="100%" controls="true" style={{ marginBottom: 15 }} url={props.post.cloudinaryurl} />
            }
          </>
        }
        {props.post.id == localStorage.getItem("user_id") ?
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            <DropdownButton
              id={`dropdown-button-drop-up`}
              drop={"up"}
              title={
                <Image style={{ marginBottom: 15, height: 20 }} src={dots} fluid>

                </Image>
              }
            >
              <Dropdown.Item eventKey="1" onClick={() => { history.push(`/editpost/${props.post.postid}`) }}>Edit</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="2" style={{ color: "red" }} onClick={() => handleDelete(props.post.postid)}>Delete</Dropdown.Item>
            </DropdownButton>
          </div>
          : <></>}
        <Row style={{ backgroundColor: "#e3e8ee" }}>
          {localStorage.getItem("user_id") == null ? <></> :
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <button style={{ width: "100%", backgroundColor: "white", borderRadius: "20px", textAlign: "left", marginBottom: 15, marginTop: 15 }} type="button" className="btn text-secondary">Type a comment...</button>
            </div>
          }
          {showComments ?
            <button onClick={() => setShowComments(showComments => !showComments)}>Hide all comments</button> :
            <button onClick={() => setShowComments(showComments => !showComments)}>Show all comments</button>
          }
          {comments.map(comment =>
            <Container key={comment.commentid} style={{ paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 10 }}>
              <div style={{ display: "flex", flexDirection: "row", padding: 5 }} onClick={() => {
                history.push(`/profile/${comment.id}`)
                window.location.reload();
              }}>
                {comment.picurl == null ? <Image style={{ marginBottom: 10, flexShrink: 0.2 }} src={profilephoto} width="50px" height="50px" roundedCircle /> : <Image style={{ marginBottom: 10, flexShrink: 0.2 }} src={comment.picurl} width="50px" height="50px" roundedCircle />}
                <div style={{ flexGrow: 1 }}>
                  <p style={{ marginLeft: 10, fontWeight: 600, textTransform: "capitalize" }}>{comment.name}</p>
                  {comment.editdate == null ?
                    <p style={{ marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383" }}>{comment.date.substring(0, 16).replace("T", " ")}</p>
                    : <p style={{ marginLeft: 10, marginTop: -15, fontSize: "0.8em", color: "#838383" }}>{comment.date.substring(0, 16).replace("T", " ")} (Edited {comment.editdate.substring(0, 16).replace("T", " ")})</p>
                  }
                </div>
              </div>
              <p>{comment.content}</p>
            </Container>

          )}

        </Row>
      </Container>


    </>
  )
}
export default Post;