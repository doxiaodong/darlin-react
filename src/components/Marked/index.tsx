import * as React from 'react'
import * as xss from 'xss'
import { loadScript } from 'base/utils'
import markedService from './service'

import './marked.global.scss'
import './night.global.scss'
import './number.global.scss'

const ms = markedService.init()
// for emojione class name
const whiteList = xss.whiteList
whiteList.img.push('class')

export class Marked extends React.Component<{ md: string, safe?: boolean }, {}> {

  ele

  componentDidMount() {
    loadScript(
      'Emojione',
      'https://cdn.tristana.cc/ajax/libs/emojione/2.2.7/lib/js/emojione.min.js',
      () => {
        this.setState({})
      }
    )
  }

  componentDidUpdate() {
    this.updateJax()
  }

  updateEmojione(md) {
    const emojione = window['emojione']
    if (emojione) {
      return emojione.toImage(md)
    }

    return md
  }

  updateJax() {
    if (window['MathJax'] && this.ele) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.ele])
    }
  }

  ref = (ele) => {
    this.ele = ele
    loadScript(
      'MathJax',
      'https://cdn.tristana.cc/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML',
      this.updateJax.bind(this)
    )
  }

  render() {
    const { md, safe } = this.props
    const emojiMd = this.updateEmojione(md)
    let html = ms(emojiMd)
    if (safe) {
      html = xss(html, { whiteList })
    }
    return <div ref={this.ref} className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
  }

}
