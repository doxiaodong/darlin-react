import {
  observable,
  action
} from 'mobx'
import i18nStore from 'stores/i18n'

export class FooterStore {

  @observable showLang: boolean = false

  @observable selectedKey: string = i18nStore.lang

  @observable langs = [{
    key: 'zh',
    word: '中文'
  }, {
    key: 'en',
    word: 'English'
  }]

  @action.bound
  toggleShow() {
    this.showLang = !this.showLang
  }

  @action.bound
  close() {
    this.showLang = false
  }

  @action changeLanguage(key: string) {
    this.selectedKey = key
    this.showLang = false
    i18nStore.changeLanguage(key)
  }

}

export default new FooterStore()
