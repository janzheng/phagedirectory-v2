



export default ({ app, env, store }, inject) => {

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
    }

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

