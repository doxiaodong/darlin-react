import {
  action,
  observable,
  computed
} from 'mobx'
import { replaceMethod } from 'base/utils'

export interface IItem {
  type: string
  title: string
  body?: string
  bodyOutputType?: string
}

type ItemOrText = IItem | string

function makeItem(item: ItemOrText, type: string): IItem {
  if (typeof item === 'string') {
    return {
      type,
      title: item
    }
  }
  return { ...item, type }
}

export class Toaster {

  @observable queue: IItem[] = []

  @computed get current(): IItem {
    const all = this.queue
    return all[all.length - 1]
  }

  @action
  add(item: IItem): Promise<void> {
    this.queue.push(item)
    return Promise.resolve(null)
  }

  @action
  remove(item: IItem): Promise<void> {
    const index = this.queue.indexOf(item)
    if (index >= 0) {
      this.queue.splice(index, 1)
    }
    return Promise.resolve(null)
  }

  info(item: ItemOrText) {
    return this.add(makeItem(item, 'info'))
  }

  success(item: ItemOrText) {
    return this.add(makeItem(item, 'success'))
  }

  warning(item: ItemOrText) {
    return this.add(makeItem(item, 'warning'))
  }

  error(item: ItemOrText) {
    return this.add(makeItem(item, 'error'))
  }

  wait(item: ItemOrText) {
    return this.add(makeItem(item, 'wait'))
  }

  getLevels(levels?: { [key: string]: string }): { [key: string]: string } {
    return {
      resolve: 'success',
      reject: 'error',
      ...levels
    }
  }

  exception(exception: any, failureText?: string, levels?: { [key: string]: string }) {
    levels = this.getLevels(levels)

    const message = failureText || exception // TODO: do with exception
    console.warn('[EXCEPTION]', `${message}:`, exception)
    this[levels['reject']](message)
  }

  promise<T>(
    promise: Promise<T>,
    successText?: string,
    failureText?: string,
    levels?: { [key: string]: string }
  ): Promise<T> {
    levels = this.getLevels(levels)
    promise.then(
      () => successText && this[levels['resolve']](successText),
      (exception) => this.exception(exception, failureText, levels)
    )
    return promise
  }

  handle(successText?: string, failureText?: string, levels?: { [key: string]: string }) {
    levels = this.getLevels(levels)

    const me = this

    return replaceMethod((origin) => function(...args) {
      const promise = origin.apply(this, args)
      return me.promise(promise, successText, failureText, levels)
    })
  }

  handleInfo(successText?: string, failureText?: string) {
    return this.handle(successText, failureText, { resolve: 'info' })
  }
}

export default new Toaster()
