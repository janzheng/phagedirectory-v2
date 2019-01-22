
<template>

  <div class="CommunityPost">

    <div class="CommunityPost-header ">
      <div class="CommunityPost-meta _grid-4-1 _align-bottom _margin-bottom-half _grid-gap-small">
        <div class="">
          <div class="CommunityPost-tags">
            <span v-if="post.fields['Type']" class="CommunityPost-type _tag --highlight ">{{ post.fields['Type'] }}</span>
            <span v-for="tag of post.fields['Tags']" :key="post.id + tag" class="CommunityPost-tag _tag">{{ tag }}</span>
          </div>
        </div>
        <div class="CommunityPost-date _right-sm _font-small">Posted {{ post.fields['PostedDate'] | dateTo }}</div>
      </div>
      <div class="CommunityPost-title _font-bold _margin-top-half _margin-bottom">
        <h4 v-if="post.fields['Title']" class="_inline">{{ post.fields['Title'] }}</h4> 
        <span v-if="post.fields['Org']" class="CommunityPost-org"> — 
          <a v-if="post.fields['OrgUrl']" :href="post.fields['OrgUrl']">{{ post.fields['Org'] }}</a>
          <span v-else>{{ post.fields['Org'] }}</span>
        </span>
      </div>
      <div v-if="post.fields['URL'] || post.fields['Location'] || post.fields['PersonName'] " class="CommunityPost-info _margin-bottom">
        <div v-if="post.fields['PersonName']">Name: <strong>{{ post.fields['PersonName'] }}</strong></div>
        <div v-if="post.fields['Location']">Location: <strong>{{ post.fields['Location'] }}</strong></div>
        <div v-if="post.fields['URL']" class="_wordbreak">Website: <a :href="post.fields['URL']"><strong>{{ post.fields['URL'] }}</strong></a></div>
      </div>
    </div>

    <div class="CommunityPost-content">
      <div v-html="$md.render(post.fields['Markdown'] || '')" />
    </div>

  </div>

</template>


<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'post': Object,
  },

  methods: {
    getAttachment(post) {
      // currently only works for the first attachment
      if(post.fields['Attachments']) {
        // console.log('attachments', post.fields['Attachments'][0]['url'])
        return post.fields['Attachments'][0]['url']
      }
    },

    getPostLink(post) {
      if (post.fields['DetailsUrl'])
        return post.fields['DetailsUrl']

      if (post.fields['URL'])
        return post.fields['URL']

      return false
    },

    showPost(post) {
      if (!post.fields['isPublished'])
        return undefined 

      if (Date(post.fields['ExpirationDate']) < Date.now())
        return undefined 

      return true
    },

  }

}
</script>

