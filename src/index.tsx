import { AppContainer } from 'react-hot-loader'
import * as injectTapEventPlugin from 'react-tap-event-plugin'
import * as React from 'react'
import { render } from 'react-dom'
import { useStrict } from 'mobx'
import App from 'views/App'
import i18nStore from 'stores/i18n'

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
  module['hot'].accept('views/App', () => {
    const { default: NewApp } = require('./views/App')
    hotRender(NewApp)
  })
}
