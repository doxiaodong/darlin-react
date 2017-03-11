import * as React from 'react'
import { observer } from 'mobx-react'
import {
  Card,
  CardHeader,
  CardText
} from 'material-ui/Card'
import { headerStyle } from 'styles/react/card/header'
import i18nStore from 'stores/i18n'
import { CommentListWithRouter } from './List'
import store from './store'

import * as style from './style.scss'

@observer
export class Comment extends React.Component<{}, {}> {

  render() {
    const { t } = i18nStore
    return (
      <Card className='each-block'>
        <CardHeader
          style={headerStyle}
        >
          <div style={{ float: 'left' }}>
            <span className={style.active}>{store.articleReplies}&nbsp;</span>{t('article:replies')}
          </div>
        </CardHeader>
        <CardText>
          <CommentListWithRouter />

        </CardText>
      </Card>
    )
  }
}
