<template>
  <div id="app">
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import {authorization} from './api/authorization'
import { getToken } from './utils/cookie'

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
        if(this.$route.path === '/chatroom' || this.$route.path === '/gameroom' ){
          return
        }
        this.$router.push({name: 'ChatRoom'})
    })
    .catch(() => {})
  }
}
</script>