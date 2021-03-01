<template>
    <el-aside class="hide-scroll-bar" :width="subAsideWidth" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">
        <div class="player-box">
        <el-image class="aside-icon" :src="require('@/assets/images/avatar_15-min.png')"></el-image>
        </div>
    </el-aside>
</template>


<script>
export default {
    props:{
        subAsideWidth: {type: String, default: ''},
        verticalBackground: {type: String, default: ''},
    },

    mounted: function(){
        console.log(this.ws)
    }
}
</script>

<style>
 .player-box{
    width: 70%;
    height: 35%;
    margin-top: 6%;
    margin-left: 15%;
    border-radius: 50%;
    background-color: #F4EEE0;
    background-size: 100% 100%;
    background-image: url('../assets/images/icon-background-min.png');
  }

  .aside-icon{
     width: 70%; 
     height: 80%; 
     margin-left: 15%;
     margin-top: 5%;
  }
</style>