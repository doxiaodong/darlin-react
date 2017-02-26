import * as React from 'react'
// import { Link } from 'react-router'
import {
  List,
  ListItem
} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { transformDate } from 'app/base/transform/date'

import * as style from './style.scss'

export class CompBaseList extends React.Component<{ articles: any[] }, {}> {

  render() {
    const listItem = this.props.articles.map((article) =>
      (
        <ListItem key={article.url}>
          <div className={style.article}>
            <div className={style.title}>{article.title}</div>
            <div>{transformDate(article.createTime)}</div>
          </div>
        </ListItem>
      )
    )
    return (
      <List>
        <Subheader>文章列表</Subheader>
        {listItem}
      </List>
    )
  }
}
