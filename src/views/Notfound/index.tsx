import * as React from 'react'
import { observer } from 'mobx-react'
import {
  RouteComponentProps,
  Link
} from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { Page } from 'components/Page'
import i18nStore from 'stores/i18n'

import * as bg404 from './bg-404.jpg'
import * as style from './style.scss'

@observer
export class ViewNotfound extends React.Component<RouteComponentProps<{}>, {}> {
  render() {
    const { t } = i18nStore
    return (
      <Page title={t('common:404')}>
        <div className={style.p404}>
          <img src={bg404} alt="" className={`${style.bg} ${style.width}`} />
          <div className={style.main}>
            <p className={style.title}>404</p>
            <p>三十年前找网站，今天找着了；</p>
            <p>今天找着的页面，不是我的哟。</p>
            <p>可惜了，可惜了，不是我的哟；</p>
            <p>可惜了，可惜了，不是我的哟。</p>
            <Link to="/">
              <RaisedButton className={style.back} primary={true} label={t('common:home')} />
            </Link>
          </div>
        </div>
      </Page>
    )
  }
}
