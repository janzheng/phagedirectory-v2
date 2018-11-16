
<!-- 

  Note: "blog" is the catch-all term for blog items, news articles, etc.
  this includes Capsid & Tail articles as well

  This page is used specifically for Phage Directory updates and blog
  On the "Blog" table these are of the type "Updates"

 -->

<template>
  <div>
    <section class="Periodical narrow copy _margin-center _padding-top-2">

      <div class="News-intro _margin-bottom _flex _flex-bottom">
        <div class="" v-html="$md.render(title || '')"></div>
        <div class="" v-html="$md.render(intro || '')"></div>    
      </div>

    </section>
    
    <MailchimpBanner class="_margin-center" />

    <Periodical :issues="issues" :showPreview="showPreview" />

    <div class="Periodical-card _width-content-paragraph _margin-center _font-small" v-html="$md.render(fine || '')"></div>
  </div>
</template>

<script>

import Article from '~/components/Article.vue'
import MailchimpBanner from '~/components/MailchimpBanner.vue'
import Periodical from '~/components/Periodical.vue'
import { mapState } from 'vuex'

import {loadStatic, loadNews} from '~/other/loaders'

export default {

  components: {
    Article,
    MailchimpBanner,
    Periodical
  },

  layout: 'contentframe',
  middleware: 'pageload',

  // these are dynamic, and aren't grabbed on generation
  async asyncData({app, env, route, store}) {

    const staticData = await loadStatic(env, store, 'newspage')
    const newsData = await loadNews(env, store, 'newspage')

    const slug = unescape(route.params.slug)
    return {
      title: app.$cytosis.find('Content.news-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
      fine: app.$cytosis.find('Content.capsid-fine', store.state.cytosis.tables)[0]['fields']['Markdown'],
      intro: app.$cytosis.find('Content.news-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
      slug,
      showPreview: slug ? true : false, // used to show previews on capsid/slug titles, for testing
    }
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  computed: {
    // ...mapState([
    //   'Content',
    //   'C&T',
    //   'Articles',
    //   ]),

    issues() {

      const result = this.$cytosis.search(this.slug, this.$store.state['C&T'], ['Slug'])
      console.log('issue slug: ', result)

      return result
    }

  },

  methods: {
  }

}
</script>


<style lang="scss" scoped>

</style>

