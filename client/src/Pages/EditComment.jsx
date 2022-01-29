import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../Components/TopBar';
import { Alert, Button, Form, Container, Spinner } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../Styles/form.scss';
import config from '../config/config';

const EditComment = ({match}) => { 
    const [comment, setComment] = useState([]);
    const history = useHistory();
    const [borderColor, setBorderColor]= useState('transparent');
    const [errorMsg, setErrorMsg]= useState('');
    const [TextInput, setTextInput] = useState({
        content: ''
      });


    useEffect(() => {
        axios
        .get(`${config.baseURL}/comment/${match.params.id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then(response => {
          console.log('promise fulfilled')
          setComment(response.data)
          setTextInput({content:response.data.content})
        })
        .catch(error => {
          console.log(error);
      })
    }, [])

    const [textFormLoading,setTextFormLoading] = useState(false);
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
        .put(`${config.baseURL}/comment/${match.params.id}`, {"content": TextInput.content}, {
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

  
    return (
      <>
      <header>
          <TopBar />
      </header>
    <div  style={{backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto'}}>
      {localStorage.getItem("user_id")==comment.id?
    <Container className="formcontainer shadow" style={{marginTop: 100}}>

          <>
          <h2 style={{marginLeft: '8%',paddingBottom: 20, fontWeight: 600}}>Edit Comment</h2>
          <Form onSubmit={createTextPost}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control style={{borderColor: borderColor,width: "85%"}} name="content" className="text-secondary" as="textarea" rows={5} value={TextInput.content} onChange={handleTextChange}/>
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
    </Container>: 
    <Container style={{marginTop: 50,display: 'flex',  justifyContent:'center', alignItems:'center'}}>
       <Alert style={{width: "80%"}} variant="danger">
        <Alert.Heading>Forbidden!</Alert.Heading>
        <p>
          You do not have access to edit this comment. 
        </p>
      </Alert>
    </Container>
    }
    </div>
    </>
    )
}

export default EditComment; 