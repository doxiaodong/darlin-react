import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {
  ,
  BrowserRouter as Router
} from 'react-router-dom'
import { rootRoute } from './route'

import 'styles/global.scss'

const theme = getMuiTheme({
  palette: {
    primary1Color: '#009688',
    primary2Color: '#009688',
    primary3Color: '#009688'
  }
})

class App extends React.Component<{}, {}> {

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Router history={browserHistory} routes={rootRoute} />
      </MuiThemeProvider>
    )
  }
}

export default App
