import * as React from 'react'
import { CompNavbarWithRouter } from 'components/Navbar'

export class Common extends React.Component<{}, {}> {

  render() {
    return (
      <div>
        <CompNavbarWithRouter />
        {this.props.children}
      </div>
    )
  }
}
