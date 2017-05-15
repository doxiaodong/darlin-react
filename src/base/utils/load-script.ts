export function loadScript(m, src, callback) {
  if (window[m]) {
    callback()
    return
  }
  const script = document.createElement('script')
  script.src = src
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(script, s)
  script.addEventListener('load', callback)
}
