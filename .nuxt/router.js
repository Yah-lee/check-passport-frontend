import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9f0d4dea = () => interopDefault(import('../pages/createUser.vue' /* webpackChunkName: "pages/createUser" */))
const _5c47305a = () => interopDefault(import('../pages/machine.vue' /* webpackChunkName: "pages/machine" */))
const _da36072c = () => interopDefault(import('../pages/manual.vue' /* webpackChunkName: "pages/manual" */))
const _7cae2a72 = () => interopDefault(import('../pages/mode.vue' /* webpackChunkName: "pages/mode" */))
const _593602d8 = () => interopDefault(import('../pages/report.vue' /* webpackChunkName: "pages/report" */))
const _bb823394 = () => interopDefault(import('../pages/test.vue' /* webpackChunkName: "pages/test" */))
const _52916e22 = () => interopDefault(import('../pages/user.vue' /* webpackChunkName: "pages/user" */))
const _8318c844 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _9f0d4dea,
    name: "createUser"
  }, {
    path: "/machine",
    component: _5c47305a,
    name: "machine"
  }, {
    path: "/manual",
    component: _da36072c,
    name: "manual"
  }, {
    path: "/mode",
    component: _7cae2a72,
    name: "mode"
  }, {
    path: "/report",
    component: _593602d8,
    name: "report"
  }, {
    path: "/test",
    component: _bb823394,
    name: "test"
  }, {
    path: "/user",
    component: _52916e22,
    name: "user"
  }, {
    path: "/",
    component: _8318c844,
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
