import * as React from 'react'
import { observer } from 'mobx-react'
import {
  Card,
  CardHeader,
  CardText
} from 'material-ui/Card'
import { Page } from 'components/Page'
import { CategoryWithRouter } from 'components/Category'
import { Marked } from 'components/Marked'
import { Loading } from 'components/Loading'
import i18nStore from 'stores/i18n'

import { Comment } from './Comment'
import store from './store'

import {
  headerStyle,
  titleStyle
} from 'styles/react/card/header'

import * as styleList from '../List/style.scss'

@i18nStore.namespace(['article'])
@observer
export class ViewArticleDetail extends React.Component<{ params?: any }, {}> {

  componentWillMount() {
    store.getArticleDetail(this.props.params.url)
  }

  componentWillUnmount() {
    store.clear()
  }

  render() {
    const { t } = i18nStore
    const { title, subtitle, content, loadings } = store
    const articleTitle = title || t('article:articleDetail')
    return (
      <Page title={articleTitle}>
        <div className={styleList.container}>
          <div className={`${styleList.right} ${styleList.category}`}>
            <CategoryWithRouter />
          </div>
          <div className={styleList.left}>
            <Card className='each-block'>
              <CardHeader
                title={articleTitle}
                style={headerStyle}
                titleStyle={titleStyle}
                subtitle={subtitle}
              />
              <CardText>
                {!loadings.articleDetail && <Marked md={content} />}
                {loadings.articleDetail && <Loading />}
              </CardText>
            </Card>

            <Comment />
          </div>
        </div>
      </Page>
    )
  }
}
