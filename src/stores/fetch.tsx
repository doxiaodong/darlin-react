import {
  FetchClient,
  Interceptor
} from 'intercept-fetch'

const fetchClient = new FetchClient()
const interceptor = new Interceptor({
  cors: {
    id: 0,
    request: (req) => {
      console.log(req)
      return req
    }
  }
})

fetchClient.setInterceptors(interceptor)

export default fetchClient
