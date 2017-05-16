export function loadScriptCallback(m, src, callback, reject) {
  if (window[m]) {
    callback()
    return
  }
  const script = document.createElement('script')
  script.src = src
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(script, s)
  script.addEventListener('load', callback)
  script.addEventListener('error', reject)
}

export function loadScript(m, src) {
  return new Promise((reslove, reject) => {
    loadScriptCallback(m, src, reslove, reject)
  })
    .catch(null)
}
