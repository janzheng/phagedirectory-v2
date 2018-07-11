<template>
  <div class="VomFeedback _card">
    <Form class=""
          :intro="rawContent('vomfeedback-intro')"
          source="vomfeedback-form"
          :cta="rawContent('vomfeedback-cta')"
          :thanks="rawContent('vomfeedback-thanks')"

          privacy="privacy-forms"
          errorMsg="Something went wrong, please try again"
          table="Dynamic"
          :postUrl="postUrl"
          :alert="true"
    >
    </Form>
  </div>
</template>

<script>

import Form from '~/components/Form.vue'
import { cytosis } from '~/assets/helpers.js'

export default {

  props: ['postUrl'],
  components: {
    Form,
  },

  middleware: 'pageload',
  
  async asyncData({ app, store, env, params }) {
    let _cytosis = store.cytosis ? store.cytosis : await cytosis(env, store)
    return {
      // postUrl: 'https://wt-ece6cabd401b68e3fc2743969a9c99f0-0.sandbox.auth0-extend.com/phdir-input',
      cytosis: _cytosis,
      ... _cytosis.tables
    }
  },

  data: function () {
    return {
      cytosis: this.$store.state.cytosis,
    }
  },


  computed: {
  },


  methods: {
    rawContent(findStr) {
      return this.cytosis.find(findStr)[0] ? this.cytosis.find(findStr)[0].fields.Markdown : ''
    },
    content(findStr) {
      return this.$md.render( this.cytosis.find(findStr)[0] && this.cytosis.find(findStr)[0].fields.Markdown ? this.cytosis.find(findStr)[0].fields.Markdown : '')
    },

  }

}
</script>

<style lang="scss" scoped></style>

