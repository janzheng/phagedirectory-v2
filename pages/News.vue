
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
        <div class="" v-html="$md.render(title)"></div>
        <div class="" v-html="$md.render(intro)"></div>    
      </div>

    </section>
    
    <MailchimpBanner class="_margin-center" />

    <Periodical :issues="latest" />

    <PeriodicalStub :issues="notLatest" />

  </div>
</template>

<script>

import Article from '~/components/Article.vue'
import MailchimpBanner from '~/components/MailchimpBanner.vue'
import Periodical from '~/components/Periodical.vue'
import PeriodicalStub from '~/components/PeriodicalStub.vue'
import { mapState } from 'vuex'


export default {

  components: {
    Article,
    MailchimpBanner,
    Periodical,
    PeriodicalStub,
  },

  layout: 'contentframe',
  middleware: 'pageload',

  async asyncData({app, env, route, store}) {

    const newsData = await store.dispatch('loadCytosis', {
      env,
      tableIndex: 'news',
    })

    const slug = unescape(route.params.slug)
    return {
      title: app.$cytosis.find('Content.news-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
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
    ...mapState([
      'Content',
      'C&T',
      'Articles',
      ]),

    latest() {
      // NOTE: this always pulls the TOP item from airtable. Make sure it's the right one!
      return [this['C&T'][0]] // return an array of the first issue only
    },

    notLatest() {
      return this['C&T'].slice(1)
    },

    issues() {
      return this['C&T']
    }

  },

  methods: {
  }

}
</script>


<style lang="scss" scoped>

</style>

