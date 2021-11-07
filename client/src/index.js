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
import NewNote from './Pages/NewNote';
import Notes from './Pages/Notes';
import Note from './Pages/Note';
import EditNote from './Pages/EditNote';
import 'bootstrap/dist/css/bootstrap.min.css';
// "/whatever" leads to the .jsx pages
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
            <Route path="/newnote">
                <NewNote></NewNote>
            </Route>
            <Route path="/notes">
                <Notes></Notes>
            </Route>
            <Route path="/editnote/:id" render={(props) => <EditNote {...props} />} />
            <Route path="/note/:id" render={(props) => <Note {...props} />} />
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
