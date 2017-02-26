import {
  observable,
  action
} from 'mobx'
import { getCategories } from 'app/api/article'
import { LocalStorage } from 'app/base/local-storage'

export class CategoryStore {
  @observable categories: any[] = []

  @action getArticleCategories() {

    const categories = JSON.parse(LocalStorage.getSession('article.categories'))
    if (categories) {
      this.categories = categories
      return
    }

    this.categories = []
    return getCategories()
      .then((data) => {
        this.categories.push({
          key: 'all',
          name: '全部'
        })
        this.categories = this.categories.concat(
          data.results.map((c) => ({
            key: c.url,
            name: c.name
          }))
        )

        LocalStorage.saveSession('article.categories', JSON.stringify(this.categories))
      })
  }

}

const categoryStore = new CategoryStore()

export default categoryStore
