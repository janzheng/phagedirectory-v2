
import Vuex from 'vuex'
import _ from 'lodash'

const createStore = () => {
  return new Vuex.Store({
    state: { 
    },

    mutations: {

      setElement (state, el) {
        state.element = el
      },
      // generalized mutator for changing store
      // update (state, {name, payload}) {
      update (state, payload) {
        // takes: {stateName: payloadobject}
        // _this.$store.dispatch('update', { "enums.OVERFLOW": value})
        // future (multiple):  [{stateName: payloadobject}, {stateName: payloadobject})
        // console.log('mutate update')

        if (typeof(payload) == 'array') {
          for (n of payload) {
            // type 2: array of key/val pairs
            const name = Object.keys(payload)[n][0]
            const value = Object.values(payload)[n][0]

            // debug('Store.update', 'Updating:', name, payload, state)
            if(state[name] !== undefined) {
              state[name] = value
              setLocalState(state)
            } else {
              // console.log('Store update failed; object doesn’t exist for', name, state)
              debug('Store.update', 'Failed: object doesn’t exist:', name, value, state)
            }
          }
        } else {
          const name = Object.keys(payload)[0]
          const value = Object.values(payload)[0]

          // type 2: name is "fruit.orange" we only want to edit the orange
          /*
            _this.$store.dispatch('update', {
                "enums.OVERFLOW": value
              }, true)
          */
          if(name.indexOf('.') > 0) {
            let substate = state
            let nameList = name.split('.')
            nameList.map((o) => {
              if(typeof(substate[o]) == 'object') {
                // console.log('popopopo')
                substate = substate[o]
              } else if(typeof(substate[o]) == 'undefined'){
                // console.log('wawawawa')
                substate[o] = {}
              }
            })
            substate[nameList[nameList.length-1]] = value

            // console.log('new state:', substate, state)
            return true
          }
          // type 1: only one key/val pair — this enforces checking for existence
          // replaces the whole object

          // debug('Store.update', 'Updating:', name, payload, state)
          if(state[name] !== undefined) {
            state[name] = value
            setLocalState(state)
          }
          else
            // console.log('Store update failed; object doesn’t exist for', name, state)
            debug('Store.update', 'Failed: object doesn’t exist:', name, value, state)
        }
      },
      // generalized mutator for creating or updating new value
      updateCreate (state, payload) {
        // like update, but creates the object at location if it doesn't exist
        // basically like create w/o the checker
        // USE THIS SPARINGLY, most likely a state obj doesn't exist b/c of typo or race condition
        // if(!silent)
        // debug('Store.updateCreate', 'Creating', payload, state)
        console.log('UPDATECREATE', payload)

        // iterator 
        Object.keys(payload).map((name, i) => {
          // const value = Object.values(payload)[0]
          // preserve things like functions, not just data w/ object.create
          state[name] = payload[name]
        })

        // single object
        // const name = Object.keys(payload)[0]
        // const value = Object.values(payload)[0]
        // state[name] = value
      },
      // clear (or reset) an object (esp. used on update)
      clear (state, {name}) {
        debug('Store.clear', 'Clearing:', name)
        if(state[name] !== undefined) {
          state[name] = undefined
        }
        else
          // console.log('Store clear failed; object doesn’t exist for', name)
          debug('Store.clear', 'Store clear failed; object doesn’t exist for', name)
      },

    },

    actions: {
      // sets base app element (#atlx-data-app) as state.element
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



  })
}

export default createStore






const emit = function (evtName, data) { // replaces entire dance object
  window.dispatchEvent( new CustomEvent(evtName, {detail: data}));
}

const debouncedUpdate = _.debounce(function(commit, object){
  // console.log('update debounced!')
  commit('update', object)
}, 1800)
