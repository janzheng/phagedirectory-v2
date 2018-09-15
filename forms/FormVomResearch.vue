<template>
  <div class="VomJoin Research _card">
    <Form class=""
          :intro="intro"
          :source="source"
          :cta="cta"
          :thanks="thanks"

          :privacy="privacy"
          errorMsg="Something went wrong, please try again"
          table="Dynamic"
          :postUrl="postUrl"
          :alert="true"
          :json="true"
          notes="FormVomResearch submission"
    >
    </Form>
  </div>
</template>

<script>

import Form from '~/components/Form.vue'
import { cytosis } from '~/assets/helpers.js'

export default {

  props: ['postUrl', 'intro', 'source', 'cta', 'thanks', 'privacy'],
  components: {
    Form,
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

