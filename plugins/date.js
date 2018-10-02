
import Vue from 'vue'
import moment from 'moment'

Vue.filter('niceDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM Do, YYYY')
  }
});