import * as React from 'react'
import { observer } from 'mobx-react'
import {
  withRouter,
  InjectedRouter
} from 'react-router'
import * as base64 from 'js-base64'
import IconButton from 'material-ui/IconButton'
import ContentReply from 'material-ui/svg-icons/content/reply'
import { Marked } from 'components/Marked'
import { transformDate } from 'base/transform/date'
import { iconStyle } from 'styles/react/icon'
import i18nStore from 'stores/i18n'
import store from './store'

import * as style from './style.scss'

@observer
export class CommentList extends React.Component<{ params?: InjectedRouter }, {}> {

  componentDidMount() {
    store.getComments(base64.Base64.decode(this.props.params['url']))
  }

  render() {
    const { t } = i18nStore

    const listItem = store.comments.map((comment) => {
      return (
        <li key={comment.url} className={style.reply}>
          <img src={comment.replyUser.pic} alt='' className={`${style.left} ${style.pic}`} />
          <div className={style.right}>
            <div className={style.word}>
              <a>{comment.replyUser.nickname}</a>
              <Marked md={comment.content} safe />
            </div>
            <div className={style.message}>
              <span>{transformDate(comment.time)}</span>
              <span>
                <IconButton tooltip={t('article:reply')} iconStyle={iconStyle.smallIcon} style={iconStyle.small}>
                  <ContentReply />
                </IconButton>
              </span>
              <span>{comment.index}{t('article:floor')}</span>
            </div>
          </div>
          <ul className={style.subreply}>
            {renderSubReplies(comment.replies)}
          </ul>
        </li>
      )
    })

    return <ul>
      {listItem}
    </ul>
  }
}

function renderSubReplies(replies) {
  const { t } = i18nStore
  return replies.map((subReply) => {
    return (
      <li key={subReply.__id__} className={style.reply}>
        <img src={subReply.replyUser.pic} alt='' className={`${style.left} ${style.pic}`} />
        <div className={style.right}>
          <div className={style.word}>
            <div>
              <a>{subReply.replyUser.nickname}</a>
              <span>&nbsp;{t('article:reply')}&nbsp;</span>
              <a>{subReply.replyObject.nickname}</a>
            </div>
            <Marked md={subReply.content} safe />
          </div>
          <div className={style.message}>
            <span>{transformDate(subReply.time)}</span>
            <span>
              <IconButton tooltip={t('article:reply')} iconStyle={iconStyle.smallIcon} style={iconStyle.small}>
                <ContentReply />
              </IconButton>
            </span>
          </div>
        </div>
      </li>
    )
  })
}

export const CommentListWithRouter = withRouter(CommentList)
