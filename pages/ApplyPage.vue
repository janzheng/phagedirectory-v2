<template>

  <article class="ApplyPage container">

    <div class="loading" v-if="!project">
      <div class="_loader --circular"></div>
    </div>

    <div v-if="project">
      <Header :projects="true" />

      <section class="copy">

        <div class="menu">
          <router-link to="/">Projects</router-link> / <router-link :to="`/projects/${project.fields.slug}`">{{project.fields.Name}}</router-link> / Apply
        </div>

        <div class="_grid-2-1 _width-content-max _padding-left-none">

          <div class="_dash" >

            <div class="DetailsPage-tags">
              <span class="_tag" v-for="skill of getSkills(project.fields.Skills)" :key='skill'>{{skill}}</span>
            </div>

            <div class="DetailsPage-image-container _padding-top _margin-top" v-if="project.fields.Image">
              <img :src="project.fields.Image[0].thumbnails.large.url" class="DetailsPage-image" 
              />
            </div>
            <h3 class="DetailsPage-title title">
              <!-- {{ getOrg() }} -->
              {{project.fields.Name}}
            </h3>

            <div class="DetailsPage-link _padding-bottom">
              <a target="_blank" :href="project.fields.URL">{{project.fields.URL}}</a>
            </div>

            <div class="DetailsPage-description" v-if="project" v-html="$md.render(project.fields.Description || '')">
            </div>

            <div class="DetailsPage-requirements _margin-top-2" v-if="project.fields.Requirements" >
              <h6 class="_padding-bottom-none">Requirements</h6>
              <div v-html="$md.render(project.fields.Requirements || '')"></div>
            </div>

            <div class="DetailsPage-updates _margin-top-2" v-if="project.fields.Updates" >
              <h6 class="_padding-bottom-none">Updates</h6>
              <div v-html="$md.render(project.fields.Updates || '')"></div>
            </div>

          </div>




          <div class="DetailsPage-sidebar _font-sans" >
            <div class="DetailsPage-details _dash --half --transparent">

              <div class="_margin-bottom">

                <h6 class="DetailsPage-sidebar-header">Details</h6>

                <div class="DetailsPage-details" v-html="$md.render(project.fields.Details || '')">
                </div>

                <div class="DetailsPage-type" v-if="project.fields.Type">
                  <div class="DetailsPage-lineheader">Project Type:</div> <span v-html="$md.render(project.fields.Type || '')"></span>
                </div>


                <div class="DetailsPage-organization _margin-bottom" v-if="project.fields.Organization">
                  <div class="DetailsPage-lineheader">Organization:</div> 
                  <router-link target="_blank" v-for="org of getOrg()" :key="org.id" :to="{path: `/orgs/${org.fields.slug}`}">{{org.fields.Name}}</router-link>
                </div>

                <div class="DetailsPage-bounty _margin-bottom" v-if="project.fields.Bounty">
                  <span class="DetailsPage-lineheader">Bounty: </span> <span class="DetailsPage-no_paragraphs" v-html="$md.render(project.fields.Bounty  || '')"></span>
                  <!-- <div class="DetailsPage-small _margin-bottom">The bounty size is how much an organization can afford to pay</div> -->
                </div>

                <div class="DetailsPage-location" v-if="project.fields.Location">
                  <div class="DetailsPage-lineheader">Location:</div> <span v-html="$md.render(project.fields.Location || '')"></span>
                </div>

                <div class="DetailsPage-location" v-if="project.fields.Duration">
                  <div class="DetailsPage-lineheader">Duration:</div> <span v-html="$md.render(project.fields.Duration || '')"></span>
                </div>

                <div class="DetailsPage-location" v-if="project.fields.Contact">
                  <div class="DetailsPage-lineheader">Contact:</div> <span v-html="$md.render(project.fields.Contact || '')"></span>
                </div>

                <div class="_button _center --width-full --yellow _margin-none"
                     v-if="project.fields.Type=='Project'">
                  <span>Apply for Project</span>
                </div>
              </div>

            </div>
            <!-- 
            <div class="DetailsPage-contact _dash --half" v-if="project.fields.Contact">
              <h6 class="DetailsPage-sidebar-header">Contact</h6>
              <div v-html="$md.render(project.fields.Contact)"></div>
            </div>
             -->
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

  data: function () {
    return {
      content: this.$store.state.Content,
      orgs: this.$store.state.Organizations,
      projects: this.$store.state.Projects,
      skills: this.$store.state.Skills,
      params: this.$route.params,
      project: undefined, //  {fields: ''}, // undefined initially 
    }
  },

  async fetch({ store, params }) {
    return fetchCytosis(store, params)
  },

  head: function () {
    if(this.project) {
      console.log('head', this.project.fields.Name)
      return {
        title: this.project.fields.Name,
      }
    }
    else {
      return {}
    }
  },

  mounted: function () {

    const projName = unescape(this.$route.params.id)
    // console.log('projName:', projName, ' projects:' , this.projects, ' params: ', this.$route.params)
    this.project = getCytosis().find(projName, [this.projects], ['Name', 'slug'])[0]
  },

  methods: {
    getOrg: function() {
      if(this.project && this.project.fields.Organization) {
        const orgs = getCytosis().getLinkedRecords(this.project.fields.Organization, this.orgs, true)
        console.log('orgs: ' , orgs, this.project.fields.Organization)
        return orgs
      }
    },
    getSkills: function(skills) {
      if(this.skills && skills) {
        const _skills = getCytosis().getLinkedRecords(skills, this.skills)
        // console.log('skills:' , skills, this.skills, _skills)
        return _skills
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

