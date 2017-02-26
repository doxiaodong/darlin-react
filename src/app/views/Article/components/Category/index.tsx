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
import { CategoryStore } from './store'
import { ArticleStore } from 'app/stores/article'

import * as style from './style.scss'

const SelectableList = makeSelectable(List)

@observer
export class CompCategory extends React.Component<{
  categoryStore: CategoryStore,
  articleStore: ArticleStore,
  params?: any,
  router?: InjectedRouter
}, {}> {

  handleRequestChange = (event, key) => {
    this.props.categoryStore.handleRequestChange(event, key)
    this.props.router.push({
      pathname: `/article/${key}`
    })
    this.props.articleStore.getArticleList(key)
  }

  componentDidMount() {
    this.props.categoryStore.getArticleCategories()
    this.props.categoryStore.selectedCategoryKey = this.props.params.category
  }

  render() {
    const listItem = this.props.categoryStore.categories.map((category) => {
      return (
        <ListItem key={category.key} value={category.key}>
          <div className={category.key === this.props.categoryStore.selectedCategoryKey ? style.active : ''}>
            {category.name}
          </div>
        </ListItem>
      )
    })
    return (
      <div className={style.container}>
        <div className={style.right}>
          <SelectableList
            value={this.props.categoryStore.selectedCategoryKey}
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
