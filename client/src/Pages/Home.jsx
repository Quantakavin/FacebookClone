import { Link } from "react-router-dom";
import TopBar from '../Components/TopBar';

const Home = () => {
    return(
        <>
        <header>
            <TopBar />
        </header>
        <div>
            <p>
                Hello World
            </p>
            <div>
            <Link to="/login">Login</Link>
            </div>
            <div>
            <Link to="/Register">Register</Link>
            </div>
        </div>
        </>
    )

}

export default Home;