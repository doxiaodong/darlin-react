import * as React from 'react'

export class Title extends React.Component<{ title: string }, {}> {

  updateTitle(props) {
    const nextTitle = props.title || ''
    if (nextTitle !== document.title) {
      document.title = nextTitle
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateTitle(nextProps)
  }

  componentDidMount() {
    this.updateTitle(this.props)
  }

  render() {
    return (
      null
    )
  }
}
