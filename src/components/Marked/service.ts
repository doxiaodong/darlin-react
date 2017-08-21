import * as marked from 'marked'
// import * as hljs from 'highlight.js'

export class MarkedService {
  private options: any = {}

  constructor() {
    this.setOptions({})
    this.setRenderer({
      heading: (text, level) => {
        const ele = document.createElement('a')
        ele.innerHTML = text
        const innerText = ele.innerText
        // const encodeText = encodeURI(innerText)
        return `
          <h${level} id="${innerText}">${text}</h${level}>\n
        `
      },
      code: (text, language) => {
        let lang: string = ''
        if (language) {
          lang = ' lang-' + language
        }
        const html: string = window['hljs'] ? hljs.highlightAuto(text).value : text
        const lines: string = new Array(html.split(/\n/).length + 1).join('<span></span>')
        return `
          <pre><code class="hljs${lang}"><span class="hjln">${lines}</span>${html}</code></pre>
        `
      }
    })
  }

  setRenderer(obj: any) {
    const render = new marked.Renderer()
    const o = Object.keys(obj)
    let l = o.length
    while (l--) {
      render[o[l]] = obj[o[l]]
    }
    this.options.renderer = render
    marked.setOptions(this.options)
    return marked
  }

  setOptions(obj: any) {
    this.options = { ...obj }
  }

  init() {
    return marked
  }
}

export default new MarkedService()
