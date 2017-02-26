import * as React from 'react'

export class CompTitle extends React.Component<{ title: string }, {}> {
  componentDidMount() {
    const nextTitle = this.props.title || ''
    if (nextTitle !== document.title) {
      document.title = nextTitle
    }
  }

  render() {
    return (
      null
    )
  }
}
