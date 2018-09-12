<template>
  <div class="VomJoin Lab _card">
    <Form class=""
          :intro="rawContent('join-lab-form')"
          source="join-lab-form"
          :cta="rawContent('join-form-cta')"
          :thanks="rawContent('join-form-thanks')"

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

