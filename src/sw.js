const staticCacheName = 'static'
const version = 'v5::'
const cacheKeys = [
  /static\.darlin\.me/,
  /cdn\.tristana\.cc/,
  /cdn\.bootcss\.com/,
  /cdn\.mathjax\.org/,
  /cdn\.jsdelivr\.net/
]

let timeoutJsonpIds = []

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(keys) {
        return Promise.all(keys
          .filter(function(key) {
            return key.indexOf(version) !== 0
          })
          .map(function(key) {
            return caches.delete(key)
          })
        )
      })
  )
})

self.addEventListener('fetch', function(event) {
  const request = event.request
  const url = request.url
  const isCache = cacheKeys.some(k => k.test(url))
  if (isCache) {
    event.respondWith(
      caches.match(request).then((response) => {
        if (response) {
          return response
        }
        return fetch(request.clone()).then((fetchResponse) => {

          const responseClone = fetchResponse.clone()
          caches.open(version + staticCacheName)
            .then(cache => {
              cache.put(request, responseClone)
            })

          return fetchResponse
        })
      })
    )
    return
  }

  event.respondWith(
    fetch(request.clone()).then((fetchResponse) => {
      if (timeoutJsonpIds.some((id) => url.indexOf(id) !== -1)) {
        timeoutJsonpIds = timeoutJsonpIds.filter((id) => url.indexOf(id) !== -1)
        // return empty response
        return new Response()
      }
      return fetchResponse
    }).catch(() => {
      timeoutJsonpIds = timeoutJsonpIds.filter((id) => url.indexOf(id) !== -1)
    })
  )

})

self.addEventListener('message', (event) => {
  // it better to abort fetch
  // see https://github.com/whatwg/fetch/issues/447
  const data = event.data
  if (data.from === 'fetch-jsonp') {
    timeoutJsonpIds.push(event.data.callbackFunction)
  }
})
