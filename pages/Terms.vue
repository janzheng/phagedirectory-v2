<template>

  <ContentFrame class="Terms container">
    <section class="narrow copy">

      <!-- show article if param given -->
      <!-- <div class="Terms-article" v-if="slug && term">
        <div><router-link to="/blog">Blog</router-link></div>
        <div class="Blog-title">{{blog.fields.Name}}</div>
        <div class="Blog-lede">{{blog.fields.Lede}}</div>
        <div class="Blog-tags">
          <span class="Blog-tag _tag" v-for="tag of blog.fields.Tags" :key="tag">
            {{tag}}
          </span>
        </div>
        <div class="Blog-content" v-html="$md.render(blog.fields.Markdown)"></div>
      </div> -->

      <!-- show full blog if no params given -->
      <div class="Terms-body" >
        <h1 class="Terms-title title">
          Terms
        </h1>
        <div class="Terms-list">
          <div class="Terms-item _margin-bottom" v-for="term of Terms" :key="term.fields.Name" >
            <div class="Terms-title" >{{term.fields.Name}}</div>
            <div class="Terms-tags">
              <span class="Terms-tag _tag" v-for="tag of term.fields.Tags" :key="tag">
                {{tag}}
              </span>
            </div>
            <div class="Terms-content" v-html="$md.render(term.fields.Markdown || '')">
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

  middleware: 'pageload',
  
  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },

  data: function () {
    return {
      cytosis: this.$store.state.cytosis,
      slug: this.$route.params.slug,
      term: undefined, // loaded in 'mounted'
    }
  },

  mounted: async function () {
    const slug = unescape(this.$route.params.slug)
    const term = this.cytosis.find(slug, [this.Terms], ['Slug'])[0]
    if (term && term.fields.isPublished)
      this.term = term
  },

  computed: {
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

