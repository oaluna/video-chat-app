import React, { useEffect } from 'react'
import { BrowserRouter} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { hot } from 'react-hot-loader'
import MainRouter from './MainRouter'
//import Chat from "./components/Chats/Chat";

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
<MainRouter />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default hot(module)(App);
