import {
  observable,
  action
} from 'mobx'
import * as i18n from 'i18next'
import Fetch from 'i18next-fetch-backend'

export class I18nStore {
  @observable t: i18n.TranslationFunction = i18n.t
  @observable lang: string

  changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang, action('after changeLanguage', (err, t) => {
      this.t = t
      this.lang = lang
    }))
  }

  loadNamespaces(namespace: string[]) {
    i18n.loadNamespaces(namespace, action('after loadNamespaces', () => {
      this.t = i18n.t
    }))
  }

  /**
   * Decorator to loadNamespaces when componentDidMount
   * @param {string[]} name : namespace
   */
  namespace(name: string[]) {
    return (target) => {
      const componentDidMount = target.prototype.componentDidMount
      target.prototype.componentDidMount = (...args) => {
        this.loadNamespaces(name)
        return componentDidMount.apply(target, args)
      }
    }
  }

  init() {
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
      }, action('after i18n init', (err, t) => {
        this.t = t
        this.lang = 'en'
      }))
  }
}

export default new I18nStore()
