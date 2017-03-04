import { Common } from './common'
import { ViewHome } from './Home'

export const rootRoute = {
  childRoutes: [{
    path: '',
    component: Common,
    childRoutes: [
      {
        path: '/',
        component: ViewHome
      },
      {
        path: '/article/:category',

        getComponent(nextState, cb) {
          require.ensure([], (require) => {
            cb(null, require('views/Article/List').ViewArticleList)
          })
        }
      }
    ]
  }]
}
