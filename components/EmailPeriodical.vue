
<!-- 

  Mirrors Periodical.vue, but intended for mailchimp copy/pasting
  Some values are hard-coded, like colors etc. b/c email demabds it

 -->
<template>

  <section class="Email">

    <div  v-for="issue of issues" :key="issue.id" v-if="(showPreview && issue.fields.isPreview) || issue.fields.isPublished">

      <div style="box-shadow: 0px 4px 8px rgba(70, 70, 70, .1); color: #333333; background-color: #FCFCFC; border-radius: 4px; padding: 30px; margin-bottom: 15px;">
        <div class="Periodical-description _margin-bottom-2" v-html="$md.render(issue.fields['Markdown'] || '')"></div>

        <!-- twitter share on top -->
        <div class="Periodical-share" v-if="issue.fields['TwitterText']">
          <p class="Periodical-twitter">
            <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >&nbsp;
            <a :href="`https://twitter.com/intent/tweet?text=${issue.fields['TwitterText']}`" >Tweet this issue!</a>
          </p>
        </div>
      </div>

      <br/><br/>

      <div class="Periodical-updates" v-if="getUpdates(issue)" style="box-shadow: 0px 4px 8px rgba(70, 70, 70, .1); color: #333333; background-color: #FCFCFC; border-radius: 4px; padding: 30px; margin-bottom: 15px;">
        <h3 class="Periodical-updates-title_">{{issue.fields['UpdatesTitle'] || 'What’s New'}}<br/>
        <span style="color:#fa5486">&mdash;</span></h3>
        <div class="Periodical-update-item _margin-bottom" v-for="update of getUpdates(issue)" :key="update.fields['Name']" v-if="update && update.fields['isPublished']">
          <div class="_md-p_fix" v-html="$md.render(update.fields['Markdown'] || '')"></div>
          <div class="_margin-top-half" v-if="update.fields['Tags']">
            <span v-for="tag of update.fields.Tags" :key="tag"><span style="background-color:#eeeeee; border-radius:4px; border:1px solid #eeeeee; color:#000000; display:inline-block; font-size:12px; outline:none!important; padding:1px 8px; text-decoration:none" :class="tag == 'Sponsor' ? '--sponsor' : ''" >{{ tag }}</span>&nbsp;</span>
          </div><br/>
        </div>
        <br/>
        <hr style="border-color: #fa5486; border-width: 2px; border-style: solid" />
      </div>

      <br/><br/>

      <div class="Periodical-content" v-if="issue.fields['ArticleContent']" style="box-shadow: 0px 4px 8px rgba(70, 70, 70, .1); color: #333333; background-color: #FCFCFC; border-radius: 4px; padding: 30px; margin-bottom: 15px;">
        <div v-html="$md.render(issue.fields['ArticleContent'] || '')" >
        </div>

        <br/><br/>

        <!-- twitter share on bottom -->
        <div class="Periodical-share" v-if="issue.fields['TwitterText']">
          <p class="Periodical-twitter">
            <img src="https://abs.twimg.com/errors/logo23x19@2x.png" width="23px" height="19px" >&nbsp;
            <a :href="`https://twitter.com/intent/tweet?text=${issue.fields['TwitterText']}`" >Tweet this issue!</a>
          </p>
        </div>
      </div>


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

