import * as React from 'react'
import { observer } from 'mobx-react'
import {
  Card,
  CardHeader
} from 'material-ui/Card'
import { Page } from 'components/Page'
import { CategoryWithRouter } from 'components/Category'
import i18nStore from 'stores/i18n'
import articleDetailStore from 'stores/article-detail'

import {
  headerStyle,
  titleStyle
} from 'styles/react/card/header'

import * as styleList from '../List/style.scss'

@i18nStore.namespace(['article'])
@observer
export class ViewArticleDetail extends React.Component<{ params?: any }, {}> {

  componentWillMount() {
    articleDetailStore.getArticleDetail(this.props.params.url)
  }

  render() {
    const { t } = i18nStore
    const { title, subtitle } = articleDetailStore
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
              <div>
                TODO: detail
              </div>
            </Card>
          </div>
        </div>
      </Page>
    )
  }
}
