import * as React from 'react'
// import { Link } from 'react-router'
import { observer } from 'mobx-react'
import {
  List,
  ListItem
} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { Subheader } from 'components/Subheader'
import { Divider } from 'components/Divider'
import { transformDate } from 'base/transform/date'
import articleStore from 'stores/article'
import i18nStore from 'stores/i18n'

import * as style from './style.scss'

@i18nStore.namespace(['article'])
@observer
export class BaseList extends React.Component<{ articles: any[] }, {}> {

  render() {
    const { articles } = this.props
    const { t } = i18nStore
    const listItem = articles.map((article, index) =>
      (
        <div key={article.url}>
          {index > 0 && <Divider />}
          <ListItem>
            <div className={style.article}>
              <div className={style.title}>{article.title}</div>
              <div>{transformDate(article.createTime)}</div>
            </div>
          </ListItem>
        </div>
      )
    )
    const moreButton = (
      <div className={style.more}>
        <RaisedButton
          label={t('article:loadMore')}
          primary={true}
          onClick={articleStore.getMoreArticles}
        />
      </div>
    )
    return (
      <div className='each-block'>
        <Subheader title={t('article:articleList')} />
        <List style={{ paddingTop: 0 }}>
          {listItem}
          {(articleStore.hasMore || articles.length === 0) && <Divider />}
          {articles.length === 0 && <ListItem>{t('article:noArticle')}</ListItem>}
          {articleStore.hasMore && moreButton}
        </List>
      </div>
    )
  }
}
