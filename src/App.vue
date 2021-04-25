<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
    <MusicModule></MusicModule>
  </div>
</template>

<script>
import { playBgm } from './utils/soundHandler'
import {authorization} from './api/authorization'
import { getToken } from './utils/cookie'
import MusicModule from './components/topPage/MusicModule'

export default {
  
  created: function(){
    if(!getToken()){
      if(this.$route.path !== '/login'){
         this.$router.push({name: 'Login'})
      }
      return
    }
    authorization()
    .then(( res ) => {
        this.$store.dispatch('initialization', res.account)
        if(this.$route.path === '/chatroom'){
          return
        }
        this.$router.push({name: 'ChatRoom'})
    })
    .catch(() => {})
  },

  mounted: function(){
    window.addEventListener("click",this.registerEffectAudio,false)
  },

  methods:{
    registerEffectAudio: function(){
      const audio = document.querySelector('#audio')
      audio.play()
      playBgm(true) // 第一次调用该方法，参数传true
      window.removeEventListener("click",this.registerEffectAudio)
    }
  },

  components:{
    MusicModule,
  },
}
</script>