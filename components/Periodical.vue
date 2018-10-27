
<template>

  <section class="Periodical narrow copy _margin-center _padding-top-2">

    <div class="_card _padding-2" v-for="issue of issues" :key="issue.id" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished">
      <div class="Periodical-header _grid-2">
        <div class="Periodical-title">{{ issue.fields['Name'] }}</div>
        <div class="Periodical-date _right-sm">{{ issue.fields['Date'] | niceDate }}</div>
      </div>
      <div class="Periodical-description _margin-bottom-2" v-html="$md.render(issue.fields['Markdown'])"></div>

      <div class="Periodical-updates" v-if="getUpdates(issue)">
        <h5 class="Periodical-updates-title">{{issue.fields['UpdatesTitle'] || 'What’s New'}}</h5>
        <div class="Periodical-update-item _margin-bottom" v-for="update of getUpdates(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown' || ''])"></div>
          <div class="_margin-top-half" v-if="update.fields['Tags']">
            <span class="Periodical-item-tag _tag" :class="tag == 'Sponsor' ? '--sponsor' : ''" v-for="tag of update.fields.Tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="Periodical-content" v-if="issue.fields['ArticleContent']" v-html="$md.render(issue.fields['ArticleContent'])">
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
      'Articles',
      'Tags',
      ]),
  },


  methods: {
    getTags(issue) {
      return issue.fields['Tags'] // currently these are just a multi select list (array of strings)
      // console.log('tags:', issue.fields['Tags'])
      // return this.$cytosis.getLinkedRecords(issue.fields['Tags'], this['Tags'], true)
    },
    getArticles(issue) {
      const articles = this.$cytosis.getLinkedRecords(issue.fields['Articles'], this['Articles'], true)
      // return articles
      return articles.reverse() // this flips it 'downside-up w/r to the airtable order'
    },
    getUpdates(issue) {
      const updates = this.$cytosis.getLinkedRecords(issue.fields['Updates'], this['Articles'], true)
      // console.log('get updates:', updates)
      return updates || undefined
    },
    getArticleName(article) {
      if(article.fields['MdTitle'])
        return this.$md.render(article.fields['MdTitle'])
      else 
        return article.fields['Name']
    },
  }

}
</script>

