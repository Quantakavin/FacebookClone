import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import UserHome from './Pages/UserHome';
import Users from './Pages/Users';
import EditPost from './Pages/EditPost';
import EditComment from './Pages/EditComment';
import ViewProfile from './Pages/ViewProfile'
import 'bootstrap/dist/css/bootstrap.min.css';
const dotenv = require('dotenv');
dotenv.config();

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route path="/register">
                    <Register></Register>
                </Route>


                <Route path="/profile/:id" render={(props) => <ViewProfile {...props} />} />



                <Route path="/users" render={(props) => <Users {...props} />} />
                <Route path="/userhome" render={(props) => <UserHome {...props} />} />
                <Route path="/editpost/:id" render={(props) => <EditPost {...props} />} />
                <Route path="/editcomment/:id" render={(props) => <EditComment {...props} />} />
                <Route path="/">
                    <Home></Home>
                </Route>
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
