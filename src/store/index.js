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

var localSettingStr = localStorage.getItem('setting')
var localSetting = {}
if ( localSettingStr === null ) {
  localSetting = {
    playSound: true,
    playBgm: true,
    bgmVolume : 100,
    soundVolume: 100,
    youTurnVoice: false,
    textToPlayer: 
    [
      { id: 10, music: "10", text: "收"}, 
      { id: 5, music: "5", text: "小小小"}, 
      { id: 7, music: "7", text: "求师傅"}, 
      { id: 8, music: "8", text: "求拉满"}, 
      { id: 9, music: "9", text: "求转向"},
      { id: 1, music: "1", text: "你的牌打得太好了"}, 
      { id: 2, music: "2", text: "我等得花儿都谢了"}, 
      { id: 3, music: "3", text: "合作愉快"}, 
    ],
    announceId: 0,
  }
}
else{
  localSetting = JSON.parse(localSettingStr)
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
    setting: localSetting,
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
    mutatePlayerLoc(state, payload){
      state.player_loc = payload
    },
    mutatePlayerStatus(state, payload){
      state.player_status = payload
    },
    mutateSetting(state, payload){
      state.setting = payload
    },
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
    mutatePlayerLoc({ commit } , payload){
      commit('mutatePlayerLoc' , payload)
    },
    mutatePlayerStatus({ commit } , payload){
      commit('mutatePlayerStatus' , payload)
    },
    mutateSetting({ commit } , payload){
      commit('mutateSetting' , payload)
      localStorage.setItem('setting', JSON.stringify(payload))
    },
  },
  modules: {
  }
})
