
<template>

  <div class="Capsid _section-article _margin-center">
    
    <div v-for="issue of issues" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished"
         :key="issue.id" 
         class="_padding-2-sm _padding-xs _padding-top-xs" >
      {{ setHeader(issue) }}

      <!-- <div class="Capsid-type _margin-bottom" v-if="issue.fields['IssueType']">
        <span class="_tag">{{issue.fields['IssueType']}}</span>
      </div> -->

      <div class="Capsid-header _grid-3-2 _grid-gap-small">
        <div class="Capsid-title">{{ issue.fields['Name'] }}</div>
        <div class="Capsid-date _right-sm">{{ issue.fields['Date'] | niceDate }}</div>
      </div>

      <router-link :to="`/capsid/${issue.fields['Slug']}`"><h1 class="Capsid-title" v-html="issue.fields['Title']" /></router-link>

      <div class="Capsid-article">
        <h2 class="Capsid-lede" v-html="issue.fields['Lede']" />
        <div v-if="issue.fields['Intro']" 
             class="Capsid-description _margin-bottom _md-p_fix" 
             v-html="$md.render(issue.fields['Intro'] || '')" />

        <!-- leave Sponsors ABOVE the whats new area to call it out -->
        <div v-if="getSponsors(issue).length>0" class="Capsid-sponsor" >
          <!-- Don't show Sponsor title, just keep the tag<h4 class="Capsid-sponsors-title">{{'Sponsors'}}</h4> -->
          <div v-for="sponsor of getSponsors(issue)" v-if="sponsor && sponsor.fields['isPublished']" :key="sponsor.fields['Name']" class="Capsid-sponsor-item" >
            <div class="_md-p_fix" v-html="$md.render(sponsor.fields['Markdown'] || '')" />
            <div v-if="sponsor.fields['Tags']" class="_margin-top-half" >
              <span class="Capsid-item-tag _tag --sponsor">Sponsor</span>
            </div>
          </div>
        </div>


        <div v-if="hasNew(issue)" class="Capsid-new" >

          <!-- 

              WHATS NEW / UPDATES

           -->

          <div v-if="getUpdates(issue).length>0" class="Capsid-updates" >
            <h4 class="Capsid-new-title">{{ issue.fields['UpdatesTitle'] || 'Updates' }}</h4>
            <div v-for="update of getUpdates(issue)" v-if="update && update.fields['isPublished']" :key="update.fields['Name']" class="Capsid-new-item" >
              <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')" />
              <div v-if="update.fields['Tags']" class="_margin-top-half" >
                <span v-for="tag of update.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ tag }}</span>
              </div>
            </div>
          </div>

          <!-- 

              JOBS 

           -->

          <div class="Capsid-jobs">
            <div class="_grid-2-xs">
              <h4 class="Capsid-new-title">{{ 'Latest Jobs' }}</h4>
              <div class="_right">
                <div><a href="https://phage.directory/jobs">All jobs</a></div>
                <div><a href="mailto:jobs@phage.directory?subject=Phage Directory Job Posting&body=Hi Phage Directory, I'd like to add a phage job to your job board ...">Post a job</a></div>
              </div>
            </div>
            <div v-for="job of getJobs(issue)" v-if="job && job.fields['isPublished']" :key="job.fields['Name']" class="Capsid-jobs-item ">
              <div v-if="getAttachment(job)">
                <img :src="getAttachment(job)" alt="Job logo">
              </div>
              <div v-if="job.fields['Date'] || job.fields['Category']" class="Capsid-jobs-itemheader _padding-bottom-half" ><span v-if="job.fields['Date']" class="_md-p_fix _font-small _margin-bottom-half" >{{ job.fields['Date'] }}</span><span v-if="job.fields['Category']" class="_md-p_fix _font-small _font-bold" >{{ job.fields['Category'] }}</span></div>
              <div class="_md-p_fix" v-html="$md.render(job.fields['Markdown'] || '')" />
              <div v-if="job.fields['Tags']" class="_margin-top-half" >
                <span v-for="tag of job.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ tag }}</span>
              </div>
            </div>
            <div v-if="getJobs(issue).length == 0" class="Capsid-community-empty" v-html="$md.render(emptyJobs || '')" />
          </div>

          <!-- 

              COMMUNITY 

           -->

          <div class="Capsid-community">
            <div class="_grid-3-2-xs">
              <h4 class="Capsid-new-title">Community Board</h4>
              <div class="Capsid-community-cta _right">
                <div><a href="mailto:board@phage.directory?subject=Phage Directory Community Board&body=Hi Phage Directory, I'd like to post a thing to your community board ...">Post an item</a></div>
              </div>
            </div>
            <div v-for="request of getCommunity(issue)" v-if="request && request.fields['isPublished']" :key="request.fields['Name']" class="Capsid-community-item" >
              <div v-if="request.fields['Date'] || request.fields['Category']" class="Capsid-community-itemheader" ><span v-if="request.fields['Category']" class="_md-p_fix _font-small _font-bold">{{ request.fields['Category'] }}</span><span v-if="request.fields['Date']" class="_md-p_fix _font-small _margin-bottom-half" >{{ request.fields['Date'] }}</span></div>
              <div class="_md-p_fix" v-html="$md.render(request.fields['Markdown'] || '')" />
              <div v-if="request.fields['Tags']" class="_margin-top-half" >
                <span v-for="tag of request.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ tag }}</span>
              </div>
            </div>
            <div v-if="getCommunity(issue).length == 0" class="Capsid-community-empty" v-html="$md.render(emptyCommunity || '')">
              This place is empty!
            </div>
          </div>

        </div>

        <!-- twitter share on top -->
        <div class="Capsid-share _margin-bottom-2" >
          <p class="Capsid-twitter">
            <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
            <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
          </p>
        </div>


        <div v-if="issue.fields['Article']" class="Capsid-content" v-html="$md.render(issue.fields['Article'] || '')" />

        <!-- list has been moved to PeriodicalList.vue -->

        <!-- twitter share on bottom -->
        <div class="Capsid-share" >
          <p class="Capsid-twitter">
            <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
            <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
          </p>
        </div>
      </div>

      <div v-if="issue.fields['Author']" class="Capsid-author" v-html="issue.fields['Author']" />

    </div>

  </div>

