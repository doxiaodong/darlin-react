import { AppContainer } from 'react-hot-loader'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as React from 'react'
import { render } from 'react-dom'
import { useStrict } from 'mobx'
import App from 'views/App'
import i18nStore from 'stores/i18n'
import { jsonp } from 'base/fetch'
import { sendMessage } from 'base/send-message'

i18nStore.init()
useStrict(true)
injectTapEventPlugin()

const hotRender = (Component) =>
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  )

hotRender(App)
if (module['hot']) {
  module['hot'].accept('views/App', () => hotRender(App))
}

jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg', 'jsonpCallback')
  .then((data) => {
    sendMessage(data)
  })
