import {
  observable,
  computed,
  action,
  runInAction
} from 'mobx'
import { MD5, SHA512 } from 'crypto-js'
import { getLinks } from 'api/links'
import { Loadings } from 'stores/loadings'

const loadings = new Loadings()

export class SelfStore {
  @observable output = ''
  @computed get output15() {
    return this.output.slice(0, 14)
  }

  @computed get loadings() {
    return loadings.state
  }

  @observable copyOpenState = false

  @observable links = []

  @action.bound resetGenPassword() {
    this.output = ''
  }

  @action genPassword(password, key) {
    const pString = SHA512(password).toString()
    const kString = SHA512(key).toString()
    const shaString = SHA512(pString + kString).toString()
    this.output = MD5(shaString).toString()
  }

  @action.bound copy(success) {
    if (success) {
      this.copyOpenState = true
    }
  }

  @action.bound autoCloseCopyState() {
    this.copyOpenState = false
  }

  @action.bound
  @loadings.handle('links')
  async getLinks() {
    this.links = []
    const data = await getLinks()
    runInAction('get links', () => {
      this.links = data.results
    })
  }

}

export default new SelfStore()
