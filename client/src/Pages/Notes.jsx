import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";



const Notes = () => {
    const [notes, setNotes] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios
          .get('http://localhost:5000/api/notes')
          .then(response => {
            console.log('promise fulfilled')
            setNotes(response.data.rows)
          })
          .catch(error => {
            console.log(error);
        })
      }, [])

      return(
          <div>
              <Container>
                <Row>
                <h1 style={{marginTop: 50, marginBottom: 30}}>Notes</h1>
                </Row>
                <Row>
                    <Button variant="primary" style={{ marginLeft: 20, marginBottom: 30, width: "10%"}} onClick={() => {history.push('/newnote')} }>New Note</Button>
                </Row>
              {notes.map(note => 
                 <Card class="shadow" style={{ width: '18rem', marginTop: 10, marginBottom: 10 }} key={note.id}>
                     <Card.Body>
                     <Card.Title>Note #{note.id}</Card.Title>
                     <Card.Text>{note.content}</Card.Text>
                     </Card.Body>
                     <Button variant="primary" style={{width: "40%", marginLeft: 20, marginBottom: 10, marginTop: -2}} onClick={() => {history.push(`/note/${note.id}`)} }>View</Button>
                 </Card>
               )}
               </Container>
          </div>
      )

    
}

export default Notes;