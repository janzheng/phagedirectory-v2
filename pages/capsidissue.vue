
<!-- 

  Newspage: covers a specific issue in /capsid/:slug (should probably combine at some point)
  
 -->

<template>
  <div class="CapsidIssue _section-page _margin-top _margin-center _padding-top-3">

    <!-- 
        <div class="_section-content _margin-center _grid-2">
          <div class="" v-html="$md.render(title || '')" />
          <div>
            <CapsidMicroBanner class="_section-article _margin-center _margin-top-2 _margin-bottom" />
            <div class="_section-article _margin-center _margin-bottom-2" v-html="$md.render(highlight)" />
          </div>
        </div>
     -->
    <!-- <div class="_section-content _margin-center _padding-bottom-2"> -->
    <!-- <div class="" v-html="$md.render(title || '')" /> -->
    <!-- </div> -->

    <div class="CapsidIssue-masthead _section-article _margin-center _padding-bottom-3">
      <router-link to="/capsid" class="_grid-auto-1-xs _align-vertically --underline-none">
        <img class="cnt _block _margin-center" src="/cnt.png" width="120px" alt="Capsid and Tail" >
        <div class="_left _font-serif">A weekly phage periodical</div>
      </router-link>
    </div>

  
    <CapsidThree :issues="issues" />

    <div class="_section-content _margin-center">
      <div v-if="issues.length == 0">
        <h4>Sorry, no Capsid & Tail issue was found at this URL</h4>
        <div>
          If you think this is a bug, please email us at <a href="mailto:support@phage.directory">support@phage.directory</a>
        </div>
      </div>
    </div>

    <no-ssr>
      <div id="comment" class="Capsid-disqus" >
        <vue-disqus :identifier="slug" shortname="capsid-tail" url="https://phage.directory" />
      </div>
    </no-ssr>

    <div class="CapsidIssue-footer _section-content _margin-center">
      <CapsidMicroBanner class="_section-article _margin-center _margin-top-2 _margin-bottom" />
      <div class="_section-article _margin-center _margin-bottom-2" v-html="$md.render(highlight)" />
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
// import Capsid from '~/components/Capsid.vue'
// import CapsidTwo from '~/components/CapsidTwo.vue'
import CapsidThree from '~/components/CapsidThree.vue'
// import {loadNews} from '~/other/loaders'

export default {

  components: {
    // Article,
    CapsidBanner,
    CapsidMicroBanner,
    // Capsid,
    // CapsidTwo,
    CapsidThree,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    // tableQuery: "_basic",
    tableQueries: ["_capsid-content", "_capsid-data"] // combine queries
  },

  // these are dynamic, and aren't grabbed on generation
  // async asyncData({env, route, store}) {
  async asyncData({route}) {

    // await loadNews(env, store, 'capsid')

    const slug = unescape(route.params.slug)
    return {
      slug,
      // showPreview: slug ? true : false, // used to show previews on capsid/slug titles, for testing
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

      // console.log('issue slug: ', result)
      return result // array of issues
    }

  },

  created: async function () {
  },

  methods: {
  }

}
</script>


<style lang="scss" scoped>

</style>

