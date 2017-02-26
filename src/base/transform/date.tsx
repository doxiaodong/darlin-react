import * as moment from 'moment'

export function transformDate(date) {
  if (moment.locale() !== 'zh-cn') {
    moment.locale('zh-cn')
  }
  return moment(date).fromNow()
}
