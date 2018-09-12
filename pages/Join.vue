<template>

  <ContentFrame class="Join">
    <section class="narrow copy" >
      <div class="Join-intro" v-html="content('Content.join-intro')">
        <h1 class="Join-title title">
          Join
        </h1>
        <div class="Join-desc">
          Why join? What is this for?
          Explanation for doctors, medical professionals.
          What do you get when you join?
          What can you provide the research and phage therapy community?
        </div>
      </div>
    </section>


    <div class="Join-options _padding-2" v-if="mode=='select'" 
         :class="JoinOptionsClasses"
    >
      <div class="Join-research Join-grid _card" v-if="find('Content.join-research-form').get('isPublished')">
        <div class="_margin-bottom" v-html="content('Content.join-research')"></div>
        <div class="Join-cta _button Directory-btn _width-full" v-html="rawContent('Content.join-cta')" @click="mode='research'">CTA</div>
      </div>

      <div class="Join-lab Join-grid _card" v-if="find('Content.join-lab-form').get('isPublished')">
        <div class="_margin-bottom" v-html="content('Content.join-lab')"></div>
        <div class="Join-cta _button Directory-btn _width-full" v-html="rawContent('Content.join-cta')" @click="mode='lab'">CTA</div>
      </div>

      <div class="Join-industry Join-grid _card" v-if="find('Content.join-industry-form').get('isPublished')">
        <div class="_margin-bottom" v-html="content('Content.join-industry')"></div>
        <div class="Join-cta _button Directory-btn _width-full" v-html="rawContent('Content.join-cta')" @click="mode='industry'">CTA</div>
      </div>
    </div>

    <section class="narrow copy Join-form" v-if="mode!=='select'">
      <div class="Join-back _button --short Directory-btn" @click="mode='select'">Back</div>
      <FormVomIndustry :postUrl="postUrl" v-if="mode=='industry'" />
      <FormVomLab :postUrl="postUrl" v-if="mode=='lab'" />
      <FormVomResearch :postUrl="postUrl" v-if="mode=='research'" />
    </section>

<!-- 
      <div class="Join-cta _grid-2">
        <div>Researchers</div>
        <div>Medical professionals</div>
        <div>Patients</div>
      </div>

      <div class="Join-message">
        the join now / fight message
      </div> -->

  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import { cytosis } from '~/assets/helpers.js'

import FormVomIndustry from '~/forms/FormVomIndustry.vue'
import FormVomLab from '~/forms/FormVomLab.vue'
import FormVomResearch from '~/forms/FormVomResearch.vue'

export default {

  components: {
    ContentFrame,
    FormVomIndustry,
    FormVomLab,
    FormVomResearch
  },

  // middleware: 'pageload',

  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      postUrl: env.ext_handler,
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },


  created: function () {
  },

  data: function () {
    return {
      cytosis: this.$store.cytosis,
      mode: 'select'
    }
  },

  mounted: function () {
  },

  computed: {
    JoinOptionsClasses: function() {
      let count = 0
      console.log('what:', this.find('Content.join-research-form').get('isPublished'))
      if (this.find('Content.join-research-form').get('isPublished'))
        count++
      
      if (this.find('Content.join-lab-form').get('isPublished'))
        count++

      if (this.find('Content.join-industry-form').get('isPublished'))
        count++

      if(count == 3)
        return '--three'

      if(count == 2)
        return '--two'

      if(count == 1)
        return '--one'
    }
  },
  methods: {
    rawContent(findStr) {
      return this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
    },
    content(findStr) {
      if(!this.cytosis)
        return ''

      let content = this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
      content = content || '' // the field could be null
      return this.$md.render(content)
    },
    find(findStr) {
      return this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0] : undefined
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

