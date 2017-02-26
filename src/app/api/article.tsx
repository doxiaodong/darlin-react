import {
  fetchClient,
  apiPrefix
} from 'app/base/fetch'

export function getCategories() {
  return fetchClient.get(`${apiPrefix}/article/categories/?format=json`)
}

export function getList(category: string, page: number = 1) {
  return fetchClient.get(`${apiPrefix}/article/articles/${category}/?format=json&page=${page}`)
}

export function getDetail(url: string) {
  return fetchClient.get(`${apiPrefix}/article/${url}/?format=json`)
}
