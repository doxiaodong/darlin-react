import * as React from 'react'
import {
  observable,
  action
} from 'mobx'
import { observer } from 'mobx-react'
import { LocalStorage } from 'base/local-storage'
import i18nStore from 'stores/i18n'

@observer
export class Visibility extends React.Component<{ visibilityTitle: string }, {}> {

  @observable visibilityTitle: string = ''

  @action.bound
  visibilitychangeEvent() {
    const state = document.visibilityState
    if (state === 'hidden') {
      LocalStorage.saveSession('visibilityChangeTitle', document.title)
      document.title = this.visibilityTitle + i18nStore.t('common:titleSuffix')
    }
    if (state === 'visible') {
      document.title = LocalStorage.getSession('visibilityChangeTitle')
      LocalStorage.removeSession('visibilityChangeTitle')
    }
  }

  componentWillReceiveProps(nextProps) {
    this.visibilityTitle = nextProps.visibilityTitle
  }

  componentDidMount() {
    this.visibilityTitle = this.props.visibilityTitle
    document.addEventListener('visibilitychange', this.visibilitychangeEvent)
  }

  componentWillUnmount() {
    document.removeEventListener('visibilitychange', this.visibilitychangeEvent)
  }

  render() {
    return (
      null
    )
  }
}
