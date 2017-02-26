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
import Subheader from 'material-ui/Subheader'
import { observer } from 'mobx-react'
import categoryStore from 'stores/category'
import articleStore from 'stores/article'

import * as style from './style.scss'

const SelectableList = makeSelectable(List)

@observer
export class CompCategory extends React.Component<{
  params?: any,
  router?: InjectedRouter
}, {}> {

  handleRequestChange = (event, key) => {
    categoryStore.handleRequestChange(event, key)
    this.props.router.push({
      pathname: `/article/${key}`
    })
    articleStore.getArticleList(key)
  }

  componentDidMount() {
    categoryStore.getArticleCategories()
    categoryStore.selectedCategoryKey = this.props.params.category
  }

  render() {
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
        <div className={style.right}>
          <SelectableList
            value={categoryStore.selectedCategoryKey}
            onChange={this.handleRequestChange}
          >
            <Subheader>分类</Subheader>
            {listItem}
          </SelectableList>
        </div>
        <div className={style.left} />
      </div>
    )
  }
}

export const CompCategoryWithRouter = withRouter(CompCategory)
