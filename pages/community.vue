<template>

  <div class="Community _section-page _margin-center">

    <div class="_section-content _margin-center">
      <div class="_padding-bottom" v-html="$md.render(intro || '')" />
      <div class="_padding-bottom" v-html="$md.render(content || '')" />
    </div>

    <!-- <div class="_section-content _margin-center"> -->
      <!-- <div class="_padding-bottom" v-html="$md.render(content || '')" /> -->
    <!-- </div> -->

    <!-- 

      Active Posts

    -->
    <div v-if="activePosts.length > 0" class="Community-active _section-content _margin-bottom-4 _margin-center">
      <div v-for="post of activePosts" v-if="showPost(post)" :key="post.id"
           :class="getPostStatus(post)">
        <CommunityPost :post="post" class="Community-post _card _margin-bottom _padding"/>
      </div>
    </div>

    <!-- 

      Expired Posts

     -->
    <div v-if="expiredPosts.length > 0" class="Community-expired _section-content _margin-bottom-4 _margin-center">
      <h6 class="Community-sectiontitle">Expired Posts</h6>
      <div v-for="post of expiredPosts" v-if="showPost(post)" :key="post.id"
           :class="getPostStatus(post)">
          <CommunityPost :post="post" class="Community-post _card _margin-bottom _padding"/>
      </div>
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

import CommunityPost from '~/components/CommunityPost.vue'
import { mapState } from 'vuex'

export default {
  head () {
    const title = "Community Board"

    return {
      title,
    }
  },

  components: {
    CommunityPost,
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
    }
  },

  computed: {
    ...mapState([
      'Content',
      'Updates',
      'Community',
      ]),

    activePosts() {
      let results = []
      for (let post of this.Community) {
        if(post.fields['Status'] != 'Expired') {
          results.push(post)
        }
      }
      return results
    },

    expiredPosts() {
      let results = []
      for (let post of this.Community) {
        if(post.fields['Status'] == 'Expired') {
          results.push(post)
        }
      }
      return results
    }
  },

  mounted: async function () {
  },

  methods: {
    getCommunity() {
      // console.log('community:', this['Community'])
      // const requests = this.$cytosis.getLinkedRecords(issue.fields['Community'], this['Updates'], true)
      // console.log('get updates:', updates)
      // return requests || undefined
      return this.Community
    },
    getAttachment(post) {
      // currently only works for the first attachment
      if(post.fields['Attachments']) {
        // console.log('attachments', post.fields['Attachments'][0]['url'])
        return post.fields['Attachments'][0]['url']
      }
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
  }

}
</script>

<style lang="scss" scoped>

</style>

