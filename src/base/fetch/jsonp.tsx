import * as fetchJsonp from 'fetch-jsonp'

export async function jsonp(url: string, jsonpCallback = 'callback') {
  const res = await fetchJsonp(url, { jsonpCallback })
  if (res.ok) {
    const body = await res.json()
    if (body.code === 0) {
      return body
    }
  }
  console.error('jsonp error')
}
