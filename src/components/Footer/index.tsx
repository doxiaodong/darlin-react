import * as React from 'react'
import { observer } from 'mobx-react'
import footerStore from 'stores/footer'
import i18nStore from 'stores/i18n'

import * as style from './style.scss'

@observer
export class Footer extends React.Component<{}, {}> {

  componentDidMount() {
    document.addEventListener('click', footerStore.close)
  }

  componentWillUnmount() {
    document.removeEventListener('click', footerStore.close)
  }

  stopPropagation = (event) => {
    event.nativeEvent.stopImmediatePropagation()
  }

  render() {
    const { t } = i18nStore
    const listItem = footerStore.langs.map((lang) => {
      return (
        <li
          key={lang.key}
          className={`${style.li} a` + (footerStore.selectedKey === lang.key ? ` ${style.active}` : '')}
          onClick={() => { footerStore.changeLanguage(lang.key) }}
        >
          {lang.word}
        </li>
      )
    })
    const list = <ul className={style.ul}>{listItem}</ul>
    return (
      <footer className={style.footer}>
        <div className={style.content}>
          <a href='http://www.miitbeian.gov.cn/' target='_blank'>蜀ICP备15013600号-1</a> @<a>react.darlin.me</a>
          <div className={style.i18n} onClick={this.stopPropagation}>
            <p className='a' onClick={footerStore.toggleShow}>{t('common:langSetting')}</p>
            {footerStore.showLang && list}
          </div>
        </div>
      </footer>
    )
  }
}
