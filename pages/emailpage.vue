
<!-- 

  Mirrors newspage, but intended to render emails for mailchimp

 -->

<template>
  <div>

    <EmailPeriodical :issues="issues" :showPreview="showPreview" />

  </div>
</template>

<script>

import Article from '~/components/Article.vue'
import MailchimpBanner from '~/components/MailchimpBanner.vue'
import EmailPeriodical from '~/components/EmailPeriodical.vue'
import { mapState } from 'vuex'

import {loadStatic, loadNews} from '~/other/loaders'

export default {

  components: {
    Article,
    MailchimpBanner,
    EmailPeriodical
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
    //   'Tags',
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
