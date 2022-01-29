import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Image, Spinner, Alert} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import '../Styles/form.scss';
import TopBar from '../Components/TopBar';
import facebooklogo from '../Images/facebooklogo.png';
import { useHistory } from "react-router-dom";
import config from '../config/config';
import { motion } from "framer-motion";

  const Login = () => {
    const [loading,setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
    axios
    .post(`${config.baseURL}/login`, data)
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

    return (
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
          <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="formlabels">Email Address </Form.Label>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <Form.Control type="email" placeholder="Enter email" className="formfield" {...register("email",  { required: "Email cannot be empty!", pattern: {value: /^\S+@\S+\.\S+$/i, message: "Email is not valid!" }})} />
              </div> 
              <p style={{color: "red", fontSize: "0.85em", marginLeft: "8%", marginTop: 5}}>{errors.email?.message}</p>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="formlabels">Password </Form.Label>
              <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
              <Form.Control type="password" placeholder="Password" className="formfield" {...register("password",  { required: "Password cannot be empty!"})} />
              </div>
              <p style={{color: "red", fontSize: "0.85em", marginLeft: "8%", marginTop: 5}}>{errors.password?.message}</p>
            </Form.Group>
              {alert ?    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 20, marginBottom: -20}}>   <Alert style={{width: "80%"}} variant="danger" onClose={() => setAlert(false)} dismissible>
        <Alert.Heading>Error!</Alert.Heading>
        <p>
          {alertContent}
        </p>
      </Alert></div>: <></> }
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 40}}>
            {!loading? 
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} variant="primary" type="submit" className="submitbutton">
            Continue
            </motion.button>:
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
    );
  }

  export default Login;