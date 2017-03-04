import { getCookie } from './get-cookie'
// import { MD5 } from 'crypto-js'
import MD5 = require('crypto-js/md5')

export function getAESToken() {
  return MD5(getCookie('csrftoken')).toString()
}
