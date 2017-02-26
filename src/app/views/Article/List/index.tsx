import * as React from 'react'
import { observer } from 'mobx-react'
import RaisedButton from 'material-ui/RaisedButton'
import { CompPage } from 'app/components/Page'
import { CompBaseList } from '../components/BaseList'
import { CompCategoryWithRouter } from '../components/Category'
import articleStore, { ArticleStore } from 'app/stores/article'
import categoryStore from '../components/Category/store'

import * as style from './style.scss'

@observer
export class ViewArticleList extends React.Component<{ articleStore: ArticleStore, params?: any }, {}> {

  static defaultProps = {
    articleStore
  }

  componentDidMount() {
    this.props.articleStore.getArticleList(this.props.params.category)
  }

  render() {
    const moreButton = (
      <RaisedButton label='加载更多' primary={true} onClick={this.props.articleStore.getMoreArticles} />
    )
    return (
      <CompPage title='首页'>
        <div className={style.container}>
          <div className={`${style.right} ${style.category}`}>
            <CompCategoryWithRouter categoryStore={categoryStore} articleStore={articleStore} />
          </div>
          <div className={style.left}>
            <CompBaseList articles={this.props.articleStore.articles} />
            {this.props.articleStore.hasMore && moreButton}
          </div>
        </div>
      </CompPage>
    )
  }
}
