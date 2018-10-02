
<!-- 

  Dedicated page for Mailchimp subscriptions (good for sharing)

 -->

<template>
  <div>
    
    <MailchimpBanner class="_margin-center _margin-top-2 _margin-bottom-2" />
    
  </div>
</template>

<script>

import MailchimpBanner from '~/components/MailchimpBanner.vue'
import { mapState } from 'vuex'


export default {

  components: {
    MailchimpBanner,
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

