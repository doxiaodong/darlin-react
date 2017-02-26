import {
  observable,
  action
} from 'mobx'
import * as base64 from 'js-base64'
import { getList } from 'app/api/article'
export class ArticleStore {
  @observable articles: any[] = []

  @action getArticleList(category: string) {
    return getList(category).then((data) => {
      this.articles = []
      return data.results.map((a) =>
        ({
          url: base64.Base64.encodeURI(a.url),
          title: a.title,
          createTime: a.create_time,
          category: a.category.url,
          isUp: a.is_up,
          isHot: a.hot
        })
      )
    })
      .then((articles) => {
        this.articles = articles
      })
  }
}

const articleStore = new ArticleStore()

export default articleStore
