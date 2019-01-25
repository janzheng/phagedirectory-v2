<template>

  <div class="PhageFutures _section-page _margin-center">

    <div class="_section-content _margin-center">

      <div class="_section-article _margin-center _margin-bottom-2">
        <div class="PhageFutures-title _section-article" v-html="$md.render(intro || '')" />
        <div class="PhageFutures-details _section-article _card --simple _padding _md-p_fix" v-html="$md.render(details || '')" />
      </div>

      <div class="PhageFutures-menu _section-article _margin-center _margin-bottom-2 _grid-3-1-xs">
        <!-- <div>Page Mode: {{ mode }}</div> -->
        <div>
          <router-link to="/phagefutures">Live Stream</router-link>
          <router-link to="/phagefutures/agenda">Agenda</router-link>
          <router-link to="/phagefutures/posters">Posters</router-link>
          <!-- <a href="#" class="--disabled">Posters</a> -->
        </div>
        <div class="_right">
          <router-link to="/phagefutures/about" class="_margin-right-none-i">About</router-link>
        </div>
      </div>

      <no-ssr>
        <div class="PhageFutures-stream _section-article _margin-center">

          <!-- timeline mode -->
          <div v-if="mode == 'timeline'" class="PhageFutures-timeline">
            <div v-if="nextEvent" class="PhageFutures-next" >
              <AgendaEvent :event="nextEvent" :is-next="true" class="PhageFutures-event" />
            </div>

            <div v-for="post of getTimeline" v-if="post.fields['isPublished']" :key="'timeline_'+post.id" class="PhageFutures-posts">
              <!-- timeline post -->
              <StreamCard v-if="!post['isAgenda']" class="PhageFutures-post _grid-gap-small">
                <div v-if="getAuthor(post)" slot="sidebar" class="PhageFutures-post-sidebar" >
                  <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" target="_blank"><img v-if="getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70"></a>
                  <img v-if="!getAuthor(post).fields['Twitter'] && getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70">
                </div>
                <div slot="main" class="PhageFutures-post-main">
                  <div v-if="getAuthor(post)" class="PhageFutures-post-header _md-p_fix _margin-bottom-half" >
                    <div class="PhageFutures-post-meta _grid-2-1">
                      <div>
                        <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" class="PhageFutures-post-author" target="_blank">{{ getAuthor(post).fields['Name'] }}</a>
                        <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" class="PhageFutures-post-header-twitter" target="_blank">{{ getAuthor(post).fields['Twitter'] }}</a>
                        <span v-else class="PhageFutures-post-author">{{ getAuthor(post).fields['Name'] }}</span>
                      </div>
                      <div class="_right">
                        <span class="PhageFutures-post-header-meta">{{ post.fields['Time'] | niceTimeDate }} </span>
                      </div>
                    </div>
                  </div>
                  <div class="PhageFutures-post-content _card --transparent _md-p_fix" v-html="$md.render(post.fields['Markdown'] || '')" />
                </div>
              </StreamCard>

              <!-- agenda post within timeline -->
              <div v-else>
                <StreamCard class="PhageFutures-post _grid-gap-small _margin-none-i">
                  <div v-if="getAuthor(post)" slot="sidebar" class="PhageFutures-post-sidebar" >
                    <a v-if="getAuthor(post).fields['Twitter']" :href="'https://twitter.com/'+getAuthor(post).fields['Twitter']" target="_blank"><img v-if="getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70"></a>
                    <img v-if="!getAuthor(post).fields['Twitter'] && getAuthorImg(post)" :src="getAuthorImg(post)" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70">
                  </div>
                  <div slot="main" class="PhageFutures-post-main ">
                    <AgendaEvent :event="post" class="" />
                  </div>
                </StreamCard>
              </div>

            </div>

          </div>

          <!-- agenda mode -->
          <div v-else-if="mode == 'agenda'" >
            <div v-if="nextEvent" class="PhageFutures-next" >
              <AgendaEvent :event="nextEvent" :is-next="true" class="PhageFutures-event" />
            </div>

            <div v-for="post of getAgenda" :key="'agenda_'+post.id" class="PhageFutures-agenda">
              <AgendaEvent :event="post" />
            </div>
          </div>


          <!-- posters mode -->
          <div v-else-if="mode == 'posters'" class="PhageFutures-posters" >
            <div class="_margin-bottom-2" v-html="$md.render(posters || '')" />
            <div class="_margin-bottom">
              <span class="_font-bold _link" @click="openAllPosters = !openAllPosters">Open all posters</span>
            </div>
            <Toggle v-for="poster of Posters" v-if="poster.fields['isPublished']" :key="poster.id" :off-class="openAllPosters ? '--open' : '--closed'" class="PhageFutures-poster _margin-bottom _card _padding" on-class="--open" >
              <div class="PhageFutures-poster-name _font-bold " v-html="$md.strip($md.render( poster.fields['Name'] || ''))" />
              <div class="PhageFutures-poster-more _margin-top-half">
                <div v-if="poster.fields['AuthorNames']" class="PhageFutures-poster-orgs">{{ poster.fields['AuthorNames'] }}</div>
                <div v-if="poster.fields['Email']" class="PhageFutures-poster-orgs" v-html="$md.render( poster.fields['Email'] || '')" />
                <div class="PhageFutures-poster-orgs _font-bold" v-html="$md.render( poster.fields['Orgs'] || '')" />
                <div class="PhageFutures-poster-abstract" v-html="$md.render( poster.fields['Abstract'] || '')" />
              </div>
            </Toggle>
          </div>



          <!-- about mode -->
          <div v-else-if="mode == 'about'" class="PhageFutures-about">
            <div class="_margin-bottom-2" v-html="$md.render(about || '')" />
            <div v-for="author of Authors" v-if="author.fields['isPublished']" :key="author.id" class="PhageFutures-author _margin-bottom">
              <StreamCard class="PhageFutures-post _grid-gap-small _margin-none-i">
                <div slot="sidebar" class="PhageFutures-post-sidebar" ><img v-if="author.fields['Attachments'] && author.fields['Attachments'][0]" :src="author.fields['Attachments'][0]['thumbnails']['large']['url']" class="cnt _block _left _margin-center" style="border-radius: 100%" width="70" height="70">
                </div>
                <div slot="main" class="PhageFutures-post-main ">
                  <div class="PhageFutures-post-header _md-p_fix _margin-bottom-half">
                    <div class="PhageFutures-post-meta">
                      <a v-if="author.fields['Twitter']" :href="'https://twitter.com/'+author.fields['Twitter']" class="PhageFutures-post-author" target="_blank">{{ author.fields['Name'] }}</a>
                      <a v-if="author.fields['Twitter']" :href="'https://twitter.com/'+author.fields['Twitter']" class="PhageFutures-post-header-twitter" target="_blank">{{ author.fields['Twitter'] }}</a>
                      <span v-else class="PhageFutures-post-author">{{ author.fields['Name'] }}</span>
                    </div>
                  </div>
                  <div class="PhageFutures-post-content _card --transparent _md-p_fix" v-html="$md.render(author.fields['Description'] || '')" />
                </div>
              </StreamCard>
            </div>
          </div>


        </div>
      </no-ssr>

    </div>

    <!-- required to render twitter embeds properly -->
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
  </div>
