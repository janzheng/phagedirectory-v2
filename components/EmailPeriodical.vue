
<!-- 

  Mirrors Periodical.vue, but intended for mailchimp copy/pasting
  Some values are hard-coded, like colors etc. b/c email demabds it

 -->
<template>

  <div class="Periodical Email-section">

    <div  v-for="issue of issues" :key="issue.id" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished">

      <div>
        <span style="font-size:14px"><strong>{{ issue.fields['Name'] }}</strong>, {{ issue.fields['Date'] | niceDate }}</span><br />
        <span style="font-size:12px"><a :href="`${issue.fields['URL']}`" target="_blank">Read on Phage Directory</a></span>
      </div>

      <br />

      <div class="Periodical-type" v-if="issue.fields['IssueType']">
        <span class="_tag" style="background-color:#eeeeee; border-radius:4px; border:1px solid #eeeeee; color:#000000; display:inline-block; font-size:12px; outline:none!important; padding:1px 8px; text-decoration:none" >{{issue.fields['IssueType']}}</span>
      </div>
      
      <br />

      <div class="Email">
        <h1 class="Periodical-title" v-html="issue.fields['Title']"></h1>
        <br/>
        <h2 class="Periodical-lede" v-html="issue.fields['Lede']"></h2>
      </div>

      <br/><br/>

      <div class="Periodical-description _margin-bottom _md-p_fix" v-if="issue.fields['Intro']" style="box-shadow: 0px 4px 8px rgba(70, 70, 70, .1); color: #333333; background-color: #FCFCFC; border-radius: 4px; padding: 30px; margin-bottom: 15px;">
        <br />
        <div v-html="$md.render(issue.fields['Intro'] || '')"></div>
      </div>

      <br/><br/>

      <div class="Periodical-updates" v-if="getUpdates(issue)" style="box-shadow: 0px 4px 8px rgba(70, 70, 70, .1); color: #333333; background-color: #FCFCFC; border-radius: 4px; padding: 30px; margin-bottom: 15px;">
        <h4 class="Periodical-updates-title_">{{issue.fields['UpdatesTitle'] || 'What’s New'}}<br/>
        <span style="color:#fa5486">&mdash;</span></h4>
        <div class="Periodical-update-item _margin-bottom" v-for="update of getUpdates(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')"></div>
          <div class="_margin-top-half" v-if="update.fields['Tags']">
            <span v-for="tag of update.fields.Tags" :key="tag"><span style="background-color:#eeeeee; border-radius:4px; border:1px solid #eeeeee; color:#000000; display:inline-block; font-size:12px; outline:none!important; padding:1px 8px; text-decoration:none" :class="tag == 'Sponsor' ? '--sponsor' : ''" >{{ tag }}</span>&nbsp;</span>
          </div><br/>
        </div>
        <br/>

      </div>

      <div class="Jobs-updates" v-if="getJobs(issue).length>0" style="box-shadow: 0px 4px 8px rgba(70, 70, 70, .1); color: #333333; background-color: #EEFAFB; border-radius: 4px; padding: 30px; margin-bottom: 15px;">
        <h4 class="Jobs-updates-title_">{{issue.fields['JobsTitle'] || 'Job Board'}}<br/>
        <span style="color:#fa5486">&mdash;</span></h4>

        <div class="Jobs-update-item _margin-bottom" v-for="update of getJobs(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')"></div>
          <div class="_margin-top-half" v-if="update.fields['Tags']">
            <span v-for="tag of update.fields.Tags" :key="tag"><span style="background-color:#eeeeee; border-radius:4px; border:1px solid #eeeeee; color:#000000; display:inline-block; font-size:12px; outline:none!important; padding:1px 8px; text-decoration:none" :class="tag == 'Sponsor' ? '--sponsor' : ''" >{{ tag }}</span>&nbsp;</span>
          </div>
        </div>
      </div>


      <br/>

      <!-- twitter share on top -->
      <div class="Periodical-share _margin-bottom-2">
        <p class="Periodical-twitter">
          <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
          <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
        </p>
      </div>

      <br/>

      <div class="Periodical-content" v-if="issue.fields['Article']" style="box-shadow: 0px 4px 8px rgba(70, 70, 70, .1); color: #333333; background-color: #FCFCFC; border-radius: 4px; padding: 30px; margin-bottom: 15px;">
        <div v-html="$md.render(issue.fields['Article'] || '')" >
        </div>

        <br/>

        <!-- twitter share on bottom -->
        <div class="Periodical-share _margin-bottom-2" >
          <p class="Periodical-twitter">
            <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >
            <a :href="getTwitterLink(issue)" >Tweet this issue!</a>
          </p>
        </div>

        <br/>

        <div class="Periodical-author" style="color: #333333; background-color: #F7F7F7; border-radius: 4px; padding: 30px; margin-bottom: 15px;"
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

