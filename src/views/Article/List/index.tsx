import * as React from 'react'
import { observer } from 'mobx-react'
import { CompPage } from 'components/Page'
import { CompBaseList } from 'components/BaseList'
import { CompCategoryWithRouter } from 'components/Category'
import articleStore from 'stores/article'
import i18nStore from 'stores/i18n'

import * as style from './style.scss'

@observer
export class ViewArticleList extends React.Component<{ params?: any }, {}> {

  componentWillReceiveProps(nextProps) {
    articleStore.getArticleList(nextProps.params.category)
  }
  componentDidMount() {
    articleStore.getArticleList(this.props.params.category)
  }

  render() {
    const { t } = i18nStore
    return (
      <CompPage title={t('common:articles')}>
        <div className={style.container}>
          <div className={`${style.right} ${style.category}`}>
            <CompCategoryWithRouter />
          </div>
          <div className={style.left}>
            <CompBaseList articles={articleStore.articles} />
          </div>
        </div>
      </CompPage>
    )
  }
}
