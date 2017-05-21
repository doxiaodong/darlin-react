import * as React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import {
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import { Common } from './Common'
import { ViewHome } from './Home'

import { ViewArticleList } from './Article/List'
import { ViewArticleDetail } from './Article/Detail'
import { ViewSelf } from './Self'
import { ViewNotfound } from './Notfound'

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
        <Common>
          <Switch>
            <Route exact={true} path="/" component={ViewHome} />
            <Route exact={true} path="/article/:category" component={ViewArticleList} />
            <Route path="/article/:category/:url" component={ViewArticleDetail} />
            <Route path="/self/links" component={ViewSelf} />

            <Route path="/404" component={ViewNotfound} />
            <Route render={() => (<Redirect to="/404" />)} />
          </Switch>
        </Common>
      </MuiThemeProvider>
    )
  }
}

export default App
