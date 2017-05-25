import { fetchClient } from 'base/fetch'

export function getCategories() {
  return fetchClient.get('/article/categories/?format=json')
}

export function getList(category: string, page: number = 1) {
  return fetchClient.get(`/article/articles/${category}/?format=json&page=${page}`)
}

export function getDetail(url: string) {
  return fetchClient.get(`/article/${url}/?format=json`)
}
