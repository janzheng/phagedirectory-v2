<template>

  <article class="Home Projects container">
    <Header/>

    <section class="_center copy">

      <div class="Home-title _padding-bottom">
        <div class="buildatl --h1 ">
          <span class="_font-bold">Make a <span class="_links-bg">difference</span> to </span> 
          <img class="logo-sm" src="~/static/atl.png"/>
        </div>
        <div class="subtitle" v-html="$md.render(getContent('Home-Intro'))">
        </div>
      </div>

    </section>

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

    <section class="narrow copy">
      <Message/>
    </section>

    <Footer/>
  </article>
</template>




<script>

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Message from '~/components/Message.vue'

import {fetchCytosis, getCytosis} from '~/assets/helpers.js'


export default {

  components: {
    Header,
    Footer,
    Message
  },

  data: function () {
    return {
      projects: this.$store.state.Projects,
      content: this.$store.state.Content,
      orgs: this.$store.state.Organizations,
      skills: this.$store.state.Skills,
      tags: this.$store.state.Tags,
      blog: this.$store.state.Blog,
    }
  },

  async fetch({ store, params }) {
    return fetchCytosis(store, params)
  },

  mounted: function () {
    const _this = this
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      console.log('Data Loaded: ', _this)
    })
  },

  methods: {
    getContent: function(findStr) {
        console.log('gC:', findStr, this.content)
      let obj = ''
      if(this.content) {
        obj = getCytosis().find(findStr, [this.content])[0]['fields']['Markdown']
      }
      return obj
    },
    getSkills: function(skills) {
      if(this.skills && skills) {
        const _skills = getCytosis().getLinkedRecords(skills, this.skills)
        // console.log('skills:' , skills, this.skills, _skills)
        return _skills
      }
    }


  }

}
</script>

<style>
</style>
