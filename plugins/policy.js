


import Vue from 'vue'

// export default ({ app, env, store, route }, inject) => {
export default ({ env, store }) => {

  // window.onNuxtReady(() => {
  if(!process.server) {
    const browserPolicy = localStorage.getItem('pd-policy')
    // console.log('policy:', browserPolicy, env)

    // handle policy on client
    // lack of policy will trigger Policy module
    const currentPolicy = env.site_policy
    store.commit('setCurrentPolicy', currentPolicy)


    if(browserPolicy == currentPolicy) {
      store.commit('setPolicy', currentPolicy)

      console.log('enable ga (policy.js)', Vue.$ga)
      Vue.$ga.enable()
      // Vue.$ga("send", "pageview", route.path)

      return currentPolicy
    } 

    // disable if no policy
    Vue.$ga.disable()
    return undefined


    // if(!process.server) {
    //   context.store.commit('setPolicy', 'bananarama')
    //   const browserPolicy = localStorage.getItem('pd-policy')
    //   // if(browserPolicy == this.currentPolicy) {
    //   //   context.store.commit('setPolicy', currentPolicy)
    //   // }
    // }
  }
  // })
}

