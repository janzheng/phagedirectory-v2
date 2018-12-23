<template>
  <section class="Contact container narrow copy _margin-center">
    <FormContact />
  </section>
</template>

<script>

import FormContact from '~/forms/FormContact.vue'

export default {
  head () {
    const title = "Contact Us"

    return {
      title,
    }
  },

  components: {
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

