
// import Cytosis from 'cytosis'
import Cytosis from '~/other/cytosis'
import _ from 'lodash'


export default {
  // async loadCytosis ({ commit, state }, {env, tableIndex, options, caller}) {
  async loadCytosis ({ commit }, {env, tableIndex, options, caller}) {
    const airKey = env.airtable_api
    const airBase = env.airtable_base

    console.log(`[actions/loadCytosis] ${caller}: loading:`, tableIndex, options)
    let cytosis = await new Cytosis({
      airKey, 
      airBase, 
      tableIndex, 
      options
    })
    commit('setCytosis', cytosis)
    console.log(`[actions/loadCytosis] ${caller}: done.`)
    return Promise.resolve(cytosis)
  },


  // initializes the store
  setElement ({ commit }, el) { // replaces entire object
    commit('setElement', el)
  },
  update ({ commit }, object) {
    // generic mutator action
    // object is: {name: 'stateName', payload: {data} }

    // special rules
    // if updating settings, must clear the data
    // if(object.name == 'settings')
    //   commit('clear', {name: 'data'})

    commit('update', object)
  },
  debouncedUpdate ({ commit }, object) {
    debouncedUpdate(commit, object)
  },
  updateCreate ({ commit }, object) {
    commit('updateCreate', object)
  },
  clear ({ commit }, object) {
    // generic mutator action to clear something
    commit('update', object)
  },

}

// const emit = function (evtName, data) { // replaces entire dance object
//   window.dispatchEvent( new CustomEvent(evtName, {detail: data}))
// }

const debouncedUpdate = _.debounce(function(commit, object){
  // console.log('update debounced!')
  commit('update', object)
}, 1800)


