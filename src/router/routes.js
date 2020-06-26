
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'aplication/:id', name: 'aplication', component: () => import('pages/Aplication.vue') },
      { path: 'upload', component: () => import('pages/AppUpload.vue') },
      { path: 'store', component: () => import('pages/Store.vue') },
      { path: 'tool', component: () => import('pages/Tool.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
