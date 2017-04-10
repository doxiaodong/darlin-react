import * as React from 'react'
import { observer } from 'mobx-react'
import { Visibility } from './Visibility'
import i18nStore from 'stores/i18n'

@observer
export class Title extends React.Component<{ title: string }, void> {

  updateTitle(props) {
    const nextTitle = (props.title || '') + i18nStore.t('common:titleSuffix')
    if (nextTitle !== document.title) {
      document.title = nextTitle
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateTitle(nextProps)
  }

  componentDidMount() {
    this.updateTitle(this.props)
  }

  render() {
    const { t } = i18nStore
    return <Visibility visibilityTitle={t('common:visibilityTitle')} />
  }
}
