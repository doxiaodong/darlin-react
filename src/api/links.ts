import { fetchClient } from 'base/fetch'

export function getLinks() {
  return fetchClient.get('/links/?format=json')
}