</template>

<script>

// import { mapState } from 'vuex'
import StreamCard from '~/components/StreamCard.vue'
import StreamEvent from '~/components/StreamEvent.vue'
import AgendaEvent from '~/components/AgendaEvent.vue'
import Toggle from '~/components/Toggle.vue'
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
    const title = "Phage Futures: LIVE"

    return {
      title,
    }
  },

  components: {
    StreamCard,
    StreamEvent,
    AgendaEvent,
    Toggle,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  
  fetch() {
  },

  // async asyncData({app, env, route, store}) {
  async asyncData({app, route}) {
    // somehow this is getting cached?!
    // const pfdata = await store.dispatch('loadCytosis', {
    const pfdata = await loadPhageFutures({
      tableIndex: 'livecontent',
      caller: 'phagefutures page',
      _key: 'keyAe6M1KoPfg25aO',
      _base: 'appCDyNOczdEtiR2A',
    })

    let mode = 'timeline'
    // const slug = unescape(route.params.slug)
    if (route.name == 'phagefutures-agenda')
      mode = 'agenda'
    else if (route.name == 'phagefutures-posters')
      mode = 'posters'
    else if (route.name == 'phagefutures-about')
      mode = 'about'

    // console.log('PF Route:', route, mode)
    // console.log('PF Data loaded:', pfdata, pfdata.tables['Content'])

    return {
      // settings
      mode,

      // from Phage Futures Base
      Timeline: pfdata.tables['Timeline'],
      Authors: pfdata.tables['Authors'],
      Agenda: pfdata.tables['Agenda'],
      Posters: pfdata.tables['Posters'],
      PFContent: pfdata.tables['Content'],

      intro: app.$cytosis.find('Content.intro', pfdata.tables)[0]['fields']['Markdown'],
      about: app.$cytosis.find('Content.about', pfdata.tables)[0]['fields']['Markdown'],
      posters: app.$cytosis.find('Content.posters', pfdata.tables)[0]['fields']['Markdown'],
      details: app.$cytosis.find('Content.details', pfdata.tables)[0]['fields']['Markdown'],
    }
  },

  data: function () {
    // console.log('data:', this.$store.state)
    return {
      // content: this.$store.state.Content,
      openAllPosters: false,
    }
  },

  computed: {
    // ...mapState([
    //   'cytosis',
    //   // 'test'
    //   ]),

    nextEvent() {
      // this shows the net event by date listed in Agenda
      // this only really works if Agenda is sorted! But, we also don't want to force-sort Agenda here in case anything changes
      let agenda = this['Agenda']

      // let final = []
      const nowDate = new Date
      const now = nowDate.toISOString()

      for (let event of agenda) {
        // skip Day
        // if (event.fields['Type'] == 'Day' || event.fields['Type'] == 'Day End') {
        if (now < event.fields['Time'] && 
          // event.fields['Type'] != 'Day' && 
          event.fields['Type'] != 'Session' && 
          event.fields['isPublished']) {
          return event
        }
      }
      return false // no more items in the agenda
    },

    getAgenda() {
      // return the agenda in the order it's setup in airtable
      if(this.mode == 'agenda') {
        let agenda = this['Agenda']

        // strip empty / unpublished
        for (const i of agenda.keys()) {
          if (!agenda[i].fields['isPublished']) {
            agenda.splice(i,1)
          }
        }

        return agenda
      } 
    },

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
      let final = []
      const nowDate = new Date
      const now = nowDate.toISOString()
      for (let item of timeline) {
        // console.log('time vs:', now, item.fields['Time'], now > Date.UTC(item.fields['Time']))
        if (now > item.fields['Time']) {
          final.push(item)
        }
      }

      // console.log('timeline:', final, timeline)
      return final

    }
  },

  created: async function () {
    const pfdata = await loadPhageFutures({
      tableIndex: 'livecontent',
      caller: 'phagefutures page',
      _key: 'keyAe6M1KoPfg25aO',
      _base: 'appCDyNOczdEtiR2A',
    })

    // console.log('updated: ', pfdata)

    this.Timeline = pfdata.tables['Timeline']
    this.Authors = pfdata.tables['Authors']
    this.Agenda = pfdata.tables['Agenda']
    this.Posters = pfdata.tables['Posters'],
    this.PFContent = pfdata.tables['Content']

  },

  mounted: function () {
  },

  methods: {
    getAuthor(post) {
      if (post.fields['Author'])
        return this.$cytosis.getLinkedRecords(post.fields['Author'], this['Authors'], true)[0]
    },

    getAuthorImg(post) {
      if (!post.fields['Author'])
        return

      const author = this.$cytosis.getLinkedRecords(post.fields['Author'], this['Authors'], true)[0]

      if(!author)
        return false

      if (author.fields['Attachments'] && author.fields['Attachments'][0]) {
        return author.fields['Attachments'][0]['thumbnails']['large']['url']
        // return author.fields['Attachments'][0]['url']
      }
      return false

      // url": "https://dl.airtable.com/.attachments/7f459a1f1437b787c232b774c8f21be0/b4df0ae6/801bdb80", "filename": "801bdb80", "size": 41508, "type": "image/jpeg", "thumbnails": { "small": { "url": "https://dl.airtable.com/.attachmentThumbnails/695ca06cffaed869538cff6414a35ccf/743d6845", "width": 54, "height": 36 }, 
    },

    getAgendaType(agenda) {
      // edit this later w/ triggers etc.
      return agenda.fields['Type']
    },
  }

}
</script>

<style lang="scss" scoped>

</style>

