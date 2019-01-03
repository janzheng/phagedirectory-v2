<template>
  <ContentFrame class="Design container">
    <section class=" copy">

      <!-- header -->
      <div class="_grid-1-5">
        <div></div>
        <div>
          <h1>Design Guide</h1>
        </div>
      </div>

      <!-- body -->
      <div class="_grid-1-5">

        <div class="SideNav _sidebar">
          <div class="_sidebar-content">
            <router-link href="#typography" to="#typography">Typography</router-link>
            <router-link href="#forms" to="#forms">Forms</router-link>
          </div>
        </div>


        <div class="Design-content">
          <div id="typography" class="Design-Typography _content">
            <h6>typography</h6>

            <h1 class="">h1. Headline</h1>
            <h2 class="">h2. Sub Heading</h2>
            <h3 class="">h3. Section Header</h3>
            <h4 class="">h4. Sub Section Header</h4>
            <h5 class="">h5. Paragraph Header</h5>
            <h6 class="">h6. Micro Header</h6>
          </div>


          <div id="forms" class="Design-Forms _content">
            <h6>forms</h6>

            <h1 class="">h1. Headline</h1>
            <h2 class="">h2. Sub Heading</h2>
            <h3 class="">h3. Section Header</h3>
            <h4 class="">h4. Sub Section Header</h4>
            <h5 class="">h5. Paragraph Header</h5>
            <h6 class="">h6. Micro Header</h6>
          </div>

        </div>
      </div>
    </section>
  </ContentFrame>
</template>

<script>

import ContentFrame from '~/components/ContentFrame.vue'

import { cytosis } from '~/assets/helpers.js'

export default {

  components: {
    ContentFrame
  },

  middleware: 'pageload',
  
  asyncData({ env, store, params }) {
    cytosis(env, store).then((result) => {
      console.log('result:', result)
    })
  },

  data: function () {
    console.log('policies data:', this.cytosis)
    return {
      // content: this.$store.state.Content,
    }
  },



  methods: {
  }

}
</script>

<style lang="scss" scoped>

</style>

