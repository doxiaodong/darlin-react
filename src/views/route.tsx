import { RouteConfig } from 'react-router'
import { Common } from './Common'
import { ViewHome } from './Home'

export const rootRoute: RouteConfig = {
  component: Common,
  childRoutes: [
    {
      path: '/',
      component: ViewHome
    },
    {
      path: '/article/:category',

      getComponent(nextState, cb) {
        require['ensure']([], (require) => {
          cb(null, require('views/Article/List').ViewArticleList)
        })
      }
    },
    {
      path: '/article/:category/:url',

      getComponent(nextState, cb) {
        require['ensure']([], (require) => {
          cb(null, require('views/Article/Detail').ViewArticleDetail)
        })
      }
    },
    {
      path: '/self/links',

      getComponent(nextState, cb) {
        require['ensure']([], (require) => {
          cb(null, require('views/Self').ViewSelf)
        })
      }
    }
  ]
}
