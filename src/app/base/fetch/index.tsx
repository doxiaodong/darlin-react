export * from './fetch'

export function paramPostBody(obj): string {
  const str: string[] = []
  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return str.join('&')
}

export const apiPrefix = '/api'
