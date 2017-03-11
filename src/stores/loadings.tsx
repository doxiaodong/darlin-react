import {
  observable,
  extendObservable,
  action
} from 'mobx'
import { replaceMethod } from 'base/utils'

export type Loading = boolean

export interface ILoadingsState {
  [name: string]: Loading
}

export class Loadings {

  @observable names: string[] = []
  @observable state: ILoadingsState = {}

  constructor(...names: string[]) {
    names.forEach(
      (name) => this.add(name)
    )
  }

  @action add(name: string): void {
    this.names.push(name)
    extendObservable(this.state, {
      [name]: false
    })
  }

  tryAdd(name: string): void {
    if (!this.state.hasOwnProperty(name)) {
      this.add(name)
    }
  }

  @action start(name: string): void {
    this.tryAdd(name)
    this.state[name] = true
  }

  @action stop(name: string): void {
    this.tryAdd(name)
    this.state[name] = false
  }

  finished(name: string): boolean {
    return !this.state[name]
  }

  allFinished(): boolean {
    return this.names.reduce(
      (finished, name) => finished && this.finished(name),
      true
    )
  }

  promise(name: string, promise: Promise<any>) {
    this.start(name)
    const stopLoading = () => this.stop(name)
    promise.then(stopLoading, stopLoading)
    return promise
  }

  handle(name: string) {
    const loadings = this
    return replaceMethod((origin) => function(...args) {
      const promise = origin.apply(this, args)
      return loadings.promise(name, promise)
    })
  }
}

export default new Loadings()
