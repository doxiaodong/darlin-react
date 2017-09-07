import * as React from 'react'
import { observer } from 'mobx-react'
import {
  observable,
  action
} from 'mobx'
import { loadScript } from 'base/utils'
import { CDN } from 'base/constants'
import markedService from './service'

import './marked.global.scss'
import './night.global.scss'
import './number.global.scss'

const ms = markedService.init()
// for emojione class name
@observer
export class Marked extends React.Component<{ md: string, safe?: boolean }, {}> {

  ele

  filterXSS
  whiteList

  @observable html = ''

  async componentDidMount() {
    await Promise.all([
      loadScript(
        'emojione',
        `${CDN}/emojione/2.2.7/lib/js/emojione.min.js`
      ),
      loadScript(
        'hljs',
        `${CDN}/highlight.js/9.12.0/highlight.min.js`
      ),
      loadScript(
        'filterXSS',
        `${CDN}/js-xss/0.3.3/xss.min.js`
      )
    ])
    this.filterXSS = window['filterXSS']
    this.whiteList = this.filterXSS.whiteList
    this.whiteList.img.push('class')

    this.updateHtml()
  }

  componentDidUpdate() {
    this.updateJax()
  }

  @action
  updateHtml() {
    const { md, safe } = this.props
    const emojiMd = this.updateEmojione(md)
    this.html = ms(emojiMd)
    if (safe && this.filterXSS) {
      this.html = this.filterXSS(this.html, { whiteList: this.whiteList })
    }
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

  ref = async (ele) => {
    this.ele = ele
    await loadScript(
      'MathJax',
      `${CDN}/mathjax/2.7.2/MathJax.js?config=TeX-MML-AM_CHTML`
    )
    this.updateJax()
  }

  render() {
    return <div ref={this.ref} className="markdown" dangerouslySetInnerHTML={{ __html: this.html }} />
  }

}
