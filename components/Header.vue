
<template>
  <section class="Header _padding-top _padding-bottom --antialiased _width-content-max _margin-center">
    <div class="Header-content">

      <!-- Mobile Menu -->
      <div class=" _center-xs _align-vertically">
        <!-- <router-link to='/' class="_hidden-xs logo-link _border-none-i"><img class="logo" src="~/static/ico.png"/></router-link> -->

        <div class="Header-left _hidden-sm">
          <div class="_flex _left-xs _align-vertically _margin-bottom">
            <router-link to='/' class=" logo-link _border-none-i"><img class="logo-xs" src="~/static/snow.png"/></router-link>
            <router-link to='/phages' class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">Phages</router-link>
            <!-- <router-link to='/labs' class="_button --text --short _padding-none _margin-none _hidden-xs --border-none">Labs</router-link> -->
            <router-link to='/alerts' class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">Alerts</router-link>
            <router-link to='/jobs' class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">Jobs</router-link>
            <router-link to='/capsid' class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">C&amp;T</router-link>
            <router-link to='/join' class="Header-join _button --short _margin-none">Join</router-link>
          </div>
          <div>
            <input ref="headerSearch" v-model.trim="searchString" class="Header-search _form-input --width-full _inline " type="text" name="searchbar" id="searchbar" placeholder="Search" @input="search"/>
          </div>
        </div>

      </div>


      <!-- Desktop menu -->
        <div class="Header-left _hidden-xs _padding-left-2 _padding-right-2">
          <div class="_flex _left-xs _align-vertically _margin-bottom">
            <router-link to='/' class=" logo-link _border-none-i"><img class="logo-xs" src="~/static/snow.png"/></router-link>
            <div class="Header-inset">
              <router-link to='/phages' class="_button --text --short _padding-none _margin-none --border-none">Phages</router-link>
              <router-link to='/labs' class="_button --text --short _padding-none _margin-none _hidden-xs --border-none">Labs</router-link>
            </div>
            <router-link to='/alerts' class="_button --text --short _padding-none _margin-none --border-none">Alerts</router-link>
            <router-link to='/jobs' class="_button --text --short _padding-none _margin-none --border-none">Jobs</router-link>
            <router-link to='/capsid' class="_button --text --short _padding-none _margin-none _margin-right-sm --border-none">Capsid &amp; Tail</router-link>
            <router-link to='/join' class="Header-join _button --short _margin-none">Join</router-link>
          </div>
          <div>
            <input ref="headerSearch" v-model.trim="searchString" class="Header-search _form-input --width-full _inline" type="text" name="searchbar" id="searchbar" placeholder="Search" @input="search"/>
          </div>
        </div>
      <!-- <div class="_hidden-xs _right-sm _margin-top-xs">
        <router-link to='/alerts' class="_margin-right --border-none">Alerts</router-link>
        <router-link to='/jobs' class="_margin-right --border-none">Jobs</router-link>
        <router-link to='/capsid' class="_margin-right --border-none">Capsid &amp; Tail</router-link>
        <router-link to='/join' class="Header-join _button --short _margin-none">Join</router-link>
      </div> -->
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
  width: 45px; //34px;
  // top: 3px;
  // margin-right: 16px;
  vertical-align: bottom;
}

</style>


