import * as React from 'react'

import * as style from './style.scss'

export class Subheader extends React.Component<{ title, subTitle?, right?}, {}> {
  render() {
    const { title, subTitle, right } = this.props
    return (
      <div className={style.header}>
        <span className={style.title}>
          {title}
        </span>
        {subTitle && <div className={style.subtitle}>{subTitle}</div>}
        {right}
      </div>
    )
  }
}
