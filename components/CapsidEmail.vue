
<!-- 

  Mirrors Periodical.vue, but intended for mailchimp copy/pasting
  Some values are hard-coded, like colors etc. b/c email demabds it

  This is required for CSS, since eslint doesn't know what to do with it


 -->


<template>

  <div class="Capsid Email">

    <div v-for="issue of issues" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished" :key="issue.id" >

      <!-- 
        MailChimp will inline these
        - !important is necessary to override inline styles
        - inline styles necessary b/c some doesn't support <style> tag
       -->
      <style v-if="issue.fields['EmailCSS']" type="text/css" v-html="issue.fields['EmailCSS']" >
        /* nothing here */
      </style>

      <!-- hard-coded styles -->
      <style type="text/css">
        h4 {
          /*padding: 16px 0;*/
          padding: 0;
          padding-top: 16px;
        }
        .Advert { 
          background-color: #FFD3D3 !important;
          margin-bottom: 16px !important;
          padding: 16px !important;
          color: #333333 !important;
          box-sizing: border-box !important;
          width: 100% !important;
          border-radius: 4px !important;
        }

        .footer-share {
          padding: 16px !important;
          background: #4C6882 !important;
          font-size: 18px !important;
        }

        .Email-card, .Periodical-card {
          box-shadow: 0px 4px 8px rgba(70, 70, 70, .1);
          color: #333333;
          background-color: #FCFCFC;
          border-radius: 4px;
          margin-bottom: 16px;
          /*padding: 15px;*/
        }

        .Section-table {
          /* necessary for email */
          width: 100%;
        }
          .Section-table td:last-child {
            vertical-align: middle;
            padding-left: 16px;
            text-align: right;
          }

        .Capsid-sponsor {
          padding: 16px;
        }

        .Capsid-item {
          margin-bottom: 8px !important;
        }
        .Capsid-item:last-child {
          margin-bottom: 4px !important;
        }

        .Capsid-updates {
          padding: 16px;
          background-color: #FCFCFC;
        }
        .Capsid-update-item {
          padding: 16px;
          background-color: #FFFFFF;
          margin-bottom: 16px;
        }

        .Capsid-job-logo img {
          width: 100% !important;
          max-width: 200px !important;
        }

        .Capsid-community {
          padding: 16px;
          background-color: rgba(250, 84, 134, 0.05);
        }
          .Capsid-community-item {
            padding: 16px;
            margin-bottom: 8px !important;
            background: #ffffff;
          }
          .Capsid-community-itemheader {
            font-size: 14px !important;
          }
          .Capsid-community-itemheader span + span {
            padding-left: 8px !important;
          }
          .Capsid-community-title {
            font-size: 21px;
            line-height: 28px;
            font-weight: bold;
          }
          .CommunityPost-info {
            margin-top: 15px;
            margin-bottom: 15px;
          }
        .Capsid-jobs {
          padding: 16px;
          background-color: rgba(113, 239, 245, 0.1);
        }
          .Capsid-jobs-item {
            padding: 16px;
            margin-bottom: 8px !important;
            background-color: #F5FDFF;
          }
          .Capsid-jobs-itemheader {
            font-size: 14px !important;
          }
          .Capsid-jobs-itemheader span + span {
            padding-left: 16px !important;
          }
          .Capsid-job-title {
            font-size: 21px;
            line-height: 28px;
            font-weight: bold;
          }
          .Job-action {
            margin-top: 8px;
            margin-bottom: 8px;
          }
          .Job-small {
            font-size: 14px !important;
          }

        .Email-card--silver {
          box-shadow: 0px 4px 8px rgba(70, 70, 70, .1);
          color: #333333;
          border-radius: 4px;
          padding: 30px;
          margin-bottom: 16px;
          background-color: #F7F7F7 !important;
        }
        
        .Email-tag {
          background-color: #eeeeee;
          border-radius: 4px;
          border: 1px solid #eeeeee;
          color: #000000;
          display: inline-block;
          font-size: 14px;
          outline: none!important;
          padding: 1px 8px;
          text-decoration: none;
          margin-bottom: 8px !important;
          margin-right: 4px !important;
        }

        .--sponsor {
          background-color: rgba(113, 239, 245, 0.5) !important;
          border-color: rgba(113, 239, 245, 0.5) !important;
        }

        .line {
          padding: 0;
          line-height: 0 !important;
          margin-bottom: 32px !important;
        }

        .Capsid-date {
          font-size: 14px !important;
        }

        blockquote p {
          /*color: #FA5486  !important;*/
          font-family: georgia,times,times new roman,serif !important;
          font-size: 19px !important;
          margin-bottom: 0px !important;
          margin-top: 0px !important;
        }
        blockquote {
          padding: 7px 30px;
          margin-top: 15px;
          margin-bottom: 15px;
          margin-left: 0;
          margin-right: 0;
          border-left: solid 3px #FA5486;
        }


        @media only screen and (max-width: 680px){
          .Email-tag {
            font-size: 18px;
          }
          .footer-share {
            font-size: 13px !important;
          }
          blockquote, blockquote p {
            margin: 0 !important;
            font-size: 26px !important;
          }
          .Capsid-item,
          .Capsid-jobs-item, {
            margin-left: -15px !important;
            margin-right: -15px !important;
          }
        }


        .Capsid-author img {
          width: 80px !important;
          background-color: #FFFFFF !important;
        }

        img {
          max-width: 100% !important;
        }

        .Capsid-content p {
          margin-top: 21px;
          margin-bottom: 21px;
        }
        .Capsid-content li {
          padding-bottom: 21px;
        }

        ._button {
          border-width: 2px;
          border-style: solid;
          display: inline-block;
          border-color: #374F6A;
          line-height: 8px;
          text-decoration: none !important;
          color: #FAFAFA !important;
          background-color: #374F6A !important;
          margin-right: 8px;
          margin-bottom: 6px;
          border-radius: 4px;
          padding-left: 24px;
          padding-right: 24px;
          padding-top: 7.5px;
          padding-bottom: 7.5px;
        }
        ._button-outline {
          border-width: 2px;
          border-style: solid;
          display: inline-block;
          border-color: #374F6A;
          /*line-height: 8px;*/
          text-decoration: none !important;
          color: #374F6A !important;
          background-color: transparent !important;
          margin-right: 8px;
          margin-bottom: 6px;
          border-radius: 4px;
          padding-left: 24px;
          padding-right: 24px;
          padding-top: 9px;
          padding-bottom: 9px;
        }

      </style>

      <div>
        <div class="Email-date">{{ issue.fields['Date'] | niceDate }}</div>
        <div class="Email-issue"><strong>{{ issue.fields['Name'] }}</strong> </div>
        <div class="Email-read"><a :href="`${issue.fields['URL']}`" target="_blank">Read on Phage Directory</a></div>
      </div>

      <br>

      <div class="Email">
        <h1 class="Capsid-title" v-html="issue.fields['Title']" />
        <br>
        <h2 class="Capsid-lede" v-html="issue.fields['Lede']" />
        <br>
      </div>

      <div v-if="issue.fields['Intro']" class=" Capsid-description _md-p_fix" >
        <div v-html="$md.render(issue.fields['Intro'] || '')" />
      </div>

      <br>

      <div v-if="getSponsors(issue).length>0" class="Capsid-sponsor Email-card" >
        <!-- Don't show Sponsor title, just keep the tag<h4 class="Capsid-sponsors-title">{{'Sponsors'}}</h4> -->
        <div v-for="sponsor of getSponsors(issue)" v-if="sponsor && sponsor.fields['isPublished']" :key="sponsor.fields['Name']" class="Capsid-item Capsid-sponsor-item" >
          <div class="_md-p_fix" v-html="$md.render(sponsor.fields['Markdown'] || '')" />
          <div v-if="sponsor.fields['Tags']" class="_margin-top-half" >
            <span class="Email-tag --sponsor">Sponsor</span>
          </div>
        </div>
      </div>

      <div class="Email-card" >


          <!-- 

              WHATS NEW / UPDATES

           -->

        <div v-if="getUpdates(issue)" class="Capsid-updates" >
          <h3 class="Capsid-updates-title_">{{ issue.fields['UpdatesTitle'] || 'What’s New' }}
          </h3>
          <h3 class="line">
            <span style="color:#fa5486">&mdash;</span>
          </h3>
          <div v-for="update of getUpdates(issue)" v-if="update && update.fields['isPublished']" :key="update.fields['Name']" class="Capsid-item Capsid-update-item _margin-bottom" >
            <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')" />
            <div v-if="update.fields['Tags']" class="_margin-top-half" >
              <span v-for="tag of update.fields.Tags" :key="tag" ><span :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Email-tag" >{{ tag }}</span>&nbsp;</span> <!-- extra span required for adding space w/o using css -->
            </div>
          </div>
        </div>


          <!-- 

              JOBS 

           -->

        <div class="Capsid-jobs" >
          <table class="Section-table">
            <tr>
              <td class="" >
                <h3 class="Capsid-jobs-header_">{{ 'Latest Jobs' }}</h3>
              </td>
              <td>
                <div><a href="https://phage.directory/jobs" target="_blank"><strong>All jobs</strong></a></div>
                <div><a :href="jobsMailto"><strong>Post a job</strong></a></div>
              </td>
            </tr>
          </table>
          <h3 class="line">
            <span style="color:#fa5486">&mdash;</span>
          </h3>
          <div v-for="job of getJobs(issue)" v-if="job && job.fields['isPublished']" :key="job.fields['Name']" class="Capsid-jobs-item Capsid-item">
            <div class="Capsid-job-logo" v-if="getAttachment(job)">
              <img :src="getAttachment(job)" alt="Job logo">
            </div>
            <!-- <div v-if="job.fields['Date'] || job.fields['Category']" class="Capsid-jobs-itemheader _padding-bottom-half" ><span v-if="job.fields['Date']" class="_md-p_fix _font-small _margin-bottom-half" >{{ job.fields['Date'] }}</span><span v-if="job.fields['Category']" class="_md-p_fix _font-small _font-bold" >{{ job.fields['Category'] }}</span></div> -->

            <div>
              <!-- <a v-if="getJobStatus(job) != 'Expired' && getJobLink(job) != false " :href="getJobLink(job)" class="Capsid-job-title"> 
                {{ job.fields['Name'] }}
              </a> -->
              <div class="Capsid-job-title">
                {{ job.fields['Name'] }}
              </div>
            </div>

            <!-- show Org and/or Supervisor... or only the Org -->
            <div v-if="job.fields['Org'] && job.fields['Supervisor']" class="_grid-3-2 _grid-gap-none" >
              <div v-if="job.fields['Org']">
                <strong class="Job-org" >{{ job.fields['Org'].join(', ') }}</strong>, <span v-if="job.fields['Location']" class="Job-location _inline-block">{{ job.fields['Location'] }}</span>
              </div>
              <div v-if="job.fields['Supervisor']" class="Job-supervisor _right-sm">
                <div>{{ job.fields['Supervisor'] }}</div>
              </div>
            </div>
            <div v-else-if="job.fields['Org']">
              <strong class="Job-org" >{{ job.fields['Org'].join(', ') }}</strong>, <span v-if="job.fields['Location']" class="Job-location _inline-block">{{ job.fields['Location'] }}</span>
            </div>

            <div class="_md-p_fix" v-html="$md.render(job.fields['Markdown'] || '')" />

            <!-- copied from the jobs page code; uses Job's page styles -->
            <div v-if="getJobStatus(job) != 'Expired' && job.fields['URL']" class="Job-action _margin-top-half ">
              <a v-if="job.fields['URL']" :href="job.fields['URL']" class="Job-action-apply CTA _button-outline --short _margin-bottom-none-i _margin-right-half">More Details</a>
              <div v-if="job.fields['ExpirationDate']" class="Job-expiry _font-small Job-small --nowrap">
                Last day to apply: <span class="_font-bold">{{ job.fields['ExpirationDate'] | niceDate }} </span>
              </div>
            </div>

            <div v-if="job.fields['Tags'] || job.fields['JobType']" class="_margin-top-half" >
              <span class="Email-tag _tag --sponsor" v-if="job.fields['JobType']">{{ job.fields['JobType'] }}</span> <span v-for="tag of job.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag Email-tag _tag" >{{ tag }}</span>
            </div>
          </div>
          <div v-if="getJobs(issue).length == 0" class="Capsid-community-empty" v-html="$md.render(emptyJobs || '')" />
        </div>

        <!-- 

            COMMUNITY 

         -->

        <div v-if="getCommunity(issue)" class="Capsid-community" >
          <table class="Section-table">
            <tr>
              <td class="" >
                <h3 class="Capsid-community-title_">Community Board</h3>
              </td>
              <td>
                <div><a href="https://phage.directory/community" target="_blank"><strong>All posts</strong></a></div>
                <div><a :href="communityMailto"><strong>Post a message</strong></a></div>
              </td>
            </tr>
          </table>
          <h3 class="line">
            <span style="color:#fa5486">&mdash;</span>
          </h3>
          <div class="Capsid-community-description" v-html="$md.render(communityDescription || '')"/>
          <div v-for="post of getCommunity(issue)" v-if="post && post.fields['isPublished']" :key="post.fields['Name']" class="Capsid-item Capsid-community-item _margin-bottom" >
            <div v-if="post.fields['PostedDate']" class="Capsid-community-itemheader" >
              <span v-if="post.fields['PostedDate']" class="_md-p_fix _font-small _margin-bottom-half" >{{ post.fields['PostedDate'] | niceDate }}</span>
            </div>
            <div v-if="getPostStatus(post) != 'Expired' && post.fields['Title']">
              <div class="Capsid-community-title _padding-top-half _inline-block" v-html="$md.strip($md.render( post.fields['Title'] || ''))" />
            </div>

            <div v-if="post.fields['URL'] || post.fields['Location'] || post.fields['PersonName'] || post.fields['Org']" class="CommunityPost-info">
              <div v-if="post.fields['PersonName']">Name: <strong>{{ post.fields['PersonName'] }}</strong></div>
              <div v-if="post.fields['Location']">Location: <strong>{{ post.fields['Location'] }}</strong></div>
              <div v-if="post.fields['Org']" class="CommunityPost-org">Organization: <strong>
                <a v-if="post.fields['OrgUrl']" :href="post.fields['OrgUrl']">{{ post.fields['Org'] }}</a>
                <span v-else>{{ post.fields['Org'] }}</span></strong>
              </div>
              <div v-if="post.fields['URL']" class="_wordbreak">Website: <a :href="post.fields['URL']"><strong>{{ post.fields['URL'] }}</strong></a></div>
            </div>

            <div class="_md-p_fix" v-html="$md.render(post.fields['Markdown'] || '')" />
            <div v-if="post.fields['Tags'] || post.fields['Type']" class="_margin-top-half" >
              <span v-if="post.fields['Type']" class="CommunityPost-type Email-tag _tag --highlight ">{{ post.fields['Type'] }}</span>
              <span v-for="tag of post.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag Email-tag _tag" >{{ tag }}</span>
            </div>

          </div>
          <div v-if="getCommunity(issue).length == 0" class="Capsid-community-empty" v-html="$md.render(emptyCommunity || '')">
          </div>
        </div>
      </div>


      <br>

      <!-- twitter share on top -->
      <div class="Capsid-share _margin-bottom-2">
        <p class="Capsid-twitter">
          <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
          <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
        </p>
      </div>

      <br>

      <div v-if="issue.fields['Article']" class=" Capsid-content" >
        <div v-html="$md.render(issue.fields['Article'] || '')" />

        <br>

        <div class="Capsid-share _margin-bottom-2" >
          <p class="Capsid-twitter">
            <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
            <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
          </p>
        </div>

        <br>

        <div v-if="issue.fields['Author']" class="Email-card--silver Capsid-author" v-html="issue.fields['Author']" />
      </div>


    </div>

  </div>

