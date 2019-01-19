<template>

  <div class="Community _section-page _margin-center">

    <div class="_section-content _margin-center">
      <div class="_padding-bottom" v-html="$md.render(intro || '')" />
    </div>

    <div class="_section-content _margin-center">
      <div class="_padding-bottom" v-html="$md.render(content || '')" />
      <!-- <SignupAlert class="_section-article _margin-center" /> -->
    </div>

    <div class="Capsid-community">
      <div class="_grid-3-2-xs">
        <h4 class="Capsid-new-title">Community Board</h4>
        <div class="Capsid-community-cta _right">
          <div><a href="mailto:board@phage.directory?subject=Phage Directory Community Board&body=Hi Phage Directory, I'd like to post a thing to your community board ...">Post an item</a></div>
        </div>
      </div>
      <!-- <div class="Capsid-community-description" v-html="$md.render(content || '')"/> -->
      <div v-for="community of getCommunity()" v-if="request && request.fields['isPublished']" :key="request.fields['Name']" class="Capsid-community-item" >
        <div v-if="request.fields['Date'] || request.fields['Category']" class="Capsid-community-itemheader" ><span v-if="request.fields['Category']" class="_md-p_fix _font-small _font-bold">{{ request.fields['Category'] }}</span><span v-if="request.fields['Date']" class="_md-p_fix _font-small _margin-bottom-half" >{{ request.fields['Date'] }}</span></div>
        <div class="_md-p_fix" v-html="$md.render(request.fields['Markdown'] || '')" />
        <div v-if="request.fields['Tags']" class="_margin-top-half" >
          <span v-for="tag of request.fields.Tags" :key="tag" :class="tag == 'Sponsor' || tag == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag" >{{ tag }}</span>
        </div>
      </div>
      <div v-if="getCommunity(issue).length == 0" class="Capsid-community-empty" v-html="$md.render(emptyCommunity || '')" />
    </div>


<!-- 
    <div class="Alerts-container _section-content _margin-center">
      <div v-for="alert of Alerts" v-if="alert.fields.isPublished" :key="alert.fields.Name" :class="alert.fields.Status" class="Alerts-item _section-article _margin-center _card _padding-2" >
        <div class="Alerts-status" >
          <div class="_grid-auto-1-xs _align-vertically">
            <span :class="alert.fields.Status" class="Alerts-status-tag" >{{ alert.fields.Status }}</span>
            <span class="_right">{{ alert.fields.Date | niceDate }}</span>
          </div>
        </div>
        <div class="Alerts-title" v-html="$md.render(alert.fields.Name)" />
        <div class="Alerts-tags">
          <span v-for="tag of alert.fields.Tags" :key="tag" class="Alerts-tag _tag" >
            {{ tag }}
          </span>
        </div>
        <div class="Alerts-content " v-html="$md.render(alert.fields.Markdown || '')" />
      </div>
    </div>
 -->
  </div>

</template>

<script>

import SignupAlert from '~/components/SignupAlert.vue'
import { mapState } from 'vuex'

export default {
  head () {
    const title = "Phage Alerts"

    return {
      title,
    }
  },

  components: {
    SignupAlert
  },
  
  layout: 'contentframe',
  middleware: 'pageload',

  // async asyncData({env, route, store}) {
  //   return {
  //   }
  // },

  data: function () {
    return {
      intro: this.$cytosis.find('Content.community-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      content: this.$cytosis.find('Content.community-content', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // alert: undefined, // loaded in 'mounted'
    }
  },

  computed: {
    ...mapState([
      'Content',
      'Updates'
      ]),
  },

  mounted: async function () {
    // const slug = unescape(this.$route.params.slug)
    // const alert = this.cytosis.find(slug, [this.Alerts], ['Slug'])[0]
    // if (alert && alert.fields.isPublished)
    //   this.alert = alert
  },

  methods: {
    getCommunity() {
      console.log('community:', this['Updates'])
      // const requests = this.$cytosis.getLinkedRecords(issue.fields['Community'], this['Updates'], true)
      // console.log('get updates:', updates)
      // return requests || undefined
    },
  }

}
</script>

<style lang="scss" scoped>

</style>

