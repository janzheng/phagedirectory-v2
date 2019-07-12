
<!-- 

  A clone of capsidissue, shows the latest capsid
  
 -->

<template>
  <div class="CapsidIssue _section-page _margin-top _margin-center">
    <div class="_section-content _margin-center _padding-bottom-2">
      <div class="" v-html="$md.render(title || '')" />
    </div>
    
    <div class="_section-content _margin-center">
      <Capsid :issues="issues" :show-preview="showPreview" />

      <div v-if="issues.length == 0">
        <h4>Sorry, no Capsid & Tail issue was found at this URL</h4>
        <div>
          If you think this is a bug, please email us at <a href="mailto:support@phage.directory">support@phage.directory</a>
        </div>
      </div>
    </div>

    <div class="CapsidIssue-footer _section-content _margin-center">
      <CapsidMicroBanner class="_section-article _margin-center _margin-top-2 _margin-bottom" />
      <div class="_section-article _margin-center _margin-bottom-2" v-html="$md.render(highlight)" />
      <!-- <Capsid :issues="issues" :show-preview="showPreview" /> -->
    </div>
    
    <div class="_section-content _margin-center">
      <div class="_section-article _margin-center _font-small" v-html="$md.render(fineprint || '')" />
    </div>

  </div>
</template>

<script>

// import Article from '~/components/Article.vue'
import CapsidBanner from '~/components/CapsidBanner.vue'
import CapsidMicroBanner from '~/components/CapsidMicroBanner.vue'
import Capsid from '~/components/CapsidThree.vue'

export default {

  components: {
    CapsidBanner,
    CapsidMicroBanner,
    Capsid,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQueries: ["_capsid-content", "_capsid-data"] // combine queries
  },

  // these are dynamic, and aren't grabbed on generation
  // async asyncData({env, route, store}) {
  async asyncData({route}) {

    // await loadNews(env, store, 'capsid')

    const slug = unescape(route.params.slug)
    return {
      slug,
      showPreview: slug ? true : false, // used to show previews on capsid/slug titles, for testing
    }
  },

  data: function () {
    return {
      title: this.$cytosis.find('Content.capsid-title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      fineprint: this.$cytosis.find('Content.capsid-fine', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      intro: this.$cytosis.find('Content.capsid-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      highlight: this.$cytosis.find('Content.capsid-highlight', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {

    issues() {

      let result = [this.$store.state['C&T'][0]]

      // console.log('issue slug: ', result)
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

