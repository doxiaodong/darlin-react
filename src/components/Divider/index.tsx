import * as React from 'react'

import * as style from './style.scss'

export class Divider extends React.Component<{}, {}> {
  render() {
    return (
      <hr className={style.hr} />
    )
  }
}
