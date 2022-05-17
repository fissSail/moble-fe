import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import userInfo from './modules/userInfo.js'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
	userInfo
  },
  getters
})

export default store
