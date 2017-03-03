import {
  observable,
  action
} from 'mobx'
import * as i18n from 'i18next'
import Fetch from 'i18next-fetch-backend'
import { LocalStorage } from 'base/local-storage'

export class I18nStore {
  @observable t: i18n.TranslationFunction = i18n.t
  @observable lang: string

  constructor() {
    this.lang = LocalStorage.get('react-lang') || 'en'
  }

  changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang, action('after changeLanguage', (err, t) => {
      this.t = t
      this.lang = lang
      LocalStorage.save('react-lang', lang)
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
        fallbackLng: this.lang,
        preload: [this.lang],
        ns: ['common'],
        defaultNS: 'common',
        // debug: true,
        backend: {
          loadPath: '/assets/i18n/{{lng}}/{{ns}}.json'
        }
      }, action('after i18n init', (err, t) => {
        this.t = t
      }))
  }
}

export default new I18nStore()
