import {
  fetchClient,
  apiPrefix
} from 'base/fetch'

export function getLinks() {
  return fetchClient.get(`${apiPrefix}/links/?format=json`)
}
