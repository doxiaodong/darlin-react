import { getCookie } from './get-cookie'
import { MD5 } from 'crypto-js'

export function getAESToken() {
  return MD5(getCookie('csrftoken')).toString()
}
