<template>
  <div class="Home _section-page _margin-center _padding-left-2 _padding-right-2">

    <div class="_section-content">
      <div class="_section-article" v-html="$md.render(intro || '')" />
    </div>

    <!-- 
    <div class="TestOne">
      This is yet a test. LIGHT
    </div>
    <div class="Test">
      This is yet a test
    </div>
    <div class="TestTwo">
      This also is yet a test
    </div>
     -->

 
    <!-- <div class="">
          <div class="_section-content">
            <div class="_section-article">
              <CapsidBanner />
            </div>
          </div>
          <div class="_grid-3-1">
            <div>
              <FormCapsidFeedback class=""/>
            </div>

            <div class="">
              <no-ssr>
                <Twitter />
              </no-ssr>
            </div>
          </div>
        </div>
    -->



    <div class="">
      <div class="_grid-3-1">
        <!-- 
        <div class="StreamCard _grid-1-6">
          <div class="StreamCard-sidebar">
            <img class="cnt _block _left" src="/cnt.png" width="100px" alt="Capsid and Tail" />
          </div>
          <div class="StreamCard-main _margin-bottom">
            <CapsidStub :issues="latest" :is-featured="true" class="_section-article _margin-center" />
            <CapsidMicroBanner class="CapsidBanner" />
            <FormCapsidFeedback class=""/>
          </div>
        </div> -->
        
        <div class="Stream">

          <StreamCard>
            <div slot="sidebar" width="100">
              <img class="cnt _block _left _margin-center" src="/phagefutures.png" width="80px" alt="Phage Futures" >
            </div>
            <div slot="main">
              Phage Futures content here / card here?
            </div>
          </StreamCard>

          <StreamCard>
            <div slot="sidebar" width="100">
              <img class="cnt _block _left" src="/cnt.png" width="100px" alt="Capsid and Tail" >
            </div>
            <div slot="main">
              <CapsidStub :issues="latest" :is-featured="true" class="_section-article _margin-center" />
              <!-- <CapsidBanner /> -->
              <CapsidMicroBanner class="CapsidBanner" />
              <FormCapsidFeedback class=""/>
            </div>
          </StreamCard>
        </div>

        <div class="">
          <no-ssr>
            <Twitter />
          </no-ssr>
        </div>

      </div>
    </div>

  </div>
</template>




<script>

import Twitter from '~/components/Twitter.vue'
// import FormVomFeedback from '~/forms/FormVomFeedback.vue'
import FormCapsidFeedback from '~/forms/FormCapsidFeedback.vue'
import SignupCapsid from '~/components/SignupCapsid.vue'
import CapsidBanner from '~/components/CapsidBanner.vue'
import CapsidMicroBanner from '~/components/CapsidMicroBanner.vue'
import CapsidStub from '~/components/CapsidStub.vue'
import StreamCard from '~/components/StreamCard.vue'

import { mapState } from 'vuex'
// import Cytosis from 'cytosis'
// import Cytosis from '~/other/cytosis'
export default {

  components: {
    Twitter,
    // FormVomFeedback,
    FormCapsidFeedback,
    SignupCapsid,
    CapsidStub,
    CapsidMicroBanner,
    CapsidBanner,
    StreamCard
  },

  layout: 'contentframe',
  middleware: 'pageload',

  // async asyncData({app, env, route, store}) {
  async asyncData({app, env, store}) {
    // console.log('asyncdata store: ', store.state.cytosis)
    // const cytosis = await store.dispatch('loadCytosis', {
    //   env,
    //   tableIndex: 'static',
    // })


    // let newsData
    if(store.state && !store.state['C&T']) {
      // console.log('load cytosis: news')
      await store.cache.dispatch('loadCytosis', { // maybe don't want other things to wait?
        env,
        tableIndex: 'latestnews',
        caller: 'homepage',
        options: {
          maxRecords: 1,
          sort: [{field: "Issue", direction: "desc"}],
        }
      })
    }

    return {
      postUrl: env.ext_handler,
      cytosis: store.state.cytosis,
      intro: app.$cytosis.find('Content.home-intro-new', store.state.cytosis.tables)[0]['fields']['Markdown'],
      capsidTitle: app.$cytosis.find('Content.capsid-title', store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  data: function () {
    // console.log('data cyt:', this.$store.state.cytosis) 
    return {
      // cytosis: this.$store.state.cytosis,
    }
  },
  
  computed: {
    ...mapState([
      'Content',
      'C&T',
      ]),
    latest() {
      // NOTE: this always pulls the TOP item from airtable. Make sure it's the right one!
      return [this['C&T'][0]] // return an array of the first issue only
    },

  },

  mounted: function () {
  },

  methods: {
    // rawContent(findStr) {
    //   // return this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : ''

    //   // return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    // },
    // content(findStr) {
    //   console.log ('cczzzzcc', this.cytosis, orange.find)
    //   // console.log ('???', this.$store.state.cytosis.get('recX0na4jnDb3ThuZ' ))
    //   if (!this.cytosis.find) { // wait for init
    //     console.log('no cytosis?', this.cytosis,)
    //     return ''
    //   }

    //   const record = this.cytosis.find(findStr)[0]
    //   if(record.fields.Markdown) {
    //     return this.$md.render( record.fields.Markdown )
    //   }

    //   return this.Content[0].fields.Markdown // if error
    // }
  },


}
</script>

<style>
</style>




  <!-- 
          <h1 class="Home-title title">
            Phage Directory is
          </h1>

          1. Goal is to make phage therapy a reality
          2. Science-backed
          3. Get phage researchers together to improve phage therapy 

          <div class="Home-tag">
            a directory of researchers 
            <s>fighting antibiotic resistance with phages.</s>

            Our antibiotics are failing. 
            People are dying of drug-resistant infections.
            But there is hope.

            Phage therapy—a way of treating infections with bacteria-killing viruses called bacteriophages—is difficult, personalized, and needs researchers, medical professionals, governments, and families to work together.

            Phage Directory connects the right people to 
            safely bring the right phages to 
            patients who need them.

            — @phagedirectory

          </div>
          <div class="Home-boxes _grid-3">
            <div>Make phage therapy a reality</div>
            <div>Towards phage research</div>

            working together to accelerate phage research towards making phage therapy a reality
          </div>

          Our mission, goals, and how we're getting there

          <div class="_card">
            Join the fight message
          </div>
           -->
