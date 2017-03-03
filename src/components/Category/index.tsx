import * as React from 'react'
import {
  withRouter,
  InjectedRouter
} from 'react-router'
import {
  List,
  ListItem,
  makeSelectable
} from 'material-ui/List'
import { Subheader } from 'components/Subheader'
import { observer } from 'mobx-react'
import categoryStore from 'stores/category'
import i18nStore from 'stores/i18n'

import * as style from './style.scss'

const SelectableList = makeSelectable(List)

@observer
export class CompCategory extends React.Component<{
  params?: any,
  router?: InjectedRouter
}, {}> {

  handleRequestChange = (event, key) => {
    categoryStore.setKey(key)
    this.props.router.push({
      pathname: `/article/${key}`
    })
  }

  componentDidMount() {
    categoryStore.getArticleCategories()
    categoryStore.setKey(this.props.params.category)
  }

  render() {
    const { t } = i18nStore
    const listItem = categoryStore.categories.map((category) => {
      return (
        <ListItem key={category.key} value={category.key}>
          <div className={category.key === categoryStore.selectedCategoryKey ? style.active : ''}>
            {category.name}
          </div>
        </ListItem>
      )
    })
    return (
      <div className={style.container}>
        <div className={style.right + ' each-block'}>
          <Subheader title={t('article:category')} />
          <SelectableList
            style={{ paddingTop: 0 }}
            value={categoryStore.selectedCategoryKey}
            onChange={this.handleRequestChange}
          >
            {listItem}
          </SelectableList>
        </div>
        <div className={style.left} />
      </div>
    )
  }
}

export const CompCategoryWithRouter = withRouter(CompCategory)
