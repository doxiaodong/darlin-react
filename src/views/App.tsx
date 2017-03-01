import * as React from 'react'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {
  browserHistory,
  Router,
  Route
} from 'react-router'
import { Common } from './Common'
import { ViewHome } from 'views/Home'
import { ViewArticleList } from 'views/Article/List'
import 'styles/global.scss'

injectTapEventPlugin()

const theme = getMuiTheme({
  palette: {
    primary1Color: '#009688',
    primary2Color: '#009688',
    primary3Color: '#009688'
  }
})

export class App extends React.Component<{}, {}> {

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Router history={browserHistory}>
          <Route path='' component={Common}>
            <Route path='/' component={ViewHome} />
            <Route path='/article/:category' component={ViewArticleList} />
          </Route>
        </Router>
      </MuiThemeProvider>
    )
  }
}
