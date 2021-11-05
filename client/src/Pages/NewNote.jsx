import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Spinner} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../Styles/form.scss';
  
  const NewNote = () => { 
    const [Input, setInput] = useState({
        content: ''
      });
    
      const [options, setOptions] = useState("axios");
      const [loading,setLoading] = useState(false);

      const history = useHistory();

      const changeOptions = (event) => {
          setOptions(event.target.value)
      }

      const handleChange = (event) => {
          setInput({
              ...Input,
              [event.target.name]: event.target.value

          })
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        if (options == "axios") {
            axios
            .post('http://localhost:5000/api/note', {"content": Input.content})
            .then(response => {
                setLoading(false)
                console.log(response);
                history.push("/notes")
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
            })
        } else {
            fetch('http://localhost:5000/api/note',{method: 'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify({"content": Input.content})})
            .then(response => {
                setLoading(false)
                console.log(response);
                history.push("/notes")
            })
            .catch(error => {
                setLoading(false)
                console.log(error);
            })

        }
    }

      return(
        <Container className="formcontainer shadow">
                <h2 style={{marginLeft: '8%', paddingBottom: 20, fontWeight: 600}}>Create Note</h2>
            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="formlabels">Content</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="content" className="formfield" as="textarea" rows={5} placeholder="Type your note here..." value={Input.content} onChange={handleChange}/>
                </div>
            </Form.Group>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <Form.Select value={options} onChange={changeOptions} className="me-sm-2" style={{ width: '60%'}}>
                <option value="axios">Axios</option>
                <option value="fetch">Fetch</option>
             </Form.Select>
             </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 40}}>
            {!loading? 
            <Button variant="primary" type="submit" className="submitbutton">
            Submit
            </Button> :
            <Button variant="primary" disabled className="submitbutton">
                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
            </Button>
  }
            </div>
        </Form>
        </Container>
      )

  }

  export default NewNote;