import * as React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import {
  List,
  ListItem
} from 'material-ui/List'
import {
  Card,
  CardHeader
} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { Divider } from 'components/Divider'
import { Loading } from 'components/Loading'
import { transformDate } from 'base/transform/date'
import articleStore from 'stores/article'
import i18nStore from 'stores/i18n'

import {
  headerStyle,
  titleStyle
} from 'styles/react/card/header'

import * as style from './style.scss'

@i18nStore.namespace(['article'])
@observer
export class BaseList extends React.Component<{ articles: any[] }, {}> {

  render() {
    const { articles } = this.props
    const { t } = i18nStore
    const { loadings } = articleStore
    const listItem = articles.map((article, index) =>
      (
        <div key={article.url}>
          {index > 0 && <Divider />}
          <Link to={`/article/${article.category}/${article.url}`}>
            <ListItem>
              <div className={style.article}>
                <div className={style.title}>{article.title}</div>
                <div>{transformDate(article.createTime)}</div>
              </div>
            </ListItem>
          </Link>
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
      <Card className="each-block">
        <CardHeader
          title={t('article:articleList')}
          style={headerStyle}
          titleStyle={titleStyle}
        />
        <List style={{ paddingTop: 0 }}>
          {listItem}

          {loadings.articles && <Loading />}
          {(articleStore.hasMore || articles.length === 0) && !loadings.articles && <Divider />}
          {articles.length === 0 && !loadings.articles && <ListItem>{t('article:noArticle')}</ListItem>}
          {articleStore.hasMore && !loadings.articles && moreButton}
        </List>
      </Card>
    )
  }
}
