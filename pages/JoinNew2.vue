<template>

  <ContentFrame class="Join">
    <section class="narrow copy" >
      <div class="Join-intro" v-html="content('Content.join-temp')">
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
  }

}
</script>

<style lang="scss" scoped>

</style>

