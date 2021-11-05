import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner, Card, Button } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";

const Note = ({match}) => {
    //const { noteid } = match.id;
    const [notes, setNotes] = useState([]);
    const [deleteLoading,setDeleteLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/note?id=${match.params.id}`)
          .then(response => {
            console.log('promise fulfilled')
            setNotes(response.data.rows)
          })
          .catch(error => {
            console.log(error);
        })
      }, [])

      const handleDelete = (event) => {
        event.preventDefault();
        setDeleteLoading(true)
        axios
        .delete(`http://localhost:5000/api/note/${match.params.id}`)
        .then(response => {
            setDeleteLoading(false)
            console.log(response);
            history.push("/notes")
        })
        .catch(error => {
            setDeleteLoading(false)
            console.log(error);
        })
      }
      return(
          <div>
              <Container>
              {notes.map(note => 
                 <Card class="shadow" style={{ width: '18rem', marginTop: 10, marginBottom: 10 }} key={note.id}>
                     <Card.Body>
                     <Card.Title>Note #{note.id}</Card.Title>
                     <Card.Text>{note.content}</Card.Text>
                     </Card.Body>
                     <Button variant="primary" style={{width: "40%", marginLeft: 20, marginBottom: 10, marginTop: -2}} onClick={() => {history.push(`/editnote/${note.id}`)} }>Edit</Button>
                     {!deleteLoading? 
                     <Button variant="danger" style={{width: "40%", marginLeft: 20, marginBottom: 10, marginTop: -2}} onClick={handleDelete}>Delete</Button> 
                    :  <Button variant="danger" disabled style={{width: "40%", marginLeft: 20, marginBottom: 10, marginTop: -2}}>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                </Button>}
                 </Card>
               )}
            <div>
            <Link to="/notes">Back to Notes</Link>
            </div>
               </Container>
          </div>
      )

    
}

export default Note;