</template>


<script>

import { mapState } from 'vuex'

export default {
  props: {
    'issues': Array,
    'showPreview': Boolean,
    'isFeatured': Boolean,
  },
  // isFeatured: means it shows up first on the News list

  head () {

    // NOTE: might or might not work SSR no idea

    // if latest issue, don't share the periodical's header

      // only show special meta if on own page, e.g. capsid/issue-name, and NOT on the homepage (keep it as the standard image)
      // this makes it easier to share the capsid link w/ a vanilla banner
      // eventually we'll probably end up showing more articles on the homepage like the Verge, and stop featuring things

    if(this.isFeatured)
      return {}

    let title = this.headTitle
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

  data: function () {
    return {
      headTitle: undefined,
      headImage: undefined,
      headDescription: undefined,

      emptyCommunity: this.$cytosis.find('Content.capsid-empty-community', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      emptyJobs: this.$cytosis.find('Content.capsid-empty-jobs', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      communityDescription: this.$cytosis.find('Content.capsid-community-description', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
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

    setHeader(issue) {
      console.log('setHeader', issue.fields['BannerImage'])

      this.headImage = issue.fields['BannerImage'] || 'https://phage.directory/cnt_twitter_card.png'
      this.headDescription = issue.fields['Lede'] || "Capsid & Tail is a micro-publication about all things phages"
      this.headTitle = issue.fields['Name']

      if(this.isFeatured) {
        this.headDescription = "Capsid & Tail is a micro-publication about all things phages"
        this.headTitle = "Capsid & Tail"
      }
    },

    getAttachment(job) {
      // currently only works for the first attachment
      // console.log('attachment', job.fields['Attachment'][0]['url'])
      if(job.fields['Attachments'])
        return job.fields['Attachments'][0]['url']
    },

    getSponsors(issue) {
      const sponsors = this.$cytosis.getLinkedRecords(issue.fields['Sponsors'], this['Updates'], true)
      console.log('Sponsors:', sponsors)
      return sponsors || undefined
    },

    getCommunity(issue) {
      const requests = this.$cytosis.getLinkedRecords(issue.fields['Community'], this['Updates'], true)
      // console.log('get updates:', updates)
      return requests || undefined
    },

    getUpdates(issue) {
      const updates = this.$cytosis.getLinkedRecords(issue.fields['Updates'], this['Updates'], true)
      console.log('Updates:', updates)
      return updates || undefined
    },

    getJobs(issue) {
      // jobs also pull from Updates tab
      const jobs = this.$cytosis.getLinkedRecords(issue.fields['Jobs'], this['Updates'], true)
      console.log('Jobs:', jobs)
      return jobs || undefined
    },

    hasNew(issue) {
      // true if Community Requests, Updates, or Jobs exist
      return this.getCommunity(issue).length > 0 || this.getUpdates(issue).length > 0 || this.getJobs(issue).length > 0
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

