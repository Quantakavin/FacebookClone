import { Link } from "react-router-dom";

const Home = () => {
    return(
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
    )

}

export default Home;