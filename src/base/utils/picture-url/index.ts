import { MD5 } from 'crypto-js'
import {
  HEAD_PIC_STYLE,
  THIRD_PIC_REG,
  PIC_STATIC_URL_HOST
} from 'base/constants'

const reg = new RegExp(THIRD_PIC_REG)

export function getPictureURL(pic: string, email?: string): string {
  if (pic === 'none') {
    return `https://s.gravatar.com/avatar/${MD5(email).toString()}?s=100`
  }
  if (!reg.test(pic)) {
    return PIC_STATIC_URL_HOST + pic + HEAD_PIC_STYLE
  }
  // change http to https
  return pic.replace(reg, 'https://')
}
