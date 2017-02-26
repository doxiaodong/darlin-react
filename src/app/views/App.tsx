import * as React from 'react'
import { CompNavbar } from 'app/components/Navbar'

export class App extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <CompNavbar />
        {this.props.children}
      </div>
    )
  }
}
