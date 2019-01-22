
<!-- 

  Newspage: covers a specific issue in /capsid/:slug (should probably combine at some point)
  
 -->

<template>
  <div class="CapsidIssue _section-page _margin-top _margin-center">

    <!-- 
        <div class="_section-content _margin-center _grid-2">
          <div class="" v-html="$md.render(title || '')" />
          <div>
            <CapsidMicroBanner class="_section-article _margin-center _margin-top-2 _margin-bottom" />
            <div class="_section-article _margin-center _margin-bottom-2" v-html="$md.render(highlight)" />
          </div>
        </div>
     -->
    <div class="_section-content _margin-center _padding-bottom-2">
      <!-- <div class="_flex _flex-bottom"> -->
      <!-- <router-link to="/capsid" class="" v-html="$md.render(title || '')" /> -->
      <div class="" v-html="$md.render(title || '')" />
      <!-- <div class="" v-html="$md.render(intro || '')" />     -->
      <!-- </div> -->
    </div>
    
    <div class="_section-content _margin-center">
      <!-- <CapsidBanner class="_margin-center _margin-top-2 _margin-bottom-2" /> -->
      <!-- <CapsidMicroBanner class="_section-article _margin-center _margin-top-2 _margin-bottom" /> -->
      <!-- <div class="_section-article _margin-center _margin-bottom-2" v-html="$md.render(highlight)" /> -->
      <Capsid :issues="issues" :show-preview="showPreview" />

      <div v-if="issues.length == 0">
        <h4>Sorry, no Capsid & Tail issue was found at this URL</h4>
        <div>
          If you think this is a bug, please email us at <a href="mailto:support@phage.directory">support@phage.directory</a>
        </div>
      </div>
    </div>

    <div class="_section-content _margin-center _padding-bottom-2">
      <!-- <CapsidBanner class="_margin-center _margin-top-2 _margin-bottom-2" /> -->
      <CapsidMicroBanner class="_section-article _margin-center _margin-top-2 _margin-bottom" />
      <div class="_section-article _margin-center _margin-bottom-2" v-html="$md.render(highlight)" />
      <!-- <Capsid :issues="issues" :show-preview="showPreview" /> -->
    </div>
    
    <!-- <CapsidTwo:issues="issues" :show-preview="showPreview"  class="_margin-center" /> -->

    <div class="_section-content _margin-center">
      <div class="_section-article _margin-center _font-small" v-html="$md.render(fineprint || '')" />
    </div>

  </div>
</template>

<script>

// import Article from '~/components/Article.vue'
import CapsidBanner from '~/components/CapsidBanner.vue'
import CapsidMicroBanner from '~/components/CapsidMicroBanner.vue'
import Capsid from '~/components/Capsid.vue'
import CapsidTwo from '~/components/CapsidTwo.vue'
import {loadNews} from '~/other/loaders'

export default {

  components: {
    // Article,
    CapsidBanner,
    CapsidMicroBanner,
    Capsid,
    CapsidTwo,

  },

  layout: 'contentframe',
  middleware: 'pageload',

  // these are dynamic, and aren't grabbed on generation
  async asyncData({app, env, route, store}) {

    // const staticData = await loadStatic(env, store, 'newspage')
    // const newsData = await loadNews(env, store, 'capsid')
    await loadNews(env, store, 'capsid')
    // console.log('newspage:', newsData)

    const slug = unescape(route.params.slug)
    return {
      title: app.$cytosis.find('Content.capsid-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
      fineprint: app.$cytosis.find('Content.capsid-fine', store.state.cytosis.tables)[0]['fields']['Markdown'],
      intro: app.$cytosis.find('Content.capsid-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
      slug,
      highlight: app.$cytosis.find('Content.capsid-highlight', store.state.cytosis.tables)[0]['fields']['Markdown'],
      showPreview: slug ? true : false, // used to show previews on capsid/slug titles, for testing
    }
  },

  data: function () {
    return {
    }
  },

  computed: {
    // ...mapState([
    //   'Content',
    //   'C&T',
    //   'Articles',
    //   ]),

    issues() {

      let result = this.$cytosis.search(this.slug, this.$store.state['C&T'], ['Slug'])

      // result isn't a 100% match, so need to do manual EXACT matching (is this a cytosis bug?)
      if (result.length > 1) {
        for (let issue of result) {
          // return exact slug match
          if (issue.fields['Slug'] == this.slug) {
            result = [issue]
            break
          }
        }
      }

      console.log('issue slug: ', result)
      return result // array of issues
    }

  },

  mounted: async function () {
  },

  methods: {
  }

}
</script>


<style lang="scss" scoped>

</style>

