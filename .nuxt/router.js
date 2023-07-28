import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _61aad42f = () => interopDefault(import('../pages/createUser.vue' /* webpackChunkName: "pages/createUser" */))
const _491d5f2f = () => interopDefault(import('../pages/machine.vue' /* webpackChunkName: "pages/machine" */))
const _f38cace4 = () => interopDefault(import('../pages/manual.vue' /* webpackChunkName: "pages/manual" */))
const _b062de2a = () => interopDefault(import('../pages/mode.vue' /* webpackChunkName: "pages/mode" */))
const _4c8aaffc = () => interopDefault(import('../pages/report.vue' /* webpackChunkName: "pages/report" */))
const _864621da = () => interopDefault(import('../pages/user.vue' /* webpackChunkName: "pages/user" */))
const _c5fa8b8c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/createUser",
    component: _61aad42f,
    name: "createUser"
  }, {
    path: "/machine",
    component: _491d5f2f,
    name: "machine"
  }, {
    path: "/manual",
    component: _f38cace4,
    name: "manual"
  }, {
    path: "/mode",
    component: _b062de2a,
    name: "mode"
  }, {
    path: "/report",
    component: _4c8aaffc,
    name: "report"
  }, {
    path: "/user",
    component: _864621da,
    name: "user"
  }, {
    path: "/",
    component: _c5fa8b8c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
