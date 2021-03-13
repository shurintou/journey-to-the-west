import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var isMobile = false
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {  
    isMobile = true
}  
else {  
    isMobile = false
}  

export default new Vuex.Store({
  state: {
    id: 0,
    username: '',
    avatar_id: 0,
    nickname: '',
    isMobile: isMobile ,
    player_loc: 0,  //0为游戏大厅，其余为游戏房间号
    player_status: 0, //0空闲1等待2忙碌
  },
  mutations: {
    initialization(state, payload){
      state.id = payload.id
      state.username = payload.username
      state.avatar_id = payload.avatar_id
      state.nickname = payload.nickname
    },
    mutateNickname(state, payload){
      state.nickname = payload
    },
    mutateAvatarId(state, payload){
      state.avatar_id = payload
    },
    mutatePlyaerLoc(state, payload){
      state.player_loc = payload.player_loc
    },
    mutatePlyaerStatus(state, payload){
      state.player_status = payload.player_status
    }
  },
  actions: {
    initialization({ commit } , payload){
      commit('initialization' , payload)
    },
    mutateNickname({ commit } , payload){
      commit('mutateNickname' , payload)
    },
    mutateAvatarId({ commit } , payload){
      commit('mutateAvatarId' , payload)
    },
    mutatePlyaerLoc({ commit } , payload){
      commit('mutatePlyaerLoc' , payload)
    },
    mutatePlyaerStatus({ commit } , payload){
      commit('mutatePlyaerStatus' , payload)
    },
  },
  modules: {
  }
})
