import * as React from 'react'

export default class ViewIndex extends React.Component<{}, {}> {

  async a() {
    const x = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(10001)
      }, 2000)
    })
    console.log(x)
    return x
  }

  render() {
    const a = this.a()
    a.then((d) => {
      console.log(d)
    })
    return (
      <div>nice react</div>
    )
  }
}
