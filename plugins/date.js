
import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('niceDate', function(value) {
  if (value) {
    return dayjs(String(value)).format('MMMM D, YYYY')
  }
})