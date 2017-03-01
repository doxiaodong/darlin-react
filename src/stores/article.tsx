import {
  observable,
  action,
  runInAction
} from 'mobx'
import * as base64 from 'js-base64'
import { getList } from 'api/article'
export class ArticleStore {
  @observable articles: any[] = []
  totalArticles: any[] = []
  @observable hasMore: boolean = false
  page: number = 1
  category: string

  getMoreArticles = async () => {
    const data = await getList(this.category, this.page)
    return runInAction('update data aftergetMoreArticles', () => {
      if (data.next) {
        this.page++
        this.hasMore = true
      } else {
        this.hasMore = false
      }

      const articles = data.results.map((a) =>
        ({
          url: base64.Base64.encodeURI(a.url),
          title: a.title,
          createTime: a.create_time,
          category: a.category.url,
          isUp: a.is_up,
          isHot: a.hot
        })
      )
      this.totalArticles = this.totalArticles.concat(articles)
      // TODO: add article search
      this.articles = this.totalArticles.filter(() => true)
    })
  }

  @action resetArticles(category: string) {
    this.hasMore = false
    this.category = category

    this.totalArticles = []
    this.articles = []
    this.page = 1
  }

  getArticleList(category: string) {
    this.resetArticles(category)

    return this.getMoreArticles()
  }
}

const articleStore = new ArticleStore()

export default articleStore
