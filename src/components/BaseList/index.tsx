import * as React from 'react'
// import { Link } from 'react-router'
import { observer } from 'mobx-react'
import {
  List,
  ListItem
} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { transformDate } from 'base/transform/date'
import i18nStore from 'stores/i18n'

import * as style from './style.scss'

@observer
export class CompBaseList extends React.Component<{ articles: any[] }, {}> {

  componentDidMount() {
    i18nStore.loadNamespaces(['article'])
  }

  render() {
    const { articles } = this.props
    const { t } = i18nStore
    const listItem = articles.map((article) =>
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
        <Subheader>{t('article:articleList')}</Subheader>
        {listItem}
        {articles.length === 0 && <ListItem>{t('article:noArticle')}</ListItem>}
      </List>
    )
  }
}
