import Vue from 'vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import auth from './module-example/auth'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
