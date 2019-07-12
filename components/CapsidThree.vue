
<template>

  <div class="Capsid _section-article _margin-center ">
    
    <div v-for="issue of issues"
         :key="issue.id" 
         class=" _padding-top-xs" >
      {{ setHeader(issue) }}

      <!-- <div class="Capsid-type _margin-bottom" v-if="issue.fields['IssueType']">
        <span class="_tag">{{issue.fields['IssueType']}}</span>
      </div> -->

      <div class="Capsid-meta ">
        <div class="Capsid-date">{{ issue.fields['Date'] | niceDate }}</div>
        <div class="Capsid-title">{{ issue.fields['Name'] }}</div>
      </div>

      <router-link :to="`/capsid/${issue.fields['Slug']}`"><h1 class="Capsid-title" v-html="issue.fields['Title']" /></router-link>

      <div class="Capsid-article">
        <h2 class="Capsid-lede" v-html="issue.fields['Lede']" />

        <div v-if="issue.fields['Intro']" 
             class="Capsid-description _margin-bottom _md-p_fix" 
             v-html="$md.render(issue.fields['Intro'] || '')" />

        <div class="Capsid-skipahead _padding-bottom-2">
          Skip ahead to <a class="_font-bold" href="#article">read this week's Featured Article</a>!
        </div> 

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


        <div id="updates" class="Capsid-update" >

          <!-- 

              WHATS NEW / UPDATES

           -->

          <div v-if="getUpdates(issue).length>0" class="Capsid-updates" >
            <h4 class="Capsid-new-title">{{ 'What’s New' }}</h4>
            <div v-for="update of getUpdates(issue)" v-if="update && update.fields['isPublished']" :key="update.fields['Name']" :class="update.fields['classes']" class="Capsid-update-item" >
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
            <div class="_grid-3-2-xs _grid-gap-small ">
              <h4 class="Capsid-new-title">{{ 'Latest Jobs' }}</h4>
              <div class="_right">
                <div><a href="https://phage.directory/jobs" target="_blank"><strong>All jobs</strong></a></div>
                <div>
                  <a :href="jobsMailto">
                    <strong>Post a job</strong>
                  </a>
                </div>
              </div>
            </div>
            <div v-for="job of getJobs(issue)" v-if="job && job.fields['isPublished']" :key="job.fields['Name']" class="Capsid-jobs-item ">
              <div v-if="getAttachment(job)" class="Capsid-logo" >
                <img :src="getAttachment(job)" alt="Job logo">
              </div>
              <!-- <div v-if="job.fields['Date'] || job.fields['Category']" class="Capsid-jobs-itemheader _padding-bottom-half" ><span v-if="job.fields['Date']" class="_md-p_fix _font-small _margin-bottom-half" >{{ job.fields['Date'] }}</span><span v-if="job.fields['Category']" class="_md-p_fix _font-small _font-bold" >{{ job.fields['Category'] }}</span></div> -->

              <div v-if="getJobStatus(job) != 'Expired' && job.fields['Name']">
                <h5 class="Capsid-job-title _padding-top-half">{{ job.fields['Name'] }}</h5>
              </div>

              <!-- show Org and/or Supervisor... or only the Org -->
              <div v-if="job.fields['Org'] || job.fields['Supervisor']" class="_flex _padding-bottom-half" >
                <div v-if="job.fields['Org']" class="_flex-grow">
                  <strong class="Job-org" >{{ job.fields['Org'].join(', ') }}</strong>, <span v-if="job.fields['Location']" class="Job-location _inline-block">{{ job.fields['Location'] }}</span>
                </div>
                <div v-if="job.fields['Supervisor']" class="Job-supervisor _right-sm">
                  <div>{{ job.fields['Supervisor'] }}</div>
                </div>
              </div>
              <!-- <div v-else-if="job.fields['Org']" class="_padding-bottom-half" >
                <strong class="Job-org" >{{ job.fields['Org'].join(', ') }}</strong>, <span v-if="job.fields['Location']" class="Job-location _inline-block">{{ job.fields['Location'] }}</span>
              </div> -->

              <div class="_md-p_fix" v-html="$md.render(job.fields['Markdown'] || '')" />

              <!-- copied from the jobs page code; uses Job's page styles -->
              <div v-if="getJobStatus(job) != 'Expired' && job.fields['URL']" class="Job-action _margin-top-half ">
                <a v-if="job.fields['URL']" :href="job.fields['URL']" class="Job-action-apply CTA --outline _button --short _margin-bottom-none-i _margin-right-half" target="_blank">More Details</a>
                <!-- <a v-if="job.fields['DetailsUrl']" :href="job.fields['DetailsUrl']" class="Job-action-apply CTA _button --outline --short _margin-bottom-none-i _margin-right-half">More Details</a> -->
                <!-- expiration date -->
                <span v-if="job.fields['ExpirationDate']" class="Job-expiry _font-small --nowrap">
                  Last day: <span class="_font-bold">{{ job.fields['ExpirationDate'] | niceDate }} </span>
                </span>
              </div>

              <div v-if="job.fields['Tags'] || job.fields['JobType']" class="_margin-top-half" >
                <span v-if="job.fields['JobType']" class="Capsid-item-tag _tag --highlight" >{{ job.fields['JobType'] }}</span> <span v-for="tag of job.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ tag }}</span>
              </div>
            </div>
            <div v-if="getJobs(issue).length == 0" class="Capsid-community-empty" v-html="$md.render(emptyJobs || '')" />
          </div>

          <!-- 

              COMMUNITY 

           -->

          <div class="Capsid-community">
            <div class="_grid-3-2-xs _grid-gap-small _margin-bottom-sm">
              <h4 class="Capsid-new-title">Community Board</h4>
              <div class="Capsid-community-cta _right">
                <div><a href="https://phage.directory/community" target="_blank"><strong>All posts</strong></a></div>
                <div><a :href="communityMailto"><strong>Post a message</strong></a></div>
              </div>
            </div>

            <div class="Capsid-community-description" v-html="$md.render(communityDescription || '')"/>
            <div v-for="post of getCommunity(issue)" v-if="post && post.fields['isPublished']" :key="post.fields['Title']" class="Capsid-community-item" >
              <div v-if="post.fields['PostedDate']" class="Capsid-community-itemheader" >
                <span v-if="post.fields['PostedDate']" class="_md-p_fix _font-small _margin-bottom-half" >{{ post.fields['PostedDate'] | niceDate }}</span>
              </div>

              <div v-if="getPostStatus(post) != 'Expired' && post.fields['Title']">
                <h5 class="Capsid-community-title _padding-top-half _inline-block" v-html="$md.strip($md.render( post.fields['Title'] || ''))" />
              </div>
              <div v-if="post.fields['URL'] || post.fields['Location'] || post.fields['PersonName'] || post.fields['Org'] " class="CommunityPost-info _margin-bottom">
                <div v-if="post.fields['PersonName']">Name: <strong>{{ post.fields['PersonName'] }}</strong></div>
                <div v-if="post.fields['Location']">Location: <strong>{{ post.fields['Location'] }}</strong></div>
                <div v-if="post.fields['Org']" class="CommunityPost-org">Organization:
                  <strong><a v-if="post.fields['OrgUrl']" :href="post.fields['OrgUrl']">{{ post.fields['Org'] }}</a><span v-else>{{ post.fields['Org'] }}</span></strong>
                </div>
                <div v-if="post.fields['URL']" class="_wordbreak">Website: <a :href="post.fields['URL']"><strong>{{ post.fields['URL'] }}</strong></a></div>
              </div>

              <div class="_md-p_fix" v-html="$md.render(post.fields['Markdown'] || '')" />
              <div v-if="post.fields['Tags'] || post.fields['Type']" class="_margin-top-half" >
                <span v-if="post.fields['Type']" class="CommunityPost-type _tag --highlight ">{{ post.fields['Type'] }}</span>
                <span v-for="tag of post.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ tag }}</span>
              </div>
            </div>
            <div v-if="getCommunity(issue).length == 0" class="Capsid-community-empty" v-html="$md.render(emptyCommunity || '')" />
          </div>

        </div>

        <!-- twitter share on top -->
        <div class="Capsid-share _margin-bottom-2" >
          <p class="Capsid-twitter">
            <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
            <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
          </p>
        </div>


        <h1 v-if="issue.fields['Title']" id="article" class="Capsid-title" v-html="issue.fields['Title']" />

        <div v-if="issue.fields['AuthorCard']" class="Capsid-authorCard _padding-top _padding-bottom" v-html="$md.render(issue.fields['AuthorCard'] || '')" />

        <div v-if="issue.fields['Article']" class="Capsid-content" v-html="$md.render(issue.fields['Article'] || '')" />

        <!-- list has been moved to PeriodicalList.vue -->

      </div>

      <div v-if="issue.fields['Author']" class="Capsid-author" v-html="$md.render(issue.fields['Author'])" />

      <!-- twitter share on bottom -->
      <div class="Capsid-share" >
        <p class="Capsid-twitter">
          <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
          <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
        </p>
      </div>

    </div>

  </div>

