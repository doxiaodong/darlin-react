import * as React from 'react'
import { NavbarWithRouter } from 'components/Navbar'

import * as style from './common.scss'

export class Common extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <NavbarWithRouter />
        <article className={style.article}>
          {this.props.children}
        </article>
        <div className={style.bgpicture} />
      </div>
    )
  }
}
