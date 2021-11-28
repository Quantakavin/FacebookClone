import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Container, Spinner} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import '../Styles/form.scss';
  
  const EditNote = ({match}) => { 
    const [Input, setInput] = useState({
        content: ''
      });

      const [loading,setLoading] = useState(false);

      const history = useHistory();

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
        .put(`http://localhost:5000/api/note/${match.params.id}`, {"content": Input.content})
        .then(response => {
            setLoading(false)
            console.log(response);
            history.push(`/note/${match.params.id}`)
        })
        .catch(error => {
            setLoading(false)
            console.log(error);
        })
    }
    

      return(
        <Container className="formcontainer shadow">
                <h2 style={{marginLeft: '8%', paddingBottom: 20, fontWeight: 600}}>Edit Note</h2>
            <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="formlabels">Content</Form.Label>
                <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <Form.Control name="content" className="formfield" as="textarea" rows={5} placeholder="Type your note here..." value={Input.content} onChange={handleChange}/>
                </div>
            </Form.Group>
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

  export default EditNote;