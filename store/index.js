
import Vuex from 'vuex'
import _ from 'lodash'

import vuexCache from 'vuex-cache'

import state from './state.js';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    plugins: [vuexCache],
  })
}

export default createStore
