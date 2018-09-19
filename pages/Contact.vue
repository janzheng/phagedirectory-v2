<template>
  <section class="Contact container narrow copy _margin-center">
    <FormContact />
  </section>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import FormContact from '~/forms/FormContact.vue'

export default {

  components: {
    ContentFrame,
    FormContact
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

