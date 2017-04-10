import * as React from 'react'
import * as Clipboard from 'clipboard'

export class Clip extends React.Component<{ value, onClip }, void> {

  content: string = ''
  clipboard: Clipboard

  componentWillUnmount() {
    if (this.clipboard) {
      this.clipboard.destroy()
    }
  }

  ref = (element) => {
    if (!element) {
      return
    }
    const { onClip } = this.props

    const option: Clipboard.Options = {
      text: (ele) => {
        return this.content
      }
    }
    this.clipboard = new Clipboard(element, option)

    this.clipboard.on('success', () => {
      onClip(true)
    })
      .on('error', () => {
        onClip(false)
      })
  }

  render() {
    this.content = this.props.value
    return (
      <div ref={this.ref}>
        {this.props.children}
      </div>
    )
  }
}
