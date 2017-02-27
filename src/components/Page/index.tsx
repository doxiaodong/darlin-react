import * as React from 'react'
import { observer } from 'mobx-react'
import { CompTitle } from 'components/Title'
import * as style from './style.scss'

@observer
export class CompPage extends React.Component<{ title: string }, {}> {

  render() {
    const { title } = this.props
    return (
      <div className={style.page}>
        <CompTitle title={title} />
        {this.props.children}
      </div>
    )
  }
}
