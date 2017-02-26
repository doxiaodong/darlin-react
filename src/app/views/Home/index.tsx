import * as React from 'react'
import { observer } from 'mobx-react'
import { CompPage } from 'app/components/Page'
import { CompBaseList } from 'app/views/Article/components/BaseList'

import articleStore from 'app/stores/article'

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
