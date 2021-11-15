import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Image, Spinner, Alert} from 'react-bootstrap';
import '../Styles/form.scss';
import TopBar from '../Components/TopBar';
import facebooklogo from '../Images/facebooklogo.png';
  
  const Register = () => {

      const [loading,setLoading] = useState(false);
      const [alert, setAlert] = useState(false);
      const [alertContent, setAlertContent] = useState('');

      const [Input, setInput] = useState({
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
          setLoading(true);
          axios
          //.post('http://evening-plateau-18994.herokuapp.com/api/register', {"name": Input.name, "email": Input.email,"password": Input.password})
          .post('http://localhost:5000/api/register', {"name": Input.name, "email": Input.email,"password": Input.password})
          .then(response => {
              setLoading(false)
              console.log(response);
          })
          .catch(error => {
              setLoading(false)
              console.log(error);
              //alert(error.response.data.message)
              setAlertContent(error.response.data.message);
              setAlert(true);
          })
      }
      return(
        <>
        <header>
            <TopBar />
        </header>
        <Container className="formlogo d-none d-sm-block">
          <Image src={facebooklogo} fluid />
        </Container>
        <Container className="formcontainer shadow">
                <h2 style={{marginLeft: '8%', paddingBottom: 20, fontWeight: 600}}>Create a new account</h2>
            <Form onSubmit={handleSubmit}>
            
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="formlabels">Full Name</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="name" className="formfield" type="text" placeholder="Your Name" value={Input.name} onChange={handleChange} />
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="formlabels">Email address</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="email" className="formfield" type="email" placeholder="Enter Email" value={Input.email} onChange={handleChange}/>
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="formlabels">Password</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="password" className="formfield" type="password" placeholder="Password" value={Input.password} onChange={handleChange} />
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
            Create Account
            </Button>:
            <Button variant="primary" disabled className="submitbutton">
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
            </Button>
  }
            </div>
        </Form>
        </Container>
        </>
      )

  }

  export default Register;