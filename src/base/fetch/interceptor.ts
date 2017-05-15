import { Interceptor } from 'intercept-fetch'
import {
  getCookie,
  getAESToken
} from 'base/utils'
import snackStore from 'stores/snack'
import i18nStore from 'stores/i18n'

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

export const errorInterceptor = new Interceptor({
  error: {
    id: 2,
    async error(res) {
      let errorCode
      try {
        const body = await res.clone().json()
        errorCode = body && body.code
      } catch (error) {
        errorCode = res.status
      }

      let str = i18nStore.t(`common:error.${errorCode + ''}`)
      if (str === `error.${errorCode + ''}`) {
        str = i18nStore.t(`common:error.unknow`)
      }
      snackStore.open(`[${errorCode}] ${str}`)

      return res
    }
  }
})

// merge
const interceptors = corsInterceptor.merge(tokenInterceptor).merge(errorInterceptor)

export default interceptors
