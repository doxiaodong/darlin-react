import * as React from 'react'
import { observer } from 'mobx-react'
import { Title } from 'components/Title'
import * as style from './style.scss'

@observer
export class Page extends React.Component<{ title: string }, void> {

  render() {
    const { title } = this.props
    return (
      <div className={style.page}>
        <Title title={title} />
        {this.props.children}
      </div>
    )
  }
}
