import {
  observable,
  action,
  computed,
  runInAction
} from 'mobx'
import { getCategories } from 'api/article'
import { LocalStorage } from 'base/local-storage'
import { Loadings } from 'stores/loadings'

const loadings = new Loadings()

export class CategoryStore {

  @observable selectedCategoryKey: string
  @observable categories: any[] = []

  @action setKey = (key) => {
    this.selectedCategoryKey = key
  }

  @computed get loadings() {
    return loadings.state
  }

  @loadings.handle('category')
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
    return runInAction('getCategories', () => {
      return this.categories = categories
    })
  }

}

export default new CategoryStore()
