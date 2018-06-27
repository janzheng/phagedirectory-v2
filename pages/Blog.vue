<template>

  <ContentFrame class="Blog container">
    <section class="narrow copy">

      <!-- show article if param given -->
      <div class="Blog-article" v-if="slug && blog">
        <div><router-link to="/blog">Blog</router-link></div>
        <div class="Blog-title">{{blog.fields.Name}}</div>
        <div class="Blog-lede">{{blog.fields.Lede}}</div>
        <div class="Blog-tags">
          <span class="Blog-tag _tag" v-for="tag of blog.fields.Tags" :key="tag">
            {{tag}}
          </span>
        </div>
        <div class="Blog-content" v-html="$md.render(blog.fields.Markdown)"></div>
      </div>

      <!-- show full blog if no params given -->
      <div class="Blog-body" v-else>
        <h1 class="Blog-title title">
          News
        </h1>
        <div class="Blog-list">
          <div class="Blog-item _margin-bottom" v-for="blog of Blog" :key="blog.fields.Name">
            <div class="Blog-title" ><router-link :to="{path: `/blog/${blog.fields.Slug}`}">{{blog.fields.Name}}</router-link></div>
            <div class="Blog-lede" >{{blog.fields.Lede}}</div>
            <div class="Blog-tags">
              <span class="Blog-tag _tag" v-for="tag of blog.fields.Tags" :key="tag">
                {{tag}}
              </span>
            </div>
          </div>
        </div>
      </div>




    </section>
  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import { cytosis } from '~/assets/helpers.js'


export default {

  components: {
    ContentFrame
  },

  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },

  data: function () {
    return {
      cytosis: this.$store.cytosis,
      slug: this.$route.params.slug,
      blog: undefined, // loaded in 'mounted'
    }
  },

  mounted: async function () {
    const slug = unescape(this.$route.params.slug)
    // console.log('!!!', this.$store.state.cytosis.find(slug, [this.Blog], ['Slug'])[0], ' vs. ', this.cytosis.find(slug, [this.Blog], ['Slug'])[0])
    // console.log('???', this.$store.state.cytosis.find(slug, [this.Blog], ['Slug'])[0])
    this.blog = this.cytosis.find(slug, [this.Blog], ['Slug'])[0]
  },

  computed: {
    blogs() { // show the published blogs
      return ''
    }
  },


  methods: {
    content(findStr) {
      return this.$md.render( this.cytosis.find(findStr)[0] ?  this.cytosis.find(findStr)[0].fields.Markdown : '')
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

