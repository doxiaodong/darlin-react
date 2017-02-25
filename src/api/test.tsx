import fetchClient from '../stores/fetch'

export function testApi() {
  return fetchClient.get('/api/article/categories/?format=json', { date: Date.now() })
}
