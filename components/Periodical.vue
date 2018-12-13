
<template>

  <section class="Periodical narrow copy _margin-center _padding-top-2">
    
    <div class="CapsidnTail _card _padding-2-sm _padding-xs _padding-top-xs" v-for="issue of issues" :key="issue.id" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished">
      {{ setHeader(issue) }}

      <div class="Periodical-type _margin-bottom" v-if="issue.fields['IssueType']">
        <span class="_tag">{{issue.fields['IssueType']}}</span>
      </div>

      <div class="Periodical-header _grid-3-2 _grid-gap-small">
        <div class="Periodical-title">{{ issue.fields['Name'] }}</div>
        <div class="Periodical-date _right-sm">{{ issue.fields['Date'] | niceDate }}</div>
      </div>

      <router-link :to="`/capsid/${issue.fields['Slug']}`"><h1 class="Periodical-title" v-html="issue.fields['Title']"></h1></router-link>
      <h2 class="Periodical-lede" v-html="issue.fields['Lede']"></h2>
      <div class="Periodical-description _margin-bottom _md-p_fix" v-if="issue.fields['Intro']" v-html="$md.render(issue.fields['Intro'] || '')"></div>

      <div class="Periodical-updates" v-if="getUpdates(issue).length>0">
        <h4 class="Periodical-updates-title">{{issue.fields['UpdatesTitle'] || 'What’s New'}}</h4>
        <div class="Periodical-update-item _margin-bottom" v-for="update of getUpdates(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')"></div>
          <div class="_margin-top-half" v-if="update.fields['Tags']">
            <span class="Periodical-item-tag _tag" :class="tag == 'Sponsor' ? '--sponsor' : ''" v-for="tag of update.fields.Tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>

      <div class="Jobs-updates" v-if="getJobs(issue).length>0">
        <h4 class="Jobs-updates-title">{{issue.fields['JobsTitle'] || 'Job Board'}}</h4>
        <div class="Jobs-update-item _margin-bottom" v-for="update of getJobs(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')"></div>
          <div class="_margin-top-half" v-if="update.fields['Tags']">
            <span class="Jobs-item-tag _tag" :class="tag == 'Sponsor' ? '--sponsor' : ''" v-for="tag of update.fields.Tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </div>


      <!-- twitter share on top -->
      <div class="Periodical-share _margin-bottom-2" >
        <p class="Periodical-twitter">
          <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
          <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
        </p>
      </div>


      <div class="Periodical-content" v-if="issue.fields['Article']" v-html="$md.render(issue.fields['Article'] || '')">
      </div>

      <!-- list has been moved to PeriodicalList.vue -->

      <!-- twitter share on bottom -->
      <div class="Periodical-share" >
        <p class="Periodical-twitter">
          <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
          <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
        </p>
      </div>

      <div class="Periodical-author" v-html="issue.fields['Author']" v-if="issue.fields['Author']">
      </div>


    </div>

  </section>

</template>


<script>

import { mapState } from 'vuex'

export default {
  props: ['issues', 'showPreview', 'isLatest'],

  head () {

    // NOTE: might or might not work SSR no idea

    // if latest issue, don't share the periodical
    if(this.isLatest)
      return {}

    let title = this.headTitle
    let description = "description"
    let meta = [
      { hid: 'og-title', property: 'og:title', content: `${this.headTitle}` },
      { hid: 'twitter-title', property: 'twitter:title', content: `${this.headTitle}` },

      { hid: 'og-image', property: 'og:image', content: `${this.headImage}` },
      { hid: 'twitter-image', property: 'twitter:image', content: `${this.headImage}` },

      { hid: 'twitter-description', property: 'twitter:description', content: `${this.headDescription}` },
      { hid: 'og-description', property: 'og:description', content: `${this.headDescription}` },
      { hid: 'description', name: 'description', content: `${this.headDescription}` },
    ]

    return {
      title,
      meta,
    }
  },

  components: {
  },

  data: function () {
    return {
      headTitle: undefined,
      headImage: undefined,
      headDescription: undefined,
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

    setHeader(issue) {
      console.log('setHeader', issue.fields['BannerImage'])
      this.headImage = issue.fields['BannerImage']
      this.headDescription = issue.fields['Lede']
      this.headTitle = issue.fields['Name']
    },

    getUpdates(issue) {
      const updates = this.$cytosis.getLinkedRecords(issue.fields['Updates'], this['Updates'], true)
      // console.log('get updates:', updates)
      return updates || undefined
    },

    getJobs(issue) {
      // jobs also pull from Updates tab
      const jobs = this.$cytosis.getLinkedRecords(issue.fields['Jobs'], this['Updates'], true)
      // console.log('get updates:', updates)
      return jobs || undefined
    },

    getTwitterLink(issue) {
      /*
        https://www.thesocialmediahat.com/article/how-attach-images-tweet-buttons

        https://stackoverflow.com/questions/9127808/how-do-you-include-hashtags-within-fitter-share-link-text
        
        https://twitter.com/intent/tweet?
        url=<url to tweet>
        text=<text to tweet>
        hashtags=<comma separated list of hashtags, with no # on them>

        https://twitter.com/intent/tweet?url=http://www.example.com&text=I+am+eating+branston+pickel+right+now&hashtags=bransonpickel,pickles

        Image example
        - must already have shared on twitter somewhere
        https://twitter.com/intent/tweet?&text=Phage+Therapy+Crowdsourcing+Infographic+by+@phagedirectory+pic.twitter.com/JMJfiertE1&hashtags=phagetherapy,phage,crowdsourcing,phagedirectory
      */
       
       // issue.fields['TwitterText']

       // generated from janistanian
       // https://pbs.twimg.com/media/DtRXxsOUwAAo-Iz.jpg:large
      const text = issue.fields['TwitterText'] || issue.fields['Lede'] || 'Capsid & Tail'
      const url = issue.fields['URL']
      const tags = issue.fields['TwitterTags']

      return `https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${tags}`

    }
  }

}
</script>

