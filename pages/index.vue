<template>

  <div class="Home">

    <section class="Home-intro Home-container copy " v-html="$md.render(intro || '')">
    </section>

    <section class="">
      <MailchimpBanner />
    </section>
    
    <section class="Home-container copy _grid-3-1">
      <div>
        <FormCapsidFeedback class=""/>
      </div>

      <div>
        <div class="Home-media">
          <no-ssr>
            <Twitter />
          </no-ssr>
        </div>
      </div>
    </section>
 
  </div>
</template>




<script>

import Twitter from '~/components/Twitter.vue'
import FormVomFeedback from '~/forms/FormVomFeedback.vue'
import FormCapsidFeedback from '~/forms/FormCapsidFeedback.vue'
import Mailchimp from '~/components/Mailchimp.vue'
import MailchimpBanner from '~/components/MailchimpBanner.vue'

import { mapState } from 'vuex'
// import Cytosis from 'cytosis'
// import Cytosis from '~/other/cytosis'
export default {

  components: {
    Twitter,
    // FormVomFeedback,
    FormCapsidFeedback,
    Mailchimp,
    MailchimpBanner,
  },

  layout: 'contentframe',
  // middleware: 'pageload',

  async asyncData({app, env, route, store}) {
    // console.log('asyncdata store: ', store.state.cytosis)
    // const cytosis = await store.dispatch('loadCytosis', {
    //   env,
    //   tableIndex: 'static',
    // })
    return {
      postUrl: env.ext_handler,
      cytosis: store.state.cytosis,
      intro: app.$cytosis.find('Content.home-intro-new', store.state.cytosis.tables)[0]['fields']['Markdown']
    }
  },

  data: function () {
    // console.log('data cyt:', this.$store.state.cytosis) 
    return {
      // cytosis: this.$store.state.cytosis,
    }
  },
  
  mounted: function () {
  },

  computed: {
    ...mapState([
      'Content',
      ]),

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
