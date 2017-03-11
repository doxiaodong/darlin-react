import {
  observable,
  action,
  runInAction
} from 'mobx'
import { v4 as uuid } from 'uuid'
import {
  getCommentList,
  getHeadSubComments
} from 'api/comment'
import { getPictureURL } from 'base/utils'

export class CommentStore {

  @observable articleReplies: number = 0
  @observable comments = []

  async getSubComments(head: string): Promise<any[]> {
    const data = await getHeadSubComments(head)
    return data.results.map((r) => {
      return {
        __id__: uuid(),
        replyUser: {
          pic: getPictureURL(r.reply_user.pic, r.reply_user.email),
          username: r.reply_user.username,
          nickname: r.reply_user.nickname
        },
        replyObject: {
          pic: getPictureURL(r.reply_object.pic, r.reply_object.email),
          username: r.reply_object.username,
          nickname: r.reply_object.nickname
        },
        content: r.content,
        time: r.reply_time
      }
    })
  }

  @action async getComments(url) {
    this.articleReplies = 0
    const data = await getCommentList(url)
    runInAction('getCommentList', async () => {
      this.comments = []
      const getAllHeadSubComments = Promise.all(
        data.results.map(async (c) => {
          const comment = {
            replyUser: {
              pic: getPictureURL(c.reply_user.pic, c.reply_user.email),
              username: c.reply_user.username,
              nickname: c.reply_user.nickname
            },
            replies: [],
            content: c.content,
            time: c.reply_time,
            index: c.index,
            url: c.url
          }

          const replies = await this.getSubComments(c.url)
          comment.replies = replies
          runInAction('count articleReplies', () => {
            this.articleReplies += replies.length
          })
          return comment
        })
      )

      const comments = await getAllHeadSubComments
      runInAction('getAllHeadSubComments', () => {
        this.articleReplies += comments.length
        this.comments = comments
      })
    })
  }

}

export default new CommentStore()
