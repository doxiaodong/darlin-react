import * as React from 'react'
import { observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from 'components/Page'
import { BaseList } from 'components/BaseList'
import { CategoryWithRouter } from 'components/Category'
import articleStore from 'stores/article'
import i18nStore from 'stores/i18n'

import * as style from './style.scss'

@observer
export class ViewArticleList extends React.Component<RouteComponentProps<{ category: string }>, {}> {

  componentWillReceiveProps(nextProps) {
    const nextCategory = nextProps.match.params.category
    if (nextCategory !== this.props.match.params.category) {
      articleStore.getArticleList(nextCategory)
    }
  }
  componentDidMount() {
    articleStore.getArticleList(this.props.match.params.category)
  }

  render() {
    const { t } = i18nStore
    return (
      <Page title={t('common:articles')}>
        <div className={style.container}>
          <div className={`${style.right} ${style.category}`}>
            <CategoryWithRouter />
          </div>
          <div className={style.left}>
            <BaseList articles={articleStore.articles} />
          </div>
        </div>
      </Page>
    )
  }
}
