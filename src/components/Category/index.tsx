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
import {
  Card,
  CardHeader
} from 'material-ui/Card'
import { observer } from 'mobx-react'
import categoryStore from 'stores/category'
import i18nStore from 'stores/i18n'

import {
  headerStyle,
  titleStyle
} from 'styles/react/card/header'

import * as style from './style.scss'

const SelectableList = makeSelectable(List)

@observer
export class Category extends React.Component<{
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
        <Card className={style.right + ' each-block'}>
          <CardHeader
            title={t('article:category')}
            style={headerStyle}
            titleStyle={titleStyle}
          />
          <SelectableList
            style={{ paddingTop: 0 }}
            value={categoryStore.selectedCategoryKey}
            onChange={this.handleRequestChange}
          >
            {listItem}
          </SelectableList>
        </Card>
        <div className={style.left} />
      </div>
    )
  }
}

export const CategoryWithRouter = withRouter(Category)
