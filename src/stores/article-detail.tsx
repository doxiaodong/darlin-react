import {
  observable,
  // action,
  runInAction
} from 'mobx'
import * as base64 from 'js-base64'
import { transformDate } from 'base/transform/date'
import { getDetail } from 'api/article'

export class ArticleDetailStore {

  @observable title = ''

  @observable subtitle = ''

  @observable content = ''

  async getArticleDetail(url: string) {
    const data = await getDetail(base64.Base64.decode(url))
    return runInAction('get article detail', () => {
      this.title = data.title
      this.subtitle = `• ${transformDate(data.create_time)} • ${data.category.name}`
      this.content = data.content
    })
  }

}

export default new ArticleDetailStore()
