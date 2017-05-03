import * as React from 'react'
import { observer } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom'
import Snackbar from 'material-ui/Snackbar'
import { NavbarWithRouter } from 'components/Navbar'
import { Footer } from 'components/Footer'
import store from 'stores/snack'

import * as style from './common.scss'

@observer
export class Common extends React.Component<{}, {}> {

  render() {
    const { isOpen, message } = store
    return (
      <Router>
        <div className="h100">
          <NavbarWithRouter />
          <article className={style.article}>
            {this.props.children}
          </article>
          <Footer />
          <div className={style.bgpicture} />
          <Snackbar
            open={isOpen}
            message={message}
            autoHideDuration={2000}
          />
        </div>
      </Router>
    )
  }
}
