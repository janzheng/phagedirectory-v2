

// loads from a specific query / useful for selective content
export async function loadQuery(env, store, routeName, query) {
  let data
  // todo: need some other way to keep track of what we've grabbed
  // esp. important for site generation
  // if(store.state && !store.state.Content) {
  console.log('load cytosis by query:', query, ' route:', routeName)
  data = await store.cache.dispatch('loadCytosis', {
    env,
    tableQuery: query,
    caller: routeName
  })
  // }
  return data
}

export function loadAll(env, store, routeName='') {
  let data
  if(store.state && !store.state.Content) {
    console.log('load cytosis: all')
    data = store.cache.dispatch('loadCytosis', {
      env,
      tableQuery: '_all',
      caller: routeName
    })
  }
  return data
}

export function loadStatic(env, store, routeName='') {
  let data
  if(store.state && !store.state.Content) {
    console.log('load cytosis: static')
    data = store.cache.dispatch('loadCytosis', {
      env,
      tableQuery: 'static',
      caller: routeName
    })
  }
  return data
}

export function loadDynamic(env, store, routeName='') {
  let data
  if(store.state && !store.state.Organizations) {
    console.log('load cytosis: dynamic')
    data = store.cache.dispatch('loadCytosis', { // maybe don't want other things to wait?
      env,
      tableQuery: 'dynamic',
      caller: routeName
    })
  }
  return data
}


export function loadNewsItem(env, store, routeName='', title) {
  let data
  if(store.state && !store.state['C&T']) {
    console.log('load cytosis: news')
    data = store.cache.dispatch('loadCytosis', { // maybe don't want other things to wait?
      env,
      tableQuery: 'capsid',
      caller: routeName
    })
  }
  return data
}

export function loadNews(env, store, routeName='') {
  let data
  if(store.state && !store.state['C&T']) {
    console.log('load cytosis: news')
    data = store.cache.dispatch('loadCytosis', { // maybe don't want other things to wait?
      env,
      tableQuery: 'capsid',
      caller: routeName
    })
  }
  return data
}

export function loadLatestNews(env, store, routeName='') {
  let data
  if(store.state && !store.state['C&T']) {
    console.log('load cytosis: news')
    data = store.cache.dispatch('loadCytosis', { // maybe don't want other things to wait?
      env,
      tableQuery: 'capsid',
      caller: routeName,
    }, {
      maxRecords: 1,
    })
  }
  return data
}

