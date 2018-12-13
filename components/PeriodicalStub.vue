
<!-- 

  Based on Periodical.vue, only shows some basic info for a periodical
  - requires a click to view the periodical. Necessary b/c starting to get too many

 -->
<template>

  <section class="PeriodicalStub narrow copy _margin-center _padding-top-2">

    <div @click="openLink(`/capsid/${issue.fields.Slug}`)" class="PeriodicalStub-item _block _card _padding-2" v-for="issue of issues" :key="issue.id" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished">
      <div class="Periodical-header _grid-2">
        <div class="Periodical-title">{{ issue.fields['Name'] }}</div>
        <div class="Periodical-date _right-sm">{{ issue.fields['Date'] | niceDate }}</div>
      </div>
      <h2 class="Periodical-title" v-html="issue.fields['Title']"></h2>
      <div class="Periodical-lede" v-html="issue.fields['Lede']"></div>
      <!-- <div class="Periodical-description _margin-bottom _md-p_fix" v-if="issue.fields['Intro']" v-html="$md.render(issue.fields['Intro'] || '')"></div> -->
    </div>

  </section>

</template>


<script>

import { mapState } from 'vuex'

export default {
  props: ['issues', 'showPreview', 'closed'],

  components: {
  },

  data: function () {
    return {
    }
  },

  mounted: async function () {
  },

  computed: {
    ...mapState([
      'Content',
      'C&T',
      'Updates',
      ]),
  },


  methods: {
    getTags(issue) {
      return issue.fields['Tags'] // currently these are just a multi select list (array of strings)
      // console.log('tags:', issue.fields['Tags'])
      // return this.$cytosis.getLinkedRecords(issue.fields['Tags'], this['Tags'], true)
    },
    getUpdates(issue) {
      const updates = this.$cytosis.getLinkedRecords(issue.fields['Updates'], this['Updates'], true)
      // console.log('get updates:', updates)
      return updates || undefined
    },
    openLink(link) {
      this.$router.push({
          path: link
      })
    }
  }

}
</script>

