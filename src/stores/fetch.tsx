import {
  FetchClient,
  Interceptor
} from 'intercept-fetch'

const fetchClient = new FetchClient()
const interceptor = new Interceptor({
  cors: {
    id: 0,
    request(url, config) {
      // url += '&a=1'
      config.mode = 'cors'
      return Promise.resolve([url, config])
    },
    success(data) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('success a', data)
          data.a = 'intercept a'
          resolve(data)
        }, 1000)
      })
    }
  },
  cred: {
    id: 1,
    request(url, config) {
      // url += '&b=2'
      config.credentials = 'include'
      return Promise.resolve([url, config])
    },
    success(data) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('success b', data)
          data.b = 'intercept b'
          resolve(data)
        }, 1000)
      })
    }
  }
})

fetchClient.setInterceptors(interceptor)

export default fetchClient
