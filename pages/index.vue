<template>

  <ContentFrame class="Home">

    <section class="Home-intro Home-container max copy _padding-2" v-html="content('Content.home-intro')">
    </section>
    <section class="Home-container max copy _padding-2 _grid-3-1">
      <div>
        <FormVomFeedback :postUrl="postUrl" class=""/>
      </div>

      <div>
        <div class="Home-media">
          <Twitter />
        </div>
      </div>
    </section>
 
  </ContentFrame>
</template>




<script>

import ContentFrame from '~/components/ContentFrame.vue'
import Twitter from '~/components/Twitter.vue'
import FormVomFeedback from '~/forms/FormVomFeedback.vue'

// import {fetchCytosis, getCytosis} from '~/assets/helpers.js'
import { cytosis } from '~/assets/helpers.js'


export default {

  components: {
    ContentFrame,
    Twitter,
    FormVomFeedback
  },

  middleware: 'pageload',
  
  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    // console.log('store cytosis: ' , store.state)
    return {
      postUrl: env.ext_handler,
      cytosis: _cytosis
    }
  },

  data: function () {
    // console.log('policies data:', this.cytosis, this)
    return {
      cytosis: this.$store.state.cytosis,
    }
  },
  
  mounted: function () {
  },

  methods: {
    rawContent(findStr) {
      return this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : ''

      // return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    },
    content(findStr) {
      // let content = this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
      // return this.$md.render(content)
      return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    }
    // getContent: function(findStr) {
    //     console.log('gC:', findStr, this.content)
    //   let obj = ''
    //   if(this.content) {
    //     obj = getCytosis().find(findStr, [this.content])[0]['fields']['Markdown']
    //   }
    //   return obj
    // },
    // getSkills: function(skills) {
    //   if(this.skills && skills) {
    //     const _skills = getCytosis().getLinkedRecords(skills, this.skills)
    //     // console.log('skills:' , skills, this.skills, _skills)
    //     return _skills
    //   }
    // }


  }

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
