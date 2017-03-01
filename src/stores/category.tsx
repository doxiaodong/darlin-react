import {
  observable,
  action,
  runInAction
} from 'mobx'
import { getCategories } from 'api/article'
import { LocalStorage } from 'base/local-storage'

export class CategoryStore {

  @observable selectedCategoryKey: string
  @observable categories: any[] = []

  @action setKey = (key) => {
    this.selectedCategoryKey = key
  }

  async getArticleCategories() {
    async function getCategoriesAsync() {
      let categories: any[] = JSON.parse(LocalStorage.getSession('article.categories'))
      if (categories) {
        return categories
      }
      categories = []
      const data = await getCategories()
      categories.push({
        key: 'all',
        name: '全部'
      })
      categories = categories.concat(
        data.results.map((c) => ({
          key: c.url,
          name: c.name
        }))
      )
      LocalStorage.saveSession('article.categories', JSON.stringify(categories))
      return categories
    }

    const categories = await getCategoriesAsync()
    runInAction('getCategories', () => {
      return this.categories = categories
    })
  }

}

const categoryStore = new CategoryStore()

export default categoryStore
