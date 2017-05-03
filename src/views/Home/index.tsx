import * as React from 'react'
import { observer } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from 'components/Page'
import { BaseList } from 'components/BaseList'

import articleStore from 'stores/article'
import i18nStore from 'stores/i18n'

@observer
export class ViewHome extends React.Component<RouteComponentProps<{}>, {}> {

  componentDidMount() {
    setTimeout(() => {
      articleStore.getArticleList('hot')
    }, 0)
  }

  render() {
    const { t } = i18nStore
    return (
      <Page title={t('common:home')}>
        <BaseList articles={articleStore.articles} />
      </Page>
    )
  }
}
