import React from "react";
import "./App.css";
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Chat from "./components/Chats/Chat"


function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path="/chats" component={Chat}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
