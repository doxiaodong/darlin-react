import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {
  browserHistory,
  Router,
  Route
} from 'react-router'
import { App } from 'app/views/App'
import { ViewHome } from './views/Home'
import { ViewArticleList } from './views/Article/List'

injectTapEventPlugin()

render(
  (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <div>
        <Router history={browserHistory}>
          <Route path='' component={App}>
            <Route path='/' component={ViewHome} />
            <Route path='/article/:category' component={ViewArticleList} />
          </Route>
        </Router>
      </div>
    </MuiThemeProvider>
  ),
  document.getElementById('app')
)
