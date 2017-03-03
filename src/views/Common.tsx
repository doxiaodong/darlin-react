import * as React from 'react'
import { CompNavbarWithRouter } from 'components/Navbar'

import * as style from './common.scss'

export class Common extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <CompNavbarWithRouter />
        <article className={style.article}>
          {this.props.children}
        </article>
        <div className={style.bgpicture} />
      </div>
    )
  }
}
