<template>

  <ContentFrame class="About container">
    <section class="narrow copy">
      <h1 class="About-title title">
        About
      </h1>


      <div class="About-bg">
        <div class="" v-html="content('Content.about-bg')"></div>
      </div>

      <div class="About-us">
        <div class="" v-html="content('Content.about-us')"></div>
      </div>

      <div class="About-profile _card">
        <div class="" v-html="content('Content.about-jess')"></div>
      </div>

      <div class="About-profile _card">
        <div class="" v-html="content('Content.about-jan')"></div>
      </div>
<!-- 

      <div class="About-profile _card">
        <div class="_grid-1-3">
          <div class="profile-image">
            <img width="140" src="https://pbs.twimg.com/profile_images/634095676171816960/v2t4zcm5_400x400.jpg">
          </div>
          <div>
            <div class="profile-name">
              Jessica Sacher, PhD
            </div>
            <div class="profile-short">
              <div>Scientist</div>
              <div>Microbiology and Biotechnology PhD, U of Alberta</div>
            </div>
            <div class="profile-contact">
              <div>
                <a href="mailto:jessica@phage.directory" target="_blank">jessica@phage.directory</a>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-description _padding-top" >
          I am a Microbiology and Biotechnology PhD student at the University of Alberta studying the interactions between bacteriophage receptor binding proteins and bacterial carbohydrates. 

          While I am a graduate student at the University of Alberta, I currently work in Dr. Christine Szymanski's glycobiology lab at the Complex Carbohydrate Research center at the University of Georgia as an Exchange Scholar.
        </div>
      </div>


      <div class="About-profile _card">
        <div class="_grid-1-3">
          <div class="profile-image">
            <img height="140" src="http://janzheng.com/images/me.jpg">
          </div>
          <div>
            <div class="profile-name">
              Jan Zheng
            </div>
            <div class="profile-short">
              <div>Product Design &amp; Development </div>
              <div>Masters in Human-Computer Interaction, CMU</div>
            </div>
            <div class="profile-contact">
              <div>
                <a href="mailto:jan@phage.directory" target="_blank">jan@phage.directory</a>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-description">
          I'm a product designer with a background in computer science, psychology, and a Masters in Human-Computer Interaction from Carnegie Mellon University.

          In the past I've worked with companies and brands like Verizon Wireless, Cartoon Network, Coca-Cola, Microsoft, L'Oreal, and more to build and design digital products, and to improve product user experiences.
        </div>
      </div> -->


    </section>
  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import { cytosis } from '~/assets/helpers.js'

export default {

  components: {
    ContentFrame
  },

  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    console.log('store cytosis: ' , store.state)
    return {
      cytosis: _cytosis
    }
  },

  data: function () {
    return {
      // content: this.$store.state.Content,
    }
  },

  mounted: function () {
  },

  methods: {
    content(findStr) {
      if(!this.cytosis)
        return ''

      let content = this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
      content = content || '' // the field could be null
      return this.$md.render(content)
    },
  }

}
</script>

<style lang="scss" scoped>

</style>

