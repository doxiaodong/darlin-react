import * as React from 'react'
import { NavbarWithRouter } from 'components/Navbar'
import { Footer } from 'components/Footer'

import * as style from './common.scss'

export class Common extends React.Component<void, void> {

  render() {
    return (
      <div className="h100">
        <NavbarWithRouter />
        <article className={style.article}>
          {this.props.children}
        </article>
        <Footer />
        <div className={style.bgpicture} />
      </div>
    )
  }
}
