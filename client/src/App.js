import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { hot } from 'react-hot-loader'
//import Chat from "./components/Chats/Chat";
import Home from "./core/Home"
import Login from "./components/login/Login";
import ChatDetails from "./components/Chats/ChatDetails";
import Register from "./components/register/Register";
import VideoCall from "./components/VideoCall/VideoCall";
//import Background from './components/common/background/Background'

function App() {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])
  return (
    <div>
    {/* <Background /> */}
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/chats" component={Home} />
            <Route exact path="/chat" component={ChatDetails} />
            <Route excat path="/videocall" component={VideoCall} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default hot(module)(App);
