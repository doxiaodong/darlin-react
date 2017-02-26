import { Interceptor } from 'intercept-fetch'
import {
  getCookie,
  getAESToken
} from 'app/base/utils'

export const corsInterceptor = new Interceptor({
  cors: {
    id: 0,
    request(url, config) {
      config.mode = 'cors'
      config.credentials = 'include'
      config.cache = 'default'
      return Promise.resolve([url, config])
    }
  }
})

export const tokenInterceptor = new Interceptor({
  token: {
    id: 1,
    request(url, config) {
      const headers = config.headers || new Headers()

      headers.set('X-CSRFToken', getCookie('csrftoken'))
      headers.set('X-AESToken', getAESToken())

      config.headers = headers

      return Promise.resolve([url, config])
    }
  }
})

// merge
const interceptors = corsInterceptor.merge(tokenInterceptor)

export default interceptors
