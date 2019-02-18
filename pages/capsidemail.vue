
<!-- 

  Mirrors newspage, but intended to render emails for mailchimp

 -->

<template>
  <div>
    <CapsidEmail :issues="issues" :show-preview="showPreview" />
  </div>
</template>

<script>

// import Article from '~/components/Article.vue'
import CapsidEmail from '~/components/CapsidEmail.vue'
// import {loadStatic, loadNews} from '~/other/loaders'
import {loadNews} from '~/other/loaders'

export default {

  components: {
    // Article,
    CapsidEmail
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_basic",
    tableQueries: ["_capsid-content", "_capsid-data"] // combine queries
  },

  // these are dynamic, and aren't grabbed on generation
  // async asyncData({app, env, route, store}) {
  async asyncData({app, env, route, store}) {

    // const staticData = await loadStatic(env, store, 'newspage')
    const newsData = await loadNews(env, store, 'newspage')
    // console.log('newspage:', newsData)

    const slug = unescape(route.params.slug)
    return {
      slug,
      showPreview: slug ? true : false, // used to show previews on capsid/slug titles, for testing
    }
  },

  data: function () {
    return {
      title: this.$cytosis.find('Content.capsid-title', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      fine: this.$cytosis.find('Content.capsid-fine', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      intro: this.$cytosis.find('Content.capsid-intro', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
    }
  },

  computed: {
    // ...mapState([
    //   'Content',
    //   'C&T',
    //   'Articles',
    //   'Tags',
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
