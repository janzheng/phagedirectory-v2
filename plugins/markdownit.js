
// temp fix for @nuxtjs/markdownit
// injects into $md.render

import MarkdownIt from 'markdown-it'

export default ({ app }, inject) => {
  const md = new MarkdownIt({
    html: true,
    typographer: true,
    linkify: true,
    breaks: true,
  })
  md.use(require('markdown-it-attrs'))
  md.use(require('markdown-it-attrs'), {leftDelimiter: '[', rightDelimiter: ']'})
  // md.use(require('markdown-it-attrs'), {
  //   leftDelimiter: '[',
  //   rightDelimiter: ']'
  // });
  // md.use(require('markdown-it-attrs'), {attrs: {'leftDelimiter': '[', 'rightDelimiter': ']'}})

  inject('md', md)
}
