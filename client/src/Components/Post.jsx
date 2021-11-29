import React from 'react';
import axios from 'axios';
import { Dropdown, DropdownButton, Image, Container} from 'react-bootstrap';
import '../Styles/home.scss';
import profilephoto from '../Images/profilephoto.png'; 
import dots from '../Images/dots.png'; 
import { useHistory } from "react-router-dom";
import config from '../config/config';

const Post = (props) => {
    const history = useHistory();
    
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

    return (
      <>
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
                    <Image style={{marginBottom: 15}}src={props.post.cloudinaryurl} fluid />
                    </>
                }
                {props.post.id == localStorage.getItem("user_id")? 
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
                : <></>}
                </Container>


      </>
    )
}
export default Post;