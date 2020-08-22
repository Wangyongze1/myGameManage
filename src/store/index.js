import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  playSong: '',
  songList: ['../../../static/music/Daisy.mp3', '../../../static/music/Trouble Maker.mp3',
    '../../../static/music/井内舞子 - ヒナギク.mp3', '../../../static/music/山下康介 - 恋路探し.mp3',
    '../../../static/music/花澤香菜 - あした来る日.mp3', '../../../static/music/西村由紀江 - 时の薫り.mp3']
}
const mutations = {
  changePlay (state, changName) {
    state.playSong = changName
  }
}

export default new Vuex.Store({
  state,
  mutations
})
