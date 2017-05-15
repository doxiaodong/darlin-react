import {
  observable,
  action
} from 'mobx'

export class Snack {
  @observable isOpen = false

  @observable message = ''

  @action.bound
  open(message?: string) {
    if (message != null) {
      this.message = message
    }
    this.isOpen = true
  }

  @action.bound
  close() {
    this.isOpen = false
  }
}

export default new Snack()
