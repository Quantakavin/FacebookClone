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
