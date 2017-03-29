import {
  observable,
  computed,
  action
} from 'mobx'

export interface IUser {
  nickname: string
  username: string
  email: string
  id: number
  pic: string
  lastLogin: string
  sex: number // 0, male; 1, female
  third: string
}


export class UserStore {

  private requestingUser

  @observable userInfo: IUser

  @computed get isSingin(): boolean {
    const u = this.userInfo
    return u && u.id !== -1
  }

  get(): Promise<IUser> {
    if (this.isSingin) {
      return Promise.resolve(this.userInfo)
    }

    if (this.requestingUser) {
      return this.requestingUser
    }

    this.requestingUser = Promise.resolve(this.userInfo)
    return this.requestingUser
  }

}

export default new UserStore()
