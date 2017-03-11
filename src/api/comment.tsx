import {
  fetchClient,
  apiPrefix
} from 'base/fetch'
import { paramPostBody } from 'base/utils'

export function getCommentList(article: string) {
  return fetchClient.get(`${apiPrefix}/comment/comments/${article}/?format=json`)
}

export function getHeadSubComments(head: string) {
  return fetchClient.get(`${apiPrefix}/comment/subcomments/${head}/?format=json`)
}

export function getUserSubComments(user: string) {
  return fetchClient.get(`${apiPrefix}/comment/subcomments/${user}/?format=json`)
}

export function getAllComments() {
  return fetchClient.get(`${apiPrefix}/comments/?format=json`)
}

export function addReply(article: string, obj) {
  return fetchClient.post(`${apiPrefix}/comments/add/${article}/`, {
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: paramPostBody(obj)
  })
}

export function addSubReply(comment: string, obj) {
  return fetchClient.post(`${apiPrefix}/comments/add-sub/${comment}/`, {
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: paramPostBody(obj)
  })
}
