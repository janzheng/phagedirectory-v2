
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
  md.use(MarkdownItAttrs)

  md['strip'] = function (md) {
    // add functionality to strip the annoying <p></p> from a rendered markdown
    // really useful for rendering markdown content in to an H1, etc.
    // usage: $md.strip($md.render( post.fields['Title'] || ''))
    return md.substring(3, md.length-5)
  }

  inject('md', md)


}



