import * as React from 'react'
import { Link } from 'react-router'

export class CompNavbar extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <Link to='/'>首页</Link>
        {/* TODO: fix 文章列表 list doesn't refresh bug */}
        <Link to='/article/all'>文章列表</Link>
      </div>
    )
  }
}
