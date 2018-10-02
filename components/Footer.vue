<template>
  <div class="Footer container --antialiased">
    <section class="_grid-1-2 _align-vertically _padding-top _padding-bottom  _width-content-max _margin-center">

      <div class="Footer-left _center-xs">
        <!-- <router-link class="" to="/"> -->
        <a href="/">
          <img class="phagedirectory-logo--sm" src="~/static/ico_rings.png"/>
          <span class="phagedirectory"><span>Phage</span> Directory, </span>
          <!-- <span class="_font-small">2017-{{thisYear}}</span> -->
          <span class="_font-small">{{thisYear}}</span>
        </a>
        <!-- </router-link> -->
      </div>

      <!-- margin-right is for avoiding the drift box -->
      <div class="Footer-right _center-xs">
        <div class="_margin-bottom-half _right-sm _center-xs">
          <!-- <span class="_margin-right "><router-link to="/mission">Our Mission</router-link></span> -->
          <span class="_margin-right "><router-link to="/about">About Us</router-link></span>
          <span class="_margin-right "><router-link to="/contact">Contact Us</router-link></span>
          <span class="_margin-right "><router-link to="/updates">Updates</router-link></span>
          <span class=" "><router-link to="/policies">Site Policy</router-link></span>
        </div>
        <div class="_right-sm _center-xs">
          <span class="_margin-right _block-xs _margin-bottom-half-xs">
            <!-- <i class="fa far fa-envelope _margin-right-half"></i> -->
            <a target="_blank" href="mailto:hello@phage.directory">hello@phage.directory</a>
          </span>
          <span class=" _block-xs ">
            <!-- <i class="fa far fa-twitter _margin-right-half"></i> -->
            <a target="_blank" href="https://twitter.com/phagedirectory">@phagedirectory</a>
          </span>
          <!-- <span class="_margin-right-half _hidden-xs">
            <a target="_blank" href="https://twitter.com/phagedirectory"><i class="fa fa-fw far fa-twitter"></i></a>
          </span>
          <span class="_hidden-xs">
            <a target="_blank" href="https://www.facebook.com/phagedirectory"><i class="fa fa-fw far fa-facebook"></i></a>
          </span> -->
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

  components: {
  },
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
