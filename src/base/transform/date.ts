import * as moment from 'moment'
import i18nStore from 'stores/i18n'

export function transformDate(date) {

  const lang = i18nStore.lang
  const momentLang = moment.locale()

  if (lang === 'zh' && momentLang !== 'zh-cn') {
    moment.locale('zh-cn')
  } else if (momentLang !== lang) {
    moment.locale(lang)
  }
  return moment(date).fromNow()
}
