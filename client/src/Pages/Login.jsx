import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Image, Spinner, Alert} from 'react-bootstrap';
import '../Styles/form.scss';
import TopBar from '../Components/TopBar';
import facebooklogo from '../Images/facebooklogo.png'; 
import { useHistory } from "react-router-dom";
import config from '../config/config';
  
  const Login = () => { 
    const [loading,setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const history = useHistory();

    const [Input, setInput] = useState({
        email: '',
        password: ''
      });

      const handleChange = (event) => {
          setInput({
              ...Input,
              [event.target.name]: event.target.value

          })
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        axios
        .post(`${config.baseURL}/login`, {"email": Input.email,"password": Input.password})
        .then(response => {
            setLoading(false)
            console.log(response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id', response.data.id);
            localStorage.setItem('username', response.data.name);
            history.push("/userhome");
        })
        .catch(error => {
          console.log(error)
            setLoading(false)
            setAlertContent(error.response.data.message);  
            setAlert(true);
        })
    }

      return(
          <>
          <header>
              <TopBar />
          </header>
        <div  style={{backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto'}}>
        <Container className="formlogo d-none d-sm-block">
          <Image src={facebooklogo} fluid />
        </Container>
        <Container className="formcontainer shadow">
                <h2 style={{marginLeft: '8%', paddingBottom: 20, fontWeight: 600}}>Log in to your account</h2>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="formlabels">Email address</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="email" className="formfield" type="email" placeholder="Enter email" value={Input.email} onChange={handleChange}/>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="formlabels">Password</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="password" className="formfield" type="password" placeholder="Password" value={Input.password} onChange={handleChange}/>
                </div>
            </Form.Group>
            {alert ?    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 20, marginBottom: -20}}>   <Alert style={{width: "80%"}} variant="danger" onClose={() => setAlert(false)} dismissible>
        <Alert.Heading>Error!</Alert.Heading>
        <p>
          {alertContent}
        </p>
      </Alert></div>: <></> }
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 40}}>
            {!loading? 
            <Button variant="primary" type="submit" className="submitbutton">
            Continue
            </Button>:
            <Button variant="primary" disabled className="submitbutton">
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
            </Button>
  }
            </div>
        </Form>
        <p className="registerlink" style={{ marginTop: 10, marginBottom: -5, fontSize: "0.8em"}}>Don't have an account? <a style={{color: "#4267B2"}} href="/register">Register Now!</a></p>
        </Container>
        </div>
        </>
      )

  }

  export default Login;