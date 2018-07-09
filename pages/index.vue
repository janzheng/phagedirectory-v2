<template>

  <ContentFrame class="Home">

    <section class="narrow copy">

      <div class="Home-intro" v-html="content('Content.home-intro')">
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
      </div>

      <hr />

      <div class="Home-media">
        <Twitter />
      </div>
      <!-- 
      <div class="Home-media _grid-2">
        <div>
          News service
        </div>
        <div>
          <Twitter />
        </div>
      </div>

      <hr />
 -->
    </section>
<!-- 
    <section class="max">
      <div class="_card-container _grid-3">
        <div class="_card" v-for="proj in projects" v-if="proj.fields.isPublished" :key="proj.id">

          <router-link :to="{ path: `projects/${proj.fields.slug}`}">

            <div class="_card-upper">
              <div class="_card-image-container" v-if="proj.fields.Image">
                <img class="_card-image" :src="proj.fields.Image[0].thumbnails.large.url"
                     :width="proj.fields.Image[0].thumbnails.large.width"
                />
              </div>
              <div class="_grid-3-2-xs">
                <div class="_card-type">{{proj.fields.Type}}</div>
                <div class="_card-duration _right">{{proj.fields.Duration}}</div>
              </div>
              
              <div class="_card-title">{{proj.fields.Name}}</div>
              <div class="_card-description">{{proj.fields.ShortDescription}}
              </div>
            </div>
            <div class="_card-lower">
              <div class="_card-bottom _align-bottom">
                <div class="_card-tags">
                  <span class="_tag" v-for="skill of getSkills(proj.fields.Skills)" :key='skill'>{{skill}}</span>
                </div>

                <div class="_grid-2-xs _align-vertically _margin-top-half _margin-bottom-half">
                  <div class="_button _center --short --yellow _margin-none ">Details</div>
                  <div class="_font-serif _font-italic" v-if="proj.fields.Bounty">
                    {{proj.fields.Bounty}}
                  </div>
                </div>
              </div>


            </div>

          </router-link>

        </div>
      </div>
    </section>
 -->
 
  </ContentFrame>
</template>




<script>

import ContentFrame from '~/components/ContentFrame.vue'
import Twitter from '~/components/Twitter.vue'

// import {fetchCytosis, getCytosis} from '~/assets/helpers.js'
import { cytosis } from '~/assets/helpers.js'


export default {

  components: {
    ContentFrame,
    Twitter
  },

  middleware: 'pageload',
  
  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    // console.log('store cytosis: ' , store.state)
    return {
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
    content(findStr) {
      let content = this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
      return this.$md.render(content)
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
