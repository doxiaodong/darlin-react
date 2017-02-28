import * as React from 'react'
import { CompNavbarWithRouter } from 'components/Navbar'

export class App extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <CompNavbarWithRouter />
        {this.props.children}
      </div>
    )
  }
}
