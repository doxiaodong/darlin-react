import * as React from 'react'
import { observer } from 'mobx-react'
import { CompPage } from 'components/Page'
import { CompBaseList } from 'components/BaseList'

import articleStore from 'stores/article'
import i18nStore from 'stores/i18n'

@observer
export class ViewHome extends React.Component<{}, {}> {

  getArticleList = () => {
    articleStore.getArticleList('hot')
  }

  componentDidMount() {
    this.getArticleList()
  }

  render() {
    const { t } = i18nStore
    return (
      <CompPage title={t('common:home')}>
        <CompBaseList articles={articleStore.articles} />
      </CompPage>
    )
  }
}
