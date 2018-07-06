

<template>
  <div class="Policy _grid-1-auto-xs _align-vertically" v-if="policy!=currentPolicy">
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

export default {

  data: function () {
    return {
      policy: false,
      currentPolicy: '', 
      // 1.0.1 7/1/18 updated w/ targeted ads msg from the verge
    }
  },

  fetch ({ store, params, env }) {
    this.currentPolicy = env.site_policy
  },

  mounted: function () {
    this.policy = localStorage.getItem('pd-policy', this.policy)
    this.$store.commit('setPolicy', this.policy)
    // console.log('Message beforeCreate', this.policy)

    if(this.policy!=this.currentPolicy) {
      this.$store.commit('setPolicy', undefined)
    }
  },

  methods: {
    acceptPolicy: function() {
      this.policy = localStorage.setItem('pd-policy', this.currentPolicy)
      this.policy = this.currentPolicy
      this.$store.commit('setPolicy', this.policy)
    }
  },

  computed: {
  }

}
</script>



<style lang="scss" scoped>

</style>


