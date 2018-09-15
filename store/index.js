
import Vuex from 'vuex'
import _ from 'lodash'

import state from './state.js';
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

const createStore = () => {
  return new Vuex.Store({
    state,
    mutations,
    getters,
    actions
  })
}

export default createStore
