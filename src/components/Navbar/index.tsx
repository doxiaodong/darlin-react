import * as React from 'react'
import { Link } from 'react-router'
import { observer } from 'mobx-react'
import i18nStore from 'stores/i18n'

@observer
export class CompNavbar extends React.Component<{}, {}> {

  changeToZH = () => {
    i18nStore.changeLanguage('zh')
  }

  changeToEN = () => {
    i18nStore.changeLanguage('en')
  }

  render() {
    const { t } = i18nStore
    return (
      <div>
        <Link to='/'>{t('common:home')}</Link>
        <Link to='/article/all'>{t('common:articles')}</Link>
        <button onClick={this.changeToZH}>切换中文</button>
        <button onClick={this.changeToEN}>切换英文</button>
      </div>
    )
  }
}
