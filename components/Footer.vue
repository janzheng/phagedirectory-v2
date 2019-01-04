<template>
  <div class="Footer --antialiased">
    <section class="Content _grid-1-2 _padding-left _padding-right _margin-center">

      <div class="Footer-left _center-xs">
        <router-link to="/" >
          <!-- <img class="phagedirectory-logo--sm" src="~/static/ico_rings.png"/> -->
          <img class="Footer-logo" src="~/static/phagedirectory_negative.png" >
          <!-- <span class="phagedirectory"><span>Phage</span> Directory, </span> -->
          <!-- <span class="_font-small">2017-{{thisYear}}</span> -->
        </router-link>
        <!-- </router-link> -->
      </div>

      <!-- margin-right is for avoiding the drift box -->
      <div class="Footer-right _center-xs">
        <div class="_margin-bottom _right-sm _center-xs">
          <span class="_margin-right "><router-link to="/about">About</router-link></span>
          <span class="_margin-right "><router-link to="/contact">Contact</router-link></span>
          <span class="_margin-right "><router-link to="/classroom">Classroom</router-link></span>
          <span class="_margin-right "><router-link to="/brand">Brand</router-link></span>
          <span class=" "><router-link to="/policies">Site Policy</router-link></span>
        </div>

        <div class="_right-sm _center-xs">
          <span class="_margin-right _block-xs _margin-bottom-half-xs">
            <a target="_blank" href="mailto:hello@phage.directory">hello@phage.directory</a>
          </span>
          <span class=" _block-xs ">
            <a target="_blank" href="https://twitter.com/phagedirectory">@phagedirectory</a>
          </span>
        </div>
      </div>
    </section>
  </div>
</template>


<script>


export default {

  components: {
  },

  computed: {
    thisYear() {
      let date = new Date
      return date.getFullYear()
    }
  },


}
</script>

<style lang="scss" scoped>
</style>
