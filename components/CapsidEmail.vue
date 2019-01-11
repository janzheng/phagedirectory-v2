
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
          padding: 16px 0;
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

        .Email-card {
          box-shadow: 0px 4px 8px rgba(70, 70, 70, .1);
          color: #333333;
          background-color: #FCFCFC;
          border-radius: 4px;
          margin-bottom: 16px;
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
        }

        .line {
          padding: 0;
          line-height: 0 !important;
          margin-bottom: 32px !important;
        }

        .Capsid-date {
          font-size: 14px !important;
        }

        @media only screen and (max-width: 680px){
          .Email-tag {
            font-size: 18px;
          }
        }

        @media only screen and (max-width:680px) {
          .footer-share {
            font-size: 13px !important;
          }
        }

        blockquote, blockquote p {
          color: #FA5486  !important;
          font-family: georgia,times,times new roman,serif !important;
          font-size: 23px !important;
        }

        @media only screen and (max-width:680px) {
          blockquote, blockquote p {
            margin: 0 !important;
            font-size: 26px !important;
          }
        }

        .Capsid-author img {
          width: 80px !important;
        }

        img {
          max-width: 100% !important;
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

      <div v-if="hasNew(issue)" class="Email-card" >


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

        <div v-if="getJobs(issue).length>0" class="Capsid-jobs" >
          <table class="Section-table">
            <tr>
              <td class="" >
                <h3 class="Capsid-jobs-title_">Latest Jobs</h3>
              </td>
              <td>
                <div><a href="https://phage.directory/jobs">All jobs</a></div>
                <div><a href="mailto:jobs@phage.directory?subject=Phage Directory Job Posting&body=Hi Phage Directory, I'd like to add a phage job to your job board ...">Post a job</a></div>
              </td>
            </tr>
          </table>
          <h3 class="line">
            <span style="color:#fa5486">&mdash;</span>
          </h3>
          <div v-for="job of getJobs(issue)" v-if="job && job.fields['isPublished']" :key="job.fields['Name']" class="Capsid-item Capsid-jobs-item " >
            <div v-if="job.fields['Date'] || job.fields['Category']" class="Capsid-jobs-itemheader" ><span v-if="job.fields['Date']" class="_md-p_fix _font-small" >{{ job.fields['Date'] }}</span><span v-if="job.fields['Category']" class="_md-p_fix _font-small _font-bold" ><b>{{ job.fields['Category'] }}</b></span>
            </div>
            <div class="_md-p_fix" v-html="$md.render(job.fields['Markdown'] || '')" />
            <div v-if="job.fields['Tags']" class="_margin-top-half" >
              <span v-for="tag of job.fields.Tags" :key="tag"><span :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Email-tag" >{{ tag }}</span>&nbsp;</span> <!-- extra span required for adding space w/o using css -->
            </div>
          </div>
        </div>
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
                <div><a href="mailto:board@phage.directory?subject=Phage Directory Community Board&body=Hi Phage Directory, I'd like to post a thing to your community board ...">Post an item</a></div>
              </td>
            </tr>
          </table>
          <h3 class="line">
            <span style="color:#fa5486">&mdash;</span>
          </h3>
          <div v-for="request of getCommunity(issue)" v-if="request && request.fields['isPublished']" :key="request.fields['Name']" class="Capsid-item Capsid-community-item _margin-bottom" >
            <div v-if="request.fields['Date'] || request.fields['Category']" class="Capsid-community-itemheader">
              <span v-if="request.fields['Category']" class="_md-p_fix _font-small _font-bold" ><b>{{ request.fields['Category'] }}</b></span><span v-if="request.fields['Date']" class="_md-p_fix _font-small">{{ request.fields['Date'] }}</span>
            </div>
            <div class="_md-p_fix" v-html="$md.render(request.fields['Markdown'] || '')" />
            <div v-if="request.fields['Tags']" class="_margin-top-half" >
              <span v-for="tag of request.fields.Tags" :key="tag"><span :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Email-tag" >{{ tag }}</span>&nbsp;</span> <!-- extra span required for adding space w/o using css -->
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

