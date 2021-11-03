import { Button, Form, Container} from 'react-bootstrap';
import '../Styles/login.scss';
  
  const Login = () => {
      return(
        <Container className="logincontainer shadow">
                <h2 style={{marginLeft: '8%', paddingBottom: 20, fontWeight: 600}}>Log in to your account</h2>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="loginlabels">Email address</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control className="formfield" type="email" placeholder="Enter email" />
                </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="loginlabels">Password</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control  className="formfield" type="password" placeholder="Password" />
                </div>
            </Form.Group>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 40}}>
            <Button variant="primary" type="submit" className="submitbutton">
            Continue
            </Button>
            </div>
        </Form>
        </Container>
      )

  }

  export default Login;