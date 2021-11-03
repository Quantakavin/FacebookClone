import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container} from 'react-bootstrap';
import '../Styles/register.scss';
  
  const Register = () => {

      const [Input, setInput] = React.useState({
        name: '',
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
          axios
          .post('http://localhost:5000/api/register', {"name": Input.name, "email": Input.email,"password": Input.password})
          .then(response => {
              console.log(response);
              alert(response)
          })
          .catch(error => {
              console.log(error);
              alert(error.response.status)
          })
      }
      return(
        <Container className="registercontainer shadow">
                <h2 style={{marginLeft: '8%', paddingBottom: 20, fontWeight: 600}}>Create a new account</h2>
            <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="registerlabels">Full Name</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="name" className="formfield" type="text" placeholder="Your Name" value={Input.name} onChange={handleChange} />
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="registerlabels">Email address</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="email" className="formfield" type="email" placeholder="Enter Email" value={Input.email} onChange={handleChange}/>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="registerlabels">Password</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="password" className="formfield" type="password" placeholder="Password" value={Input.password} onChange={handleChange} />
                </div>
            </Form.Group>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 40}}>
            <Button variant="primary" type="submit" className="submitbutton">
            Create Account
            </Button>
            </div>
        </Form>
        </Container>
      )

  }

  export default Register;