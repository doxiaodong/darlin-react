import * as React from 'react'
import { testApi } from 'api/test'

export default class ViewIndex extends React.Component<{}, {}> {

  componentDidMount() {
    testApi().then((data) => {
      console.log('fetch success: ', data)
    }).catch((err) => {
      console.log('fetch error: ', err)
    })
  }

  render() {
    return (
      <div>nice react</div>
    )
  }
}