</template>


<script>
// eslint-disable vue/html-indent
// eslint-disable vue/html-self-closing

import { mapState } from 'vuex'

export default {
  props: {
    'issues': Array,
    'showPreview': Boolean,
  },

  data: function () {
    return {
      emptyCommunity: this.$cytosis.find('Content.capsid-empty-community', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      emptyJobs: this.$cytosis.find('Content.capsid-empty-jobs', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      communityDescription: this.$cytosis.find('Content.capsid-community-description', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      jobsMailto: "https://phage.directory/services#jobs",
      communityMailto: this.$cytosis.find('Content.community-mailto', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // jobsMailto: this.$cytosis.find('Content.jobs-mailto', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  computed: {
    ...mapState([
      'Content',
      'C&T',
      'Updates',
      'Jobs',
      'Community',
      ]),
  },


  methods: {
    getTags(issue) {
      return issue.fields['Tags'] // currently these are just a multi select list (array of strings)
      // console.log('tags:', issue.fields['Tags'])
      // return this.$cytosis.getLinkedRecords(issue.fields['Tags'], this['Tags'], true)
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

    getUpdates(issue) {
      const updates = this.$cytosis.getLinkedRecords(issue.fields['Updates'], this['Updates'], true)
      console.log('Updates:', updates)
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
      // if (job.fields['DetailsUrl'])
        // return job.fields['DetailsUrl']

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
      // true if Requests, Updates, or Jobs exist
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

