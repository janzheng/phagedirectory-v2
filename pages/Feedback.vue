<template>

  <section class="AnonFeedback _section-page _margin-center">
    <div class="_section-content _margin-center">
      <FormCapsidFeedback />
    </div>
  </section>
</template>

<script>

import FormCapsidFeedback from '~/forms/FormCapsidFeedback.vue'
// import FormVomFeedback from '~/forms/FormVomFeedback.vue'

export default {

  components: {
    // FormVomFeedback
    FormCapsidFeedback
  },

  layout: 'contentframe',
  middleware: 'pageload',

  data: function () {
    return {
    }
  },

  // async asyncData({ app, store, env, params }) {
  //   return {
  //   }
  // },

  created: function () {
  },

  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

