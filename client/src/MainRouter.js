import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './core/Home'
import Login from "./components/login/Login";
import ChatDetails from "./components/Chats/ChatDetails";
import Register from "./components/register/Register";
import VideoCall from "./components/VideoCall/VideoCall";
import Menu from './core/Menu'

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/chats" component={Home} />
            <Route exact path="/chat" component={ChatDetails} />
            <Route excat path="/videocall" component={VideoCall} />
          </Switch>
    </div>
  )
}

export default MainRouter
