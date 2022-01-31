import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navbar from "./Components/Navbar";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./Pages/Login";
import DinoGame from "./Pages/DinoGame";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import UserHome from "./Pages/UserHome";
import Users from "./Pages/Users";
import Requests from "./Pages/Requests";
import EditPost from "./Pages/EditPost";
import EditComment from "./Pages/EditComment";
import ViewProfile from "./Pages/ViewProfile";
import Conversations from "./Pages/Conversations";
import Messages from "./Pages/Messages";
import PageNotFound from "./Pages/404";
import InternalServer from "./Pages/500";
import Notifications from "./Pages/Notifications";
import ViewPost from "./Pages/ViewPost";
import VideoChat from "./Pages/VideoChat";
import { SocketContext, socket } from "./context/socket";
import { AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Switch location={location} key={location.pathname}>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/profile/:id" component={ViewProfile} />
        <Route path="/DinoGame" component={DinoGame} />
        <Route path="/requests" component={Requests} />
        <Route path="/users" component={Users} />
        <Route path="/userhome" component={UserHome} />
        <Route path="/viewpost" component={ViewPost} />
        <Route path="/editpost/:id" component={EditPost} />
        <Route path="/editcomment/:id" component={EditComment} />
        <Route path="/conversations" component={Conversations} />
        <Route path="/messages/:id" component={Messages} />
        <Route path="/video" component={VideoChat} />
        <Route path="/notifications" component={Notifications} />
        <Route path="/post/:id" component={ViewPost} />
        <Route exact path="/" component={Home} />
        <Route path="/500" component={InternalServer} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </AnimatePresence>
  );
};

export default App;
