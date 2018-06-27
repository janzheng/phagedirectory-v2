

<template>
  <div class="Policy _grid-4-2-xs _align-vertically" v-if="policy!='1.0.0'">
    <div class="">
      We use cookies for site analytics, but we don’t track your personal data. Read our <router-link to="/policies">site policies</router-link>.
    </div>

    <div class="_right">
      <div class="_button --short _margin-none" @click="acceptPolicy" >
        Close
      </div>
    </div>
    
  </div>
</template>


<script>

export default {

  data: function () {
    return {
      policy: false,
    }
  },

  mounted: function () {
    this.policy = localStorage.getItem('pd-policy', this.policy)
    // console.log('Message beforeCreate', this.policy)
  },

  methods: {
    acceptPolicy: function() {
      this.policy = localStorage.setItem('pd-policy', '1.0.0')
      this.policy = '1.0.0'
    }
  },

  computed: {
  }

}
</script>



<style lang="scss" scoped>

</style>


