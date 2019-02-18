
<!-- 

  Based on Periodical.vue, only shows some basic info for a periodical
  - requires a click to view the periodical. Necessary b/c starting to get too many

 -->
<template>

  <div class="Capsid CapsidStub ">
    <!-- <div @click="openLink(`/capsid/${issue.fields.Slug}`)" class="CapsidStub-item _block _card _padding-2" :class="isFeatured ? '--featured' :''" v-for="issue of issues" :key="issue.id" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished"> -->
    <router-link v-for="issue of issues" 
                 v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished"
                 :key="issue.id"
                 :to="`/capsid/${issue.fields.Slug}`"
                 :class="isFeatured ? '--featured' :''"
                 class="CapsidStub-item _block _card _padding-2">
      <h6 v-if="isFeatured" class="CapsidStub-latest">Latest Issue</h6>

      <div class="Capsid-header _grid-2-1 _grid-gap-small">
        <div class="Capsid-title">{{ issue.fields['Name'] }}</div>
        <div class="Capsid-date _right-sm">{{ issue.fields['Date'] | niceDate }}</div>
      </div>
      <h1 class="Capsid-title" v-html="issue.fields['Title']" />
      <!-- <h2 v-if="!isFeatured" class="Capsid-title" v-html="issue.fields['Title']"></h2> -->
      <div class="Capsid-lede" v-html="issue.fields['Lede']" />
      <!-- <div class="Capsid-description _margin-bottom _md-p_fix" v-if="issue.fields['Intro']" v-html="$md.render(issue.fields['Intro'] || '')"></div> -->
    </router-link>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  props: {
    'issues': Array,
    'showPreview': String,
    'closed': String,
    'isFeatured': Boolean,
  },

  data: function () {
    return {
    }
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

