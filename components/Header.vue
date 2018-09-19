
<template>
  <section class="Header _padding-top _padding-bottom --antialiased _width-content-max _margin-center">
    <div class="Header-content _grid-2--auto _block-xs _align-vertically">
      <div class="_grid-auto-1 _center-xs _align-vertically">
        <!-- <router-link to='/' class="logo-link _border-none-i"><img class="logo" src="~/static/phagedirectory.png"/></router-link> -->
        <router-link to='/' class="_hidden-xs logo-link _border-none-i"><img class="logo" src="~/static/ico.png"/></router-link>

        <div class="Header-left">
          <div class="_grid-auto-1 _align-vertically">
            <div class="_left-xs">
              <router-link to='/' class="_hidden-sm logo-link _border-none-i"><img class="logo-xs" src="~/static/ico.png"/></router-link>
              <!-- <router-link to='/' class="_margin-right-2-sm _margin-right-xs --border-none">Browse</router-link> -->
              <router-link to='/phages' class="_margin-right-sm _margin-right-xs --border-none">Phages</router-link>
              <router-link to='/labs' class="_margin-right-xs _hidden-xs --border-none">Labs</router-link>
              <router-link to='/alerts' class="_hidden-sm _margin-right-sm _margin-right-xs --border-none">Alerts</router-link>
              <router-link to='/news' class="_hidden-sm _margin-right-sm _margin-right-xs --border-none">News</router-link>
              <router-link to='/join' class="Header-join --short _hidden-sm _button _margin-none">Join</router-link>
            </div>
            <input ref="headerSearch" v-model.trim="searchString" class="Header-search _form-input --width-full _inline" type="text" name="searchbar" id="searchbar" placeholder="Search" @input="search"/>
          </div>
          
        </div>
      </div>

      <div class="_hidden-xs _right-sm _margin-top-xs">
        <!-- <router-link to='/' class="--border-none _margin-right-2" :class="{'nuxt-link-exact-active':Projects==true}">Projects</router-link> -->
          <!-- <router-link to='/terms' class="_margin-right-2 --border-none">Terms</router-link> -->
        <router-link to='/alerts' class="_margin-right --border-none">Alerts</router-link>
        <router-link to='/news' class="_margin-right --border-none">News</router-link>
        <router-link to='/join' class="Header-join _button --short _margin-none">Join</router-link>
        <!-- <a target="_blank" href="https://twitter.com/phagedirectory" class="">@PhageDirectory</a> -->
      </div>
    </div>
  </section>
</template>


<script>
export default {
  data: function () {
    return {
      // searchString: this.$store.state.search.string,
    }
  },

  computed: {
    searchString: {
      get: function () {
        return this.$store.state.searchString
      },
      // setter
      set: function (str) {
        const url = `/search/${this.searchString}`
        this.$store.dispatch('updateCreate', {
          searchSource: 'header',
          searchString: str || '',
          searchUrl: url,
        })
      }
    }
  },

  methods: {
    search(str) {
      console.log('handling search:',this.searchString)
      // const url = `/search/${this.searchString}`
      const url = `/phages`
      // console.log('search url:', url, '?', this.$router.history)
      // $router history push forces a page reload... use window to replace
      // store the searchstring into store?
      if(this.searchString != '')
        this.$router.replace(url)

      // window.location = url;
      // this.$store.dispatch('updateCreate', {
      //   search: {
      //     string: this.searchString,
      //     url: url
      //   }
      // })
    }
  }
}
</script>

<style lang="scss" scoped>

.logo {
  position: relative;
  width: 45px;
  top: 3px;
}

.logo-xs {
  position: relative;
  width: 34px;
  top: 3px;
  margin-right: 16px;
  vertical-align: bottom;
}

</style>


