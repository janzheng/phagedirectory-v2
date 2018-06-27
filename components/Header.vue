
<template>
  <section class="Header container">
    <div class="_grid-3-1 _align-vertically">
      <div class="_grid-auto-1 _center-xs _align-vertically">
        <!-- <router-link to='/' class="logo-link _border-none-i"><img class="logo" src="~/static/phagedirectory.png"/></router-link> -->
        <router-link to='/' class="logo-link _border-none-i"><img class="logo" src="~/static/ico.png"/></router-link>

        <div class="Header-left">
          <router-link to='/' class="_margin-right-2 --border-none">Phages</router-link>
          <router-link to='/' class="_margin-right-2 --border-none">Labs</router-link>
          <span>Search search search</span>
        </div>
      </div>

      <div class="_center-xs _right-sm">
        <!-- <router-link to='/' class="--border-none _margin-right-2" :class="{'nuxt-link-exact-active':Projects==true}">Projects</router-link> -->
          <router-link to='/news' class="_margin-right-2 --border-none">News</router-link>
        <a target="_blank" href="https://twitter.com/phagedirectory" class="">@PhageDirectory</a>
      </div>
    </div>
  </section>
</template>


<script>
  export default {
    props: ['Projects']
  }
</script>

<style lang="scss" scoped>

.logo {
  position: relative;
  // width: 60px;
  width: 45px;
  top: 3px;
  // height: 100%;
}

</style>
