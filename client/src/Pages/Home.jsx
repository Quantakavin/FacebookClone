import { Link } from "react-router-dom";
import TopBar from '../Components/TopBar';
import '../Styles/main.scss';
import worldmap from '../Images/worldmap.png'; 
import { Image, Container } from 'react-bootstrap';

const Home = () => {


    return(
        <>
        <header>
            <TopBar />
        </header>
        <div className="background" style={{ height: "100vh",overflow: 'auto'}}>
            <Container className="heading" style={{paddingTop: 60}}>
            <h1 style={{textAlign: "left", color: "#22355c", fontWeight: 600}}>Facebook helps you connect and share with the people of your life</h1>
            </Container>
            <Container style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 40}}>
            <Image src={worldmap} fluid />
            </Container>
        </div>
        </>
    )

}

export default Home;