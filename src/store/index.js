import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  playSong: '',
  songList: []
}
const mutations = {
  changePlay (state, changName) {
    state.playSong = changName.toString()
  }
}

export default new Vuex.Store({
  state,
  mutations
})
