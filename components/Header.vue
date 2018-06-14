
<template>
  <section class="Header container">
    <div class="_grid-2 _align-vertically">
      <div class="_center-xs">
        <router-link to='/' class="logo-link _border-none-i"><img class="logo" src="~/static/phagedirectory.png"/></router-link>
      </div>

      <div class="_center-xs _right-sm">
        <span class="_margin-right-2">
          <router-link to='/' class="--border-none" :class="{'nuxt-link-exact-active':Projects==true}">Projects</router-link>
        </span>
        <span class="_margin-right-2">
          <router-link to='/orgs' class="Header-orgs --border-none">Orgs</router-link>
        </span>
        <span>
          <router-link to='/about' class="--border-none">Mission</router-link>
        </span>
      </div>
        <!-- <span><a href=""><i class="fa fas far fa-email"></i></a>hello@buildatl.com</span>
        <span><a href=""><i class="fa fas far fa-twitter"></i></a>@buildatl</span>
      </span> -->
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
  width: 250px;
  // height: 100%;
}

</style>
