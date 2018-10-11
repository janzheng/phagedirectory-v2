<template>

  <section class="AnonFeedback container narrow copy _margin-center">
    <FormCapsidFeedback />
  </section>
</template>

<script>

import FormCapsidFeedback from '~/forms/FormCapsidFeedback.vue'
import FormVomFeedback from '~/forms/FormVomFeedback.vue'

export default {

  components: {
    // FormVomFeedback
    FormCapsidFeedback
  },

  layout: 'contentframe',
  middleware: 'pageload',

  async asyncData({ app, store, env, params }) {
    return {
    }
  },


  created: function () {
  },

  data: function () {
    return {
    }
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

