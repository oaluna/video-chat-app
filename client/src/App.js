import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Chat from "./components/Chats/Chat";
import Login from "./components/login/Login";
import ChatDetails from "./components/Chats/ChatDetails";
import Register from "./components/register/Register";
import VideoCall from "./components/VideoCall/VideoCall";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/chats" component={Chat} />
          <Route exact path="/chat" component={ChatDetails} />
          <Route excat path="/videocall" component={VideoCall} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
