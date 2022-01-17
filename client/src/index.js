import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import {  QueryClient, QueryClientProvider } from 'react-query';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';
import UserHome from './Pages/UserHome';
import Users from './Pages/Users';
import Requests from './Pages/Requests'
import EditPost from './Pages/EditPost';
import EditComment from './Pages/EditComment';
import ViewProfile from './Pages/ViewProfile';
import Conversations from './Pages/Conversations';
import PageNotFound from './Pages/404';
import 'bootstrap/dist/css/bootstrap.min.css';
const dotenv = require('dotenv');
dotenv.config();


const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <Router>
            <Switch>
                {/*
                <Route path="/login">
                    <Login></Login>
                </Route>
                <Route path="/register">
                    <Register></Register>
                </Route>


                <Route path="/profile/:id" render={(props) => <ViewProfile {...props} />} />



                <Route path="/users" render={(props) => <Users {...props} />} />
                <Route path="/requests" render={(props) => <Requests {...props} />} />
                <Route path="/userhome" render={(props) => <UserHome {...props} />} />
                <Route path="/editpost/:id" render={(props) => <EditPost {...props} />} />
                <Route path="/editcomment/:id" render={(props) => <EditComment {...props} />} />
                <Route path="/conversations" render={(props) => <Conversations {...props} />} />
                <Route path="/">
                    <Home></Home>
                </Route>
                <Route path="*" render={(props) => <PageNotFound {...props} />} />
                */}

                <Route path="/login" component ={Login} />
                <Route path="/register" component = {Register} />
                <Route path="/profile/:id" component = {ViewProfile} />
                <Route path="/users" component = {Users} />
                <Route path="/userhome" component = {UserHome} />
                <Route path="/editpost/:id" component = {EditPost} />
                <Route path="/editcomment/:id" component = {EditComment} />
                <Route path="/conversations" component = {Conversations} />
                <Route exact path="/" component={Home} />
                <Route path = "*" component = {PageNotFound} />
            </Switch>
        </Router>
    </QueryClientProvider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
