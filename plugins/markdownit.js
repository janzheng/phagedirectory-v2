
// temp fix for @nuxtjs/markdownit
// injects into $md.render

import MarkdownIt from 'markdown-it'
import MarkdownItAttrs from 'markdown-it-attrs'
// let MarkdownIt = require('markdown-it')
// let MarkdownItAttrs = require.resolve('markdown-it-attrs') // loaded thru webpack
// let MarkdownItAttrs = require('markdown-it-attrs') // loaded thru webpack


// export default ({ app }, inject) => {
export default ({ }, inject) => {
  let md = new MarkdownIt({
    html: true,
    typographer: true,
    linkify: true,
    breaks: true,
  })

  // breaks IE11, so it's been moved to devDependencies
  
  md.use(MarkdownItAttrs)
  // md.use(MarkdownItAttrs)
  // md.use(MarkdownItAttrs, {
  //   leftDelimiter: '[',
  //   rightDelimiter: ']'
  // });
  // md.use(require('markdown-it-attrs'), {leftDelimiter: '[', rightDelimiter: ']'})
  // md.use(require('markdown-it-attrs'), {attrs: {'leftDelimiter': '[', 'rightDelimiter': ']'}})

  inject('md', md)
}
