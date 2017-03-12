import * as React from 'react'
import {
  Link,
  withRouter,
  InjectedRouter
} from 'react-router'
import { observer } from 'mobx-react'
import i18nStore from 'stores/i18n'
import store from './store'

import * as style from './style.scss'

@observer
export class Navbar extends React.Component<{ router?: InjectedRouter }, {}> {

  componentDidMount() {
    store.setLocation(this.props.router['location'])
  }

  componentWillReceiveProps(nextProps) {
    store.setLocation(this.props.router['location'])
  }

  render() {
    const { t } = i18nStore
    return (
      <header className={style.header}>
        <nav className={style.nav}>
          <Slide isLoggedIn={false} />
          <div className={style.container}>
            <div className={style.current} tabIndex={store.current} />
            <ul className={style.list}>
              <li>
                <Link to='/' className={style.link}>{t('common:home')}</Link>
              </li>
              <li>
                <Link to='/article/all' className={style.link}>{t('common:articles')}</Link>
              </li>
              {/*TODO*/}
              <li>
                <Link to='/' className={style.link}>{t('common:account')}</Link>
              </li>
              <li>
                <Link to='/self/links' className={style.link}>{t('common:self')}</Link>
              </li>
              {/*TODO*/}
            </ul>
          </div>
        </nav>
      </header>
    )
  }
}

export const NavbarWithRouter = withRouter(Navbar)

function Slide(props) {
  const { isLoggedIn } = props
  const { t } = i18nStore
  if (isLoggedIn) {
    return (
      <div className={style.side}>
        <span>毒枭东</span>
        <span className={`${style.logout} a`}>{t('common:logout')}</span>
      </div>
    )
  }
  return (
    <a className={style.side}>{t('common:login')}</a>
  )
}
