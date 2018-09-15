

<template>
  <div class="Policy _grid-1-auto-xs _align-vertically" v-if="!policy">

    <div class="">
      <!-- We use cookies for site analytics and customer service, but we don’t track your personal data.  -->
      We use cookies to improve our site, and to understand where people are visiting from. We don’t use targeted ads or track personal information.

      Read our <router-link to="/policies">site policies here</router-link>.
    </div>

    <div class="_right">
      <div class="Policy-btn _button --short _margin-none" @click="acceptPolicy" >
        I accept
      </div>
    </div>
    
  </div>
</template>


<script>

import { mapState } from 'vuex'

export default {

  data: function () {
    return {
    }
  },

  mounted: function () {
  },

  methods: {
    acceptPolicy: function() {
      localStorage.setItem('pd-policy', this.$store.state.currentPolicy)
      this.$store.commit('updatePolicy')
      this.policy = this.$store.state.currentPolicy
    }
  },

  computed: {
    policy() {
      if(this.$store.state.policy == this.$store.state.currentPolicy) {
        return this.$store.state.policy
      }
      return false
    }
    // ...mapState([
    //   'policy',
    //   ]),
  }

}
</script>



<style lang="scss" scoped>

</style>


