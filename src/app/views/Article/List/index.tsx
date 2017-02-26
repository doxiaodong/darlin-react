import * as React from 'react'
import { observer } from 'mobx-react'
import RaisedButton from 'material-ui/RaisedButton'
import { CompPage } from 'app/components/Page'
import { CompBaseList } from '../components/BaseList'
import { CompCategoryWithRouter } from '../components/Category'
import articleStore from 'app/stores/article'

import * as style from './style.scss'

@observer
export class ViewArticleList extends React.Component<{ params?: any }, {}> {

  componentDidMount() {
    articleStore.getArticleList(this.props.params.category)
  }

  render() {
    const moreButton = (
      <RaisedButton label='加载更多' primary={true} onClick={articleStore.getMoreArticles} />
    )
    return (
      <CompPage title='首页'>
        <div className={style.container}>
          <div className={`${style.right} ${style.category}`}>
            <CompCategoryWithRouter />
          </div>
          <div className={style.left}>
            <CompBaseList articles={articleStore.articles} />
            {articleStore.hasMore && moreButton}
          </div>
        </div>
      </CompPage>
    )
  }
}
