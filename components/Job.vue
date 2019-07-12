
<template>

  <div class="Job">
    <div class="Job-meta">

      <div class="Job-meta _grid-3-1 _grid-gap-small _align-bottom _margin-bottom-half">
        <div>
          <div v-if="getAttachment(job)" class="Job-org-logo _margin-bottom-half" >
            <img :src="getAttachment(job)" alt="Job logo">
          </div>
          <div class="">
            <span class="_tag --highlight">{{ job.fields['JobType'] }}</span> <span v-for="tag of job.fields['Tags']" :key="tag" class="_tag --nowrap">{{ tag }}</span>
            <span v-if="getJobStatus(job)" class="Job-status _tag --nowrap">{{ getJobStatus(job) }}</span>
          </div>
        </div>
        <div class="Job-date _right-sm _font-small _padding-bottom-quart">
          Added {{ job.fields['PostedDate'] | dateTo }}
        </div>
      </div>
    </div>

    <div class="Job-org">
      <a v-if="getJobStatus(job) != 'Expired' && getJobLink(job) != false " :href="getJobLink(job)" class="Job-link"> 
        <h4 class="Job-title">{{ job.fields['Name'] }}</h4>
      </a>
      <div v-else class="Job-link">
        <h4 class="Job-title">{{ job.fields['Name'] }}</h4>
      </div>
    </div>

    <div class="_grid-3-2 _grid-gap-none">
      <div>
        <div v-if="job.fields['OrgUrl']">
          <a :href="job.fields['OrgUrl']" class="Job-org _font-bold" target="_blank">{{ job.fields['Org'].join(', ') }}</a>, <span v-if="job.fields['Location']" class="Job-location _inline-block">{{ job.fields['Location'] }}</span>
        </div>
        <div v-else>
          <strong class="Job-org" >{{ job.fields['Org'].join(', ') }}</strong>, <span v-if="job.fields['Location']" class="Job-location _inline-block">{{ job.fields['Location'] }}</span>
        </div>
      </div>

      <div v-if="job.fields['Supervisor']" class="Job-supervisor _right-sm">
        <div>{{ job.fields['Supervisor'] }}</div>
      </div>
    </div>

    <div class="Job-description --short _padding-top " v-html="$md.render(job.fields['Markdown'] || '')" />

    <!-- <div v-if="getJobStatus(job) != 'Expired'" class="Job-apply _wordbreak-link" v-html="$md.render(job.fields['ApplyNotes'] || '')" /> -->

    <!-- buttons to apply / more -->
    <div v-if="getJobStatus(job) != 'Expired' && job.fields['URL']" class="Job-action ">
      <!-- <a v-if="job.fields['URL']" :href="job.fields['URL']" class="Job-action-apply CTA _button --short _margin-bottom-none _margin-right-half">Apply</a> -->
      <a v-if="job.fields['URL']" :href="job.fields['URL']" class="Job-action-apply CTA _button --short --outline _margin-bottom-none _margin-right-half" target="_blank">More Details</a>
      <!-- <a v-if="job.fields['DetailsUrl']" :href="job.fields['DetailsUrl']" class="Job-action-apply CTA _button --outline --short _margin-bottom-none _margin-right-half">More Details</a> -->
      <!-- expiration date -->
      <span v-if="job.fields['ExpirationDate']" class="Job-expiry _font-small --nowrap">
        Last day to apply: <span class="_font-bold">{{ job.fields['ExpirationDate'] | niceDate }} </span>
      </span>
    </div>

  </div>

</template>


<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'job': Object,
  },

  methods: {
    getAttachment(job) {
      // currently only works for the first attachment
      if(job.fields['Attachments']) {
        // console.log('attachments', job.fields['Attachments'][0]['url'])
        return job.fields['Attachments'][0]['url']
      }
    },

    getJobLink(job) {
      // if (job.fields['DetailsUrl'])
      //   return job.fields['DetailsUrl']

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

  }

}
</script>

