import {
  observable,
  computed,
  action
} from 'mobx'
import { MD5, SHA512 } from 'crypto-js'

export class SelfStore {
  @observable output = ''
  @computed get output15() {
    return this.output.slice(0, 14)
  }

  @observable copyOpenState = false

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

}

export default new SelfStore()
