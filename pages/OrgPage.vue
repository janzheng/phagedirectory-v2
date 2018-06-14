<template>

  <article class="OrgPage DetailsPage container">

    <div class="loading" v-if="!org">
      <div class="_loader --circular"></div>
    </div>

    <div v-if="org">
      <Header/>

      <section class="copy">

        <div class="menu">
          <router-link to="/orgs">Organizations</router-link> / {{org.fields.Name}}
        </div>

        <div class="_grid-2-1 _width-content-max _padding-left-none">

          <div class="_dash" >

            <div class="DetailsPage-tags">
              <span class="_tag" v-for="tag of getTags(org.fields.Tags)" :key='tag'>{{tag}}</span>
            </div>

            <div class="DetailsPage-image-container _padding-top _margin-top" v-if="org.fields.Image">
              <img :src="org.fields.Image[0].thumbnails.large.url" class="DetailsPage-image" />
            </div>

            <h2 class="DetailsPage-title title _padding-top-none">
              <!-- {{ getOrg() }} -->
              {{org.fields.Name}}
            </h2>

            <div class=" _padding-bottom">
              <a class="DetailsPage-link" target="_blank" :href="org.fields.URL">{{org.fields.URL}}</a>
            </div>

            <div class="DetailsPage-description" v-if="org" v-html="$md.render(org.fields.Description)">
            </div>
          </div>

          <div class="DetailsPage-sidebar _font-sans" >
            <div class="DetailsPage-contact _dash --half --transparent" v-if="org.fields.Contact">
              <h6 class="DetailsPage-sidebar-header">Contact</h6>
              <div v-html="$md.render(org.fields.Contact)"></div>
            </div>
            <div class="DetailsPage-contact _dash --half --transparent" v-if="org.fields.Projects">
              <h6 class="DetailsPage-sidebar-header">Projects</h6>
              <div v-for="project in getProjects()" :key="project.id" v-if="project.fields.isPublished">
                <p><router-link :to="{ path: `/orgs/${project.fields.slug}`}">{{project.fields.Name}}</router-link></p>
              </div>
            </div>
            
          </div>

        </div>

        <Message/>

      </section>
      <Footer/>
    </div>

  </article>

</template>

<script>

import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Message from '~/components/Message.vue'

import {fetchCytosis, getCytosis} from '~/assets/helpers.js'



export default {

  components: {
    Header,
    Footer,
    Message
  },

  // data () {
  //   console.log("Welcome to BuildATL", this.$route, this.$route.params)
  //   return { params: this.$route.params }
  // },

  head: function () {
    if(this.org) {
      console.log('head', this.org.fields.Name)
      return {
        title: this.org.fields.Name,
      }
    }
    else {
      return {}
    }
  },

  data: function () {
    return {
      content: this.$store.state.Content,
      orgs: this.$store.state.Organizations,
      projects: this.$store.state.Projects,
      tags: this.$store.state.Tags,
      params: this.$route.params,
      org: undefined, //  {fields: ''}, // undefined initially 
    }
  },

  async fetch({ store, params }) {
    return fetchCytosis(store, params)
  },

  mounted: function () {
    const orgName = unescape(this.$route.params.id)
    console.log('orgName:', orgName, ' orgs:' , this.orgs, ' params: ', this.$route.params)
    this.org = getCytosis().find(orgName, [this.orgs], ['Name', 'slug'])[0]
  },

  methods: {
    getOrg: function() {
      return unescape(this.$route.params.id)
    },
    getProjects: function() {
      if(this.org && this.org.fields.Projects) {
        const projects = getCytosis().getLinkedRecords(this.org.fields.Projects, this.projects, true)
        // const projects = getCytosis().getLinkedRecords(this.org.fields.Projects, this.projects)
        // getLinkedRecords: function(recordIds, linkedTable
        // console.log('projects:' , projects)
        return projects
      }
    },
    getTags: function() {
      if(this.org && this.org.fields.Tags) {
        const tags = getCytosis().getLinkedRecords(this.org.fields.Tags, this.tags)
        // const projects = getCytosis().getLinkedRecords(this.org.fields.Projects, this.projects)
        // getLinkedRecords: function(recordIds, linkedTable
        // console.log('projects:' , projects)
        return tags
      }
    }
  }

}
</script>

<style lang="scss" scoped>

.logo-sm {
  width: 80px;
  height: 100%;
  vertical-align: middle;
  padding-bottom: 6px;
}

</style>

