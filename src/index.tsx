import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {
  browserHistory,
  Router,
  Route
} from 'react-router'
import { App } from 'views/App'
import { ViewHome } from 'views/Home'
import { ViewArticleList } from 'views/Article/List'

injectTapEventPlugin()

const theme = getMuiTheme({
  palette: {
    primary1Color: '#009688',
    primary2Color: '#009688',
    primary3Color: '#009688'
  }
})

render(
  (
    <MuiThemeProvider muiTheme={theme}>
      <Router history={browserHistory}>
        <Route path='' component={App}>
          <Route path='/' component={ViewHome} />
          <Route path='/article/:category' component={ViewArticleList} />
        </Route>
      </Router>
    </MuiThemeProvider>
  ),
  document.getElementById('app')
)
