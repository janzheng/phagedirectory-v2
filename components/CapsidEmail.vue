
<!-- 

  Mirrors Periodical.vue, but intended for mailchimp copy/pasting
  Some values are hard-coded, like colors etc. b/c email demabds it

 -->

<template>

  <div class="Capsid Email">


    <div  v-for="issue of issues" :key="issue.id" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished">

      <!-- 
        MailChimp will inline these
        - !important is necessary to override inline styles
        - inline styles necessary b/c some doesn't support <style> tag
       -->
      <style type="text/css" v-html="issue.fields['EmailCSS']" v-if="issue.fields['EmailCSS']">
        /*._margin-bottom {
          margin-bottom: 32px !important;
        }
        ._margin-top-half {
          margin-top: 8px !important;
        }
        h3, h4 {
          padding-top: 16px !important;
        }
        blockquote, blockquote p {
          font-family: georgia,times,times new roman,serif !important;
          color: #fa5486 !important;
          font-size: 18px;
          font-style: italic !important;
        }

        .Advert {
          background-color: rgba(250, 84, 134, 0.5) !important; margin-bottom: 16px; 
          padding: 16px; 
          color: #333333; 
          width: 80%; border-radius: 4px;
        }

        @media only screen and (max-width: 680px){
          .Advert {
           width: 80% !important;
          }
          .Advert img {
           float: none !important;
           display: block;
          }
          blockquote, blockquote p {
            font-size: 28px !important;
          }
       }*/
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
        .Capsid-updates {
          padding: 16px;
          background-color: #FCFCFC;
        }
        .Capsid-requests {
          padding: 16px;
          background-color: rgba(250, 84, 134, 0.05);
        }
          .Capsid-request-item {
            padding: 16px;
            background: #ffffff;
          }
        .Capsid-jobs {
          padding: 16px;
          background-color: rgba(113, 239, 245, 0.1);
        }
        .Email-card--silver {
          box-shadow: 0px 4px 8px rgba(70, 70, 70, .1);
          color: #333333;
          /*background-color: #FCFCFC;*/
          border-radius: 4px;
          padding: 30px;
          margin-bottom: 16px;
          background-color: #F7F7F7 !important;
        }

        /*@media only screen and (max-width: 680px) {
          .Email-card {
            padding: 16px !important;
          }
        }*/

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
          margin-bottom: 16px;
        }

        .--sponsor {
          background-color: rgba(113, 239, 245, 0.5) !important;
        }

        .line {
          padding: 0;
          line-height: 0 !important;
          margin-bottom: 16px;
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

      <br />

      <div class="Email">
        <h1 class="Capsid-title" v-html="issue.fields['Title']"></h1>
        <br/>
        <h2 class="Capsid-lede" v-html="issue.fields['Lede']"></h2>
        <br/>
      </div>

      <div class=" Capsid-description _md-p_fix" v-if="issue.fields['Intro']" >
        <div v-html="$md.render(issue.fields['Intro'] || '')"></div>
      </div>

      <br />

      <div class="Capsid-sponsor Email-card" v-if="getSponsors(issue).length>0">
        <!-- Don't show Sponsor title, just keep the tag<h4 class="Capsid-sponsors-title">{{'Sponsors'}}</h4> -->
        <div class="Capsid-sponsor-item" v-for="sponsor of getSponsors(issue)" :key="sponsor.fields['Name']" v-if="sponsor && sponsor.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(sponsor.fields['Markdown'] || '')"></div>
          <div class="_margin-top-half" v-if="sponsor.fields['Tags']">
            <span class="Email-tag _tag --sponsor">Sponsor</span>
          </div>
        </div>
      </div>

      <div class="Email-card" v-if="hasNew(issue)">

        <div class="Capsid-updates" v-if="getUpdates(issue)">
          <h3 class="Capsid-updates-title_">{{issue.fields['UpdatesTitle'] || 'What’s New'}}<br/>
            <span style="color:#fa5486">&mdash;</span>
          </h3>
          <div class="Capsid-update-item _margin-bottom" v-for="update of getUpdates(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
            <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')"></div>
            <div class="_margin-top-half" v-if="update.fields['Tags']">
              <span v-for="tag of update.fields.Tags"><span class="Email-tag"  :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" >{{ tag }}</span>&nbsp;</span> <!-- extra span required for adding space w/o using css -->
            </div>
          </div>
        </div>

        <div class="Capsid-requests" v-if="getRequests(issue)">
          <table class="Section-table">
            <tr>
              <td class="" >
                <h3 class="Capsid-request-title_">Community Board</h3>
              </td>
              <td>
                <div><a href="mailto:board@phage.directory?subject=Phage Directory Community Board&body=Hi Phage Directory, I'd like to post a thing to your community board ...">Post an item</a></div>
              </td>
            </tr>
          </table>
          <div class="Capsid-request-item _margin-bottom" v-for="request of getRequests(issue)" :key="request.fields['Name']" v-if="request && request.fields['isPublished']">
            <div class="Capsid-date" v-if="request.fields['Date']">{{request.fields['Date']}}</div>
            <div class="_md-p_fix" v-html="$md.render(request.fields['Markdown'] || '')"></div>
            <div class="_margin-top-half" v-if="request.fields['Tags']">
              <span v-for="tag of request.fields.Tags"><span class="Email-tag"  :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" >{{ tag }}</span>&nbsp;</span> <!-- extra span required for adding space w/o using css -->
            </div>
          </div>
        </div>

        <div class="Capsid-jobs" v-if="getJobs(issue).length>0" >
        <table class="Section-table">
          <tr>
            <td class="" >
              <h3 class="Capsid-jobs-title_">Job Board</h3>
            </td>
            <td>
              <div><a href="https://phage.directory/jobs">All jobs</a></div>
              <div><a href="mailto:jobs@phage.directory?subject=Phage Directory Job Posting&body=Hi Phage Directory, I'd like to add a phage job to your job board ...">Post a job</a></div>
            </td>
          </tr>
        </table>
        <h3 class="line"><span style="color:#fa5486">&mdash;</span></h3>

        <div class="Jobs-update-item _margin-bottom" v-for="update of getJobs(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')"></div>
          <div class="_margin-top-half" v-if="update.fields['Tags']">
            <span v-for="tag of update.fields.Tags"><span class="Email-tag"  :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" >{{ tag }}</span>&nbsp;</span> <!-- extra span required for adding space w/o using css -->
          </div>
        </div>
      </div>

      </div>

      <br/>

      <!-- twitter share on top -->
      <div class="Capsid-share _margin-bottom-2">
        <p class="Capsid-twitter">
          <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
          <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
        </p>
      </div>

      <br/>

      <div class=" Capsid-content" v-if="issue.fields['Article']" >
        <div v-html="$md.render(issue.fields['Article'] || '')" >
        </div>

        <br/>

        <div class="Capsid-share _margin-bottom-2" >
          <p class="Capsid-twitter">
            <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
            <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
          </p>
        </div>

        <br/>

        <div class="Email-card--silver Capsid-author"
          v-html="issue.fields['Author']" v-if="issue.fields['Author']"
        >
        </div>

      </div>


    </div>

  </div>

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

    getRequests(issue) {
      const requests = this.$cytosis.getLinkedRecords(issue.fields['Requests'], this['Updates'], true)
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
      return this.getRequests.length > 0 || this.getUpdates.length > 0 || this.getJobs.length > 0
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

