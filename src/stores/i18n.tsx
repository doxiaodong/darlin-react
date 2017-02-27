import {
  observable,
  action
} from 'mobx'
import * as i18n from 'i18next'
import Fetch from 'i18next-fetch-backend'

export class I18nStore {
  @observable t: i18n.TranslationFunction = i18n.t
  @observable lang: string

  @action changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang, (err, t) => {
      this.t = t
      this.lang = lang
    })
  }

  @action loadNamespaces(namespace: string[]) {
    i18n.loadNamespaces(namespace, () => {
      this.t = i18n.t
    })
  }

  @action init() {
    i18n.use(Fetch)
      .init({
        fallbackLng: 'en',
        preload: ['en'],
        ns: ['common'],
        defaultNS: 'common',
        // debug: true,
        backend: {
          loadPath: '/assets/i18n/{{lng}}/{{ns}}.json'
        }
      }, (err, t) => {
        this.t = t
        this.lang = 'en'
      })
  }
}

export default new I18nStore()