</template>


<script>

import { mapState } from 'vuex'

export default {
  props: {
    'issues': Array,
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

      emptyCommunity: this.$cytosis.find('Content.capsid-empty-community', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      emptyJobs: this.$cytosis.find('Content.capsid-empty-jobs', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      communityDescription: this.$cytosis.find('Content.capsid-community-description', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      jobsMailto: "https://phage.directory/services#jobs",
      communityMailto: this.$cytosis.find('Content.community-mailto', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // jobsMailto: this.$cytosis.find('Content.jobs-mailto', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  computed: {
    ...mapState([
      'Content',
      'C&T',
      'Updates',
      'Jobs',
      'Community'
      ]),
  },


  methods: {
    getTags(issue) {
      return issue.fields['Tags'] // currently these are just a multi select list (array of strings)
      // console.log('tags:', issue.fields['Tags'])
      // return this.$cytosis.getLinkedRecords(issue.fields['Tags'], this['Tags'], true)
    },

    setHeader(issue) {
      if(issue.fields['BannerImage'])
      console.log('setHeader Banner:', issue.fields['BannerImage'])

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
      // console.log('Sponsors:', sponsors)
      return sponsors || undefined
    },


    getUpdates(issue) {
      const updates = this.$cytosis.getLinkedRecords(issue.fields['Updates'], this['Updates'], true)
      // console.log('Updates:', updates)
      return updates || undefined
    },

    getJobs(issue) {
      // jobs pull from Updates tab AND the jobs page
      // pull from the jobs page first, then updates tab
      // jobs are linked manually for each C&T issue, and can be reused
      const jobs = this.$cytosis.getLinkedRecords(issue.fields['Jobs'], this['Updates'], true)
      // clean the Name field from Updates and set to false, since Updates don't have meaningful Name fields
      // for (let job of jobs) {
      for (const [i, job] of jobs.entries()) {
        job.fields['Name'] = undefined
        jobs[i] = job
      }

      const jobsTab = this.$cytosis.getLinkedRecords(issue.fields['JobsTab'], this['Jobs'], true)
      // console.log('Jobs:', jobs, jobsTab, issue)
      return [...jobsTab, ...jobs] || undefined
    },
    getJobLink(job) {
      if (job.fields['URL'])
        return job.fields['URL']

      return false
    },
    showJob(job) {
      if (!job.fields['isPublished'])
        return undefined 
      if (Date(job.fields['ExpirationDate']) < Date.now())
        return undefined 
      return true
    },
    getJobStatus(job) {
      return job.fields['Status'] || undefined
    },

    getCommunity(issue) {
      // posts pull from Updates tab AND the jobs page
      // pull from the community page first, then updates tab
      // posts are linked manually for each C&T issue, and can be reused
      const posts = this.$cytosis.getLinkedRecords(issue.fields['Community'], this['Updates'], true)
      // clean the Name field from Updates and set to false, since Updates don't have meaningful Name fields
      // for (let job of jobs) {
      for (const [i, post] of posts.entries()) {
        post.fields['Name'] = undefined
        posts[i] = post
      }

      const postsTab = this.$cytosis.getLinkedRecords(issue.fields['CommunityTab'], this['Community'], true)
      // console.log('Jobs:', jobs, jobsTab, issue)
      return [...postsTab, ...posts] || undefined
    },

    showPost(post) {
      if (!post.fields['isPublished'])
        return undefined 

      if (Date(post.fields['ExpirationDate']) < Date.now())
        return undefined 

      return true
    },

    getPostStatus(post) {
      return post.fields['Status'] || undefined
    },

    hasNew(issue) {
      // true if Community Requests, Updates, or Jobs exist
      // update: don't use this; always display empty state w/ CTA
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

    },

  }

}
</script>

