<template>

  <ContentFrame class="Mission container">
    <section class="narrow copy">
      <h1 class="Mission-title title">
        Mission
      </h1>

    </section>
  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
export default {

  components: {
    ContentFrame
  },

  middleware: 'pageload',

  data: function () {
    return {
      // content: this.$store.state.Content,
    }
  },

  mounted: function () {
  },


  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

