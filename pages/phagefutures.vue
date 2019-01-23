<template>

  <div class="PhageFutures _section-page _margin-center">

    <div class="_section-content _margin-center">

      <div class="_section-article _margin-center">
        <div class="PhageFutures-title _section-article" v-html="$md.render(intro || '')" />
      </div>

      <div class="PhageFutures-timeline _section-article _margin-center">
        <div v-for="post of getTimeline" :key="post.id" class="PhageFutures-posts">

          <!-- regular post -->
          <StreamCard v-if="!post['isAgenda']" class="PhageFutures-post _grid-gap-small">
            <div slot="sidebar" class="PhageFutures-post-sidebar">
              <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" target="_blank"><img v-if="getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70"></a>
              <img v-if="!getAuthor(post).fields['Twitter'] && getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70">
            </div>
            <div slot="main" class="PhageFutures-post-main">
              <div class="PhageFutures-post-header _md-p_fix _margin-bottom-half" >
                <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" class="PhageFutures-post-author" target="_blank">{{ getAuthor(post).fields['Name'] }}</a>
                <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" class="PhageFutures-post-header-twitter" target="_blank">{{ getAuthor(post).fields['Twitter'] }}</a>
                <span v-else class="PhageFutures-post-author">{{ getAuthor(post).fields['Name'] }}</span>
                <span class="PhageFutures-post-header-meta"> — {{ post.fields['Time'] | niceTimeDate }} </span>
              </div>
              <div class="PhageFutures-post-content _card --transparent _md-p_fix" v-html="$md.render(post.fields['Markdown'] || '')" />
            </div>
          </StreamCard>

          <!-- agenda item -->
          <StreamCard v-else class="PhageFutures-agenda _grid-gap-small">
            <div slot="sidebar" class="PhageFutures-agenda-sidebar">
              <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" target="_blank"><img v-if="getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70"></a>
              <img v-if="!getAuthor(post).fields['Twitter'] && getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70">
            </div>
            <div slot="main" class="PhageFutures-agenda-main">
              <div class="PhageFutures-post-header _md-p_fix _margin-bottom-half" >
                <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" class="PhageFutures-post-author" target="_blank">{{ getAuthor(post).fields['Name'] }}</a>
                <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" class="PhageFutures-post-header-twitter" target="_blank">{{ getAuthor(post).fields['Twitter'] }}</a>
                <span v-else class="PhageFutures-post-author">{{ getAuthor(post).fields['Name'] }}</span>
                <span class="PhageFutures-post-header-meta"> — {{ post.fields['Time'] | niceTimeDate }} </span>
              </div>
              <div class="PhageFutures-post-content _card --transparent _md-p_fix" v-html="$md.render(post.fields['Name'] || '')" />
            </div>
          </StreamCard>

        </div>
      </div>

    </div>

    <!-- required to render twitter embeds properly -->
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
  </div>
</template>

<script>

// import { mapState } from 'vuex'
import StreamCard from '~/components/StreamCard.vue'
import Cytosis from '~/other/cytosis'

// const loadPhageFutures = async function ({env, tableIndex, options, caller, _key, _base}) {
const loadPhageFutures = async function ({env, tableIndex, options, _key, _base}) {
  const airKey = _key || env.airtable_api
  const airBase = _base || env.airtable_base

  // console.log(`[actions/loadCytosis] ${caller}: loading:`, tableIndex, options)
  let cytosis = await new Cytosis({
    airKey, 
    airBase, 
    tableIndex, 
    options
  })
  // commit('setCytosis', cytosis)
  // console.log(`[actions/loadCytosis] ${caller}: done.`)
  return Promise.resolve(cytosis)
}

export default {
  head () {
    const title = "About Phage Directory"

    return {
      title,
    }
  },

  components: {
    StreamCard,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  
  fetch() {
  },

  // async asyncData({app, env, route, store}) {
  async asyncData({app, env, store}) {
    // somehow this is getting cached?!
    // const pfdata = await store.dispatch('loadCytosis', {
    const pfdata = await loadPhageFutures({
      env,
      tableIndex: 'livecontent',
      caller: 'phagefutures page',
      _key: 'keyAe6M1KoPfg25aO',
      _base: 'appCDyNOczdEtiR2A',
    })

    // const slug = unescape(route.params.slug)
    console.log('PF Data loaded:', pfdata, pfdata.tables['Timeline'])

    return {
      Timeline: pfdata.tables['Timeline'],
      Authors: pfdata.tables['Authors'],
      Agenda: pfdata.tables['Agenda'],
      intro: app.$cytosis.find('Content.phagefutures-intro', store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  data: function () {
    // console.log('data:', this.$store.state)
    return {
      // content: this.$store.state.Content,
    }
  },

  computed: {
    // ...mapState([
    //   'cytosis',
    //   // 'test'
    //   ]),
    getTimeline() {
      // get the posts from timeline
      let timeline = this['Timeline']
      let agenda = this['Agenda']

      // add an internal "isAgenda" tag to agenda items since they display differently
      for (const i of agenda.keys()) {
        agenda[i]['isAgenda'] = true
      }

      // merge posts from timeline w/ Agenda items
      timeline = [ ...timeline, ...agenda ]

      // sort timeline by Time
      timeline = this.$cytosis.sort(timeline, 'Time').reverse()

      // get rid of items that haven't happened yet

      // console.log('timeline:', timeline)
      return timeline
    }
  },

  mounted: function () {
  },

  methods: {
    getAuthor(post) {
      return this.$cytosis.getLinkedRecords(post.fields['Author'], this['Authors'], true)[0]
    },

    getAuthorImg(post) {
      const author = this.$cytosis.getLinkedRecords(post.fields['Author'], this['Authors'], true)[0]

      if(!author)
        return false

      if (author.fields['Attachments'] && author.fields['Attachments'][0]) {
        return author.fields['Attachments'][0]['thumbnails']['large']['url']
        // return author.fields['Attachments'][0]['url']
      }
      return false

      // url": "https://dl.airtable.com/.attachments/7f459a1f1437b787c232b774c8f21be0/b4df0ae6/801bdb80", "filename": "801bdb80", "size": 41508, "type": "image/jpeg", "thumbnails": { "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/695ca06cffaed869538cff6414a35ccf/743d6845", "width": 54, "height": 36 }, 
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

