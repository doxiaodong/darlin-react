import {
  observable,
  computed,
  action,
  runInAction
} from 'mobx'
import * as base64 from 'js-base64'
import { transformDate } from 'base/transform/date'
import { getDetail } from 'api/article'
import { Loadings } from 'stores/loadings'

const loadings = new Loadings()

export class ArticleDetailStore {

  @observable title = ''

  @observable subtitle = ''

  @observable content = ''

  @computed get loadings() {
    return loadings.state
  }

  @loadings.handle('articleDetail')
  async getArticleDetail(url: string) {
    const data = await getDetail(base64.Base64.decode(url))
    return runInAction('get article detail', () => {
      this.title = data.title
      this.subtitle = `• ${transformDate(data.create_time)} • ${data.category.name}`
      this.content = data.content
    })
  }

  @action clear() {
    this.title = ''
    this.subtitle = ''
    this.content = ''
  }

}

export default new ArticleDetailStore()
