
/*

  Should be run on every page load
  - Manages the inter-page search string
  - Manages Phage Directory data (hydrates the db @ SSR and redirect)

*/

// import _ from 'lodash'

import {loadStatic, loadDynamic} from '~/other/loaders'

async function loadDataOnServer(routeName, store, env) {
  // Load static data
  // await store.dispatch('loadCytosis', {
  //   env,
  //   tableIndex: 'static',
  // })

  // if universal mode, don't load data when not server
  // if(process.mode == 'universal' && !process.server)
  //   return false;

  // console.log('loading cytosis. Data:', `Content:${!!store.state.Content}, Orgs:${!!store.state.Organizations}`)
  // if(process.server) {
  // checks to prevent over-eager fetching?
  // let staticData, dynamicData, newsData
  let staticData, dynamicData

  staticData = loadStatic(env, store, routeName)

  // Load dynamic data
  // checks to prevent over-eager fetching?
  // if(!store.state.Organizations)
  // const cytosis = await store.dispatch('loadCytosis', {
  dynamicData = loadDynamic(env, store, routeName)

  // newsData = store.dispatch('loadCytosis', { // maybe don't want other things to wait?
  //   env,
  //   tableIndex: 'news',
  // })

  // const results = await Promise.all([staticData, dynamicData])
  
  // return Promise.all([staticData, dynamicData]).then((results) => {
  //   console.log('loaded:', !!staticD, !!dynamicD)
  //   return Promise.resolve(results)
  // })

  return Promise.all([staticData, dynamicData])
  // }
}

export default function ({route, env, store}) {
  const routeName = route.name
  // console.log('pageload ctx:', context);

  // if(routeName != 'phages' && routeName != 'labs') {
  // // console.log('clear search.');
  //   store.dispatch('update', 
  //     {
  //       searchString: '',
  //       searchUrl: '',
  //     }
  //   )
  // }

  // add the external handler to store
  if(!store.state.ext_handler || store.state.ext_handler == '') {
    store.commit('update', {ext_handler: env.ext_handler})
  }

  // console.log('Pageload:', routeName, `[server:${process.server} / client:${process.client} / static:${process.static}]`)

  // only do it on server-side
  // static is loaded on client on every page load/refresh, dynamic is only on generation
  
  // nuxt expects a promise for async middleware
  // const data = await loadDataOnServer()
  return loadDataOnServer(routeName, store, env)

  // console.log('Pageload finished? new state:', `Content:${!!store.state.Content}, Orgs:${!!store.state.Organizations}`)
  // return true;

  // loads once on client; if cytosis exists it'll 
  // loadOnce();

  // clear search if we're not on a directory page

  // Populate Phage Directory 
  // If the user is not authenticated
  // if (!store.state.authenticated) {
  //   return redirect('/login')
  // }
}



