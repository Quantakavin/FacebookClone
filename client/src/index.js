import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navbar from './Components/Navbar';
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
import Messages from './Pages/Messages';
import PageNotFound from './Pages/404';
import InternalServer from './Pages/500';
import Notifications from './Pages/Notifications'
import ViewPost from './Pages/ViewPost'
import VideoChat2 from './Pages/VideoChat2'
import {SocketContext, socket} from './context/socket';
import 'bootstrap/dist/css/bootstrap.min.css';
const dotenv = require('dotenv');
dotenv.config();


const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <SocketContext.Provider value={socket}>
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
                <Route path="/requests" component = {Requests} />
                <Route path="/users" component = {Users} />
                <Route path="/userhome" component = {UserHome} />
                <Route path="/viewpost" component ={ViewPost} />
                <Route path="/editpost/:id" component = {EditPost} />
                <Route path="/editcomment/:id" component = {EditComment} />
                <Route path="/conversations" component = {Conversations} />
                <Route path="/messages/:id" component = {Messages} />
                <Route path="/video" component = {VideoChat2} />
                <Route path="/notifications" component ={Notifications} />
                <Route path="/post/:id" component ={ViewPost} />
                <Route exact path="/" component={Home} />
                <Route path="/500" component={InternalServer} />
                <Route path = "*" component = {PageNotFound} />
            </Switch>
        </Router>
        </SocketContext.Provider>
    </QueryClientProvider>
    ,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
