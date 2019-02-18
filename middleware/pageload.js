
/*

  Should be run on every page load
  - Manages the inter-page search string
  - Manages Phage Directory data (hydrates the db @ SSR and redirect)

*/

// import _ from 'lodash'

import {loadStatic, loadDynamic, loadQuery} from '~/other/loaders'
// import {loadStatic, loadDynamic, loadNews} from '~/other/loaders'

async function loadData(routeName, store, env) {
  // Load static data
  // await store.dispatch('loadCytosis', {
  //   env,
  //   tableQuery: 'static',
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
  //   tableQuery: 'news',
  // })

  // const results = await Promise.all([staticData, dynamicData])
  
  // return Promise.all([staticData, dynamicData]).then((results) => {
  //   console.log('loaded:', !!staticD, !!dynamicD)
  //   return Promise.resolve(results)
  // })
  // newsData = loadNews(env, store, routeName)

  return Promise.all([staticData, dynamicData])
  // return Promise.all([staticData, dynamicData, newsData])
  // }
}


async function loadQueryData(routeName, store, env, tableQuery) {
  let data
  data = await loadQuery(env, store, routeName, tableQuery)
  // console.log('[loadQueryData] data', data)
  return Promise.all([data])
}

// function loadServerData(routeName, store, env) {
//   const data = env.site_data
//   // store.commit('setCytosis', env.site_data)
//   console.log('Server Data loaded.')
//   return env.site_data
// }




export default async function ({route, env, store}) {
  const routeName = route.name || route.path

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

  // specific data requests can be set through meta: in page templates, to reduce server load
  let tableQuery, tableQueries
  route.meta.map((meta) => {
    tableQuery = meta.tableQuery
    tableQueries = meta.tableQueries
  })[0]



  // only do it on server-side
  // static is loaded on client on every page load/refresh, dynamic is only on generation
  
  // nuxt expects a promise for async middleware
  // const data = await loadDataOnServer()

  // if (process.server) {
  //   console.log('Server Pageload:', routeName, `[server:${process.server} / client:${process.client} / static:${process.static}]`)
  //   return loadServerData(routeName, store, env)
  // }
  // else {
    if (tableQuery) {
      // console.log('[pageload] table query', tableQuery)
      // loads data from airtable based on a partial query
      return loadQueryData(routeName, store, env, tableQuery)
    } else if (tableQueries) {
      
      const getData = async function() {
        // console.log('tableQueries... ', tableQueries)
        let queryData = tableQueries.map( (query) => {
          return loadQueryData(routeName, store, env, query)
        })
        return Promise.all(queryData)
      }

      const data = await getData()
      // console.log('finally', data.flat(2))
      return data

    } else {
      return loadData(routeName, store, env)
    }
  }
// }



