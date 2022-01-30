import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import Navbar from './Components/Navbar';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation
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
import { AnimatePresence } from "framer-motion"
import 'bootstrap/dist/css/bootstrap.min.css';
const dotenv = require('dotenv');
dotenv.config();


const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <SocketContext.Provider value={socket}>
        <Router>
            <App />
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
