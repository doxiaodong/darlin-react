import * as React from 'react'
import { observer } from 'mobx-react'
import { CompPage } from 'components/Page'
import { CompBaseList } from 'components/BaseList'

import articleStore from 'stores/article'

@observer
export class ViewHome extends React.Component<{}, {}> {

  getArticleList = () => {
    articleStore.getArticleList('hot')
  }

  componentDidMount() {
    this.getArticleList()
  }

  render() {
    return (
      <CompPage title='首页'>
        <CompBaseList articles={articleStore.articles} />
      </CompPage>
    )
  }
}
