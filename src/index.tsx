import * as React from 'react'
import { render } from 'react-dom'
import {
  browserHistory,
  Router,
  Route
} from 'react-router'
import ViewIndex from './views/home'

render(
  (
    <Router history={browserHistory}>
      <Route path='/' component={ViewIndex} />
    </Router>
  ),
  document.getElementById('app')
)
