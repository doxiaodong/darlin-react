import * as React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

import * as style from './style.scss'

export class Loading extends React.Component<{}, {}> {
  render() {
    return (
      <div className={style.center}>
        <CircularProgress />
      </div>
    )
  }
}
