
<!-- 

  Dedicated page for Mailchimp subscriptions (good for sharing)

 -->

<template>
  <div>
    
    <CapsidBanner class="_margin-center _margin-top-2 _margin-bottom-2" />
    
  </div>
</template>

<script>

import CapsidBanner from '~/components/CapsidBanner.vue'
import { mapState } from 'vuex'


export default {

  components: {
    CapsidBanner,
  },

  layout: 'contentframe',
  middleware: 'pageload',

  async asyncData({app, env, route, store}) {

  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  computed: {

  },

  methods: {
  }

}
</script>


<style lang="scss" scoped>

</style>

