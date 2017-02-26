import { FetchClient } from 'intercept-fetch'
import interceptors from './interceptor'

export const fetchClient = new FetchClient()

fetchClient.setInterceptors(interceptors)
