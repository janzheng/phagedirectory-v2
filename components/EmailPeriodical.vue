
<!-- 

  Mirrors Periodical.vue, but intended for mailchimp copy/pasting
  Some values are hard-coded, like colors etc. b/c email demabds it

 -->
<template>

  <section class="Periodical narrow copy _margin-center _padding-top-2">

    <div class="_card _padding-2" v-for="issue of issues" :key="issue.id" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished">
      <!-- <div class="Periodical-header _grid-2">
        <div class="Periodical-title">{{ issue.fields['Name'] }}</div>
        <div class="Periodical-date _right-sm">{{ issue.fields['Date'] | niceDate }}</div>
      </div> -->
      <div class="Periodical-description _margin-bottom-2" v-html="$md.render(issue.fields['Markdown'] || '')"></div>

      <div class="Periodical-updates" v-if="getUpdates(issue)">
        <h3 class="Periodical-updates-title_">{{issue.fields['UpdatesTitle'] || 'What’s New'}}<br/>
        <span style="color:#fa5486">&mdash;</span></h3>
        <div class="Periodical-update-item _margin-bottom" v-for="update of getUpdates(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')"></div>
          <div class="_margin-top-half" v-if="update.fields['Tags']">
            <span v-for="tag of update.fields.Tags" :key="tag"><span style="background-color:#eeeeee; border-radius:4px; border:1px solid #eeeeee; color:#000000; display:inline-block; font-size:12px; outline:none!important; padding:1px 8px; text-decoration:none" :class="tag == 'Sponsor' ? '--sponsor' : ''" >{{ tag }}</span>&nbsp;</span>
          </div>
        </div>
        <hr style="border-color: #fa5486; border-width: 2px; border-style: solid" />

      </div>

      <div class="Periodical-content" v-if="issue.fields['ArticleContent']" v-html="$md.render(issue.fields['ArticleContent'] || '')">
      </div>

      <!-- list has been moved to PeriodicalList.vue -->

    </div>

  </section>

</template>


<script>

import { mapState } from 'vuex'

export default {
  props: ['issues', 'showPreview'],

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
      'Tags',
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
  }

}
</script>

