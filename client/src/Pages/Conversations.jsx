import React, { useState } from 'react';
import TopBar from '../Components/TopBar';
import { Image, Container, Row, Card, Button } from 'react-bootstrap';

const Conversations = () => {

    return(
        <>
        <header>
            <TopBar />
        </header>
        <div style={{position: "relative",backgroundColor: "#e3e8ee", height: "100vh",overflow: 'auto',paddingTop: 50, paddingBottom: 50}}>
        <Container>
            <Row>
                <h2 style={{marginTop: 10, marginBottom: 20}}>Conversations</h2>
            </Row>
            <Row>
                <h2 style={{marginTop: 10, marginBottom: 20}}>Other Friends</h2>
            </Row>
        </Container>
        </div>
        </>
    )

}

export default Conversations;