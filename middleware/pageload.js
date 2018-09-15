
/*

  Should be run on every page load
  - Manages the inter-page search string
  - Manages Phage Directory data (hydrates the db @ SSR and redirect)

*/

import _ from 'lodash'

export default async function ({route, env, store}) {
  const routeName = route.name;
  // console.log('pageload ctx:', context);

  if(routeName != 'phages' && routeName != 'labs') {
  // console.log('clear search.');
    store.dispatch('update', 
      {search: {
          string: '',
          url: ''
        }
      }
    )
  }

  console.log('pageload:', process.server, process.client, process.static)

  async function loadDataOnServer() {
    // Load static data
    // await store.dispatch('loadCytosis', {
    //   env,
    //   tableIndex: 'static',
    // })

    if(process.server) {
      // checks to prevent over-eager fetching?
      let staticData, dynamicData
      if(!store.state.Content) {
        staticData = store.dispatch('loadCytosis', {
          env,
          tableIndex: 'static',
        })
      }

      // Load dynamic data
      // checks to prevent over-eager fetching?
      // if(!store.state.Organizations)
      // const cytosis = await store.dispatch('loadCytosis', {
      if(!store.state.Organizations) {
          dynamicData = store.dispatch('loadCytosis', { // maybe don't want other things to wait?
            env,
            tableIndex: 'dynamic',
          })
      }

      // const results = await Promise.all([staticData, dynamicData])
      return Promise.all([staticData, dynamicData])
    }
  }

  // only do it on server-side
  // static is loaded on client on every page load/refresh, dynamic is only on generation
  return loadDataOnServer();

  // loads once on client; if cytosis exists it'll 
  // loadOnce();

  // clear search if we're not on a directory page

  // Populate Phage Directory 
  // If the user is not authenticated
  // if (!store.state.authenticated) {
  //   return redirect('/login')
  // }
}



