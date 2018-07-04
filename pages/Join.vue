<template>

  <ContentFrame class="Join">
    <section class="narrow copy">

      <div class="Join-intro">
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


      <div class="Join-cta _grid-2">
        <div>Researchers</div>
        <div>Medical professionals</div>
        <!-- <div>Patients</div> -->
      </div>

      <div class="Join-message">
        the join now / fight message
      </div>

    </section>
  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'
import Article from '~/components/Article.vue'

export default {

  components: {
    ContentFrame,
    Article
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

