import * as React from 'react'
import { CompTitle } from 'components/Title'
import * as style from './style.scss'

export class CompPage extends React.Component<{ title: string }, {}> {

  render() {
    return (
      <div className={style.page}>
        <CompTitle title={this.props.title} />
        {this.props.children}
      </div>
    )
  }
}
