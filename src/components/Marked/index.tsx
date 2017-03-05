import * as React from 'react'
import * as emojione from 'emojione'
import * as xss from 'xss'
import markedService from './service'

import './marked.global.scss'
import './night.global.scss'
import './number.global.scss'
import 'emojione/assets/css/emojione.min.css'

const ms = markedService.init()

export class Marked extends React.Component<{ md: string, safe?: boolean }, {}> {

  ele

  updateJax() {
    if (window['MathJax'] && this.ele) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub, this.ele])
    }
  }

  ref = (ele) => {
    this.ele = ele
    loadMathJax(this.updateJax.bind(this))
  }

  render() {
    const { md, safe } = this.props
    const emojiMd = emojione.toImage(md)
    let html = ms(emojiMd)
    if (safe) {
      html = xss(html)
    }
    return <div ref={this.ref} className='markdown' dangerouslySetInnerHTML={{ __html: html }} />
  }

}

function loadMathJax(callback) {
  if (window['MathJax']) {
    callback()
    return
  }
  const script = document.createElement('script')
  script.src = 'https://cdn.tristana.cc/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-MML-AM_CHTML'
  const s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(script, s)
  script.addEventListener('load', callback)
}
