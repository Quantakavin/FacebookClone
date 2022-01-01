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
import UserHome2 from './Pages/UserHome2';
import Home from './Pages/Home';
import Register from './Pages/Register';
import UserHome from './Pages/UserHome';
import Users from './Pages/Users';
import EditPost from './Pages/EditPost';
import EditComment from './Pages/EditComment';
import ViewProfile from './Pages/ViewProfile';
import Conversations from './Pages/Conversations';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
const dotenv = require('dotenv');
dotenv.config();



const queryClient = new QueryClient()


ReactDOM.render(
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
                <Route path="/userhome2" render={(props) => <UserHome2 {...props} />} />
                <Route path="/editpost/:id" render={(props) => <EditPost {...props} />} />
                <Route path="/editcomment/:id" render={(props) => <EditComment {...props} />} />
                <Route path="/conversations" render={(props) => <Conversations {...props} />} />
                <Route path="/">
                    <Home></Home>
                </Route>
            </Switch>
        </Router>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
