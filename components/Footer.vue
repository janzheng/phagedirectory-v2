<template>
  <div class="Footer container">
    <section class="_grid-2 _align-vertically">
      <div class="_center-xs">
        <router-link class="" to="/">
          <img class="phagedirectory-logo--sm" src="~/static/ico_rings.png"/>
          <span class="phagedirectory"><span>Phage</span> Directory, </span>
          <span class="_font-small">2017-{{thisYear}}</span>
        </router-link>
      </div>

      <div class="_center-xs">
        <div class="_margin-bottom-half _right-sm _center-xs">
          <span class="_margin-right "><router-link to="/mission">Our Mission</router-link></span>
          <span class="_margin-right "><router-link to="/about">About Us</router-link></span>
          <span class=" "><router-link to="/policies">Site Policy</router-link></span>
        </div>
        <div class="_right-sm _center-xs">
          <span class="_margin-right ">
            <!-- <i class="fa far fa-envelope _margin-right-half"></i> -->
            <a target="_blank" href="mailto:hello@phage.directory">hello@phage.directory</a>
          </span>
          <span>
            <!-- <i class="fa far fa-twitter _margin-right-half"></i> -->
            <a target="_blank" href="https://twitter.com/phagedirectory">@phagedirectory</a>
          </span>
          <!-- <span>
            <router-link to="/design#forms">design</router-link>
          </span> -->
        </div>
      </div>
    </section>
  </div>
</template>


<script>

export default {

  props: [],

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
