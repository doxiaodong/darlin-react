export function paramPostBody(obj): string {
  const str = Object.keys(obj).map((p) => {
    return encodeURIComponent(p) + '=' + encodeURIComponent(obj[p])
  })
  return str.join('&')
}
