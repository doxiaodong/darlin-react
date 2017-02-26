import * as React from 'react'
// import { Link } from 'react-router'
import {
  List,
  ListItem
} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import { observer } from 'mobx-react'

import { CategoryStore } from './store'

@observer
export class CompCategory extends React.Component<{ categoryStore: CategoryStore }, {}> {

  componentDidMount() {
    this.props.categoryStore.getArticleCategories()
  }

  render() {
    const listItem = this.props.categoryStore.categories.map((category) => {
      return (
        <ListItem key={category.key}>
          {category.name}
        </ListItem>
      )
    })
    return (
      <List>
        <Subheader>分类</Subheader>
        {listItem}
      </List>
    )
  }
}
