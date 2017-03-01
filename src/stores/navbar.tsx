import {
  observable,
  action,
  computed
} from 'mobx'

export class NavbarStore {

  @observable location

  @action setLocation(value) {
    this.location = value
  }
  @computed get current(): number {
    if (!this.location) {
      return 0
    }
    const path = this.location.pathname
    if (path === '/') {
      return 0
    }
    if (/^\/article\//.test(path)) {
      return 1
    }
    if (/^\/account\//.test(path)) {
      return 2
    }
    if (/^\/self\//.test(path)) {
      return 3
    }

    return -1
  }

}

export default new NavbarStore()
