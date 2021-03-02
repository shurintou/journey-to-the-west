<template>
    <el-aside class="hide-scroll-bar" :width="subAsideWidth" :style="{backgroundImage: 'url(' + verticalBackground + ')'}">
        <el-tooltip :disabled="false" effect="light" content="点击以设置头像" placement="top">
          <div class="player-icon-box" @click="openIconSelectDialog">
            <el-image class="aside-icon" :src="getIconUrl(temIconId)"></el-image>
          </div>
        </el-tooltip>
        <div class="player-nickname-box" :style="{'font-size': fontSize}">
          <span>啊啊啊啊啊</span>
        </div>
        <div class="player-setting-box">
          <el-button class="setting-button" :style="{'font-size': fontSize}" type="info" icon="el-icon-view">查看</el-button>
          <el-button class="help-button" :style="{'font-size': fontSize}" type="warning" icon="el-icon-s-opportunity">帮助</el-button>
        </div>

        <el-dialog title="设置头像" :visible.sync="iconDialogVisible" center="true" :width="dialogWidth">
          <el-divider></el-divider>
          <div class="icon-select-box">
            <div class="icon-block" :class="{'icon-is-selected': temIconId === n}" v-for="n in iconNum" :key="n" @click="selectIcon(n)">
              <el-image :src="getIconUrl(n)" :fit="'fill'"></el-image>
            </div>
          </div>
          <span slot="footer">
            <el-button @click="iconDialogVisible = false" style="margin-right:10%">取消</el-button>
            <el-button type="primary" @click="submitNewIcon()">确定</el-button>
          </span>
        </el-dialog>
    </el-aside>
</template>

<script>
export default {

    data(){
      return {
        iconDialogVisible: false,
        /* 头像数量 */
        iconNum: 35,
        /* 暂时选择的头像Id */
        temIconId: 0,
      }
    },

    props:{
        subAsideWidth: {type: String, default: ''},
        verticalBackground: {type: String, default: ''},
        fontSize: {type: String, default: ''},
        dialogWidth: {type: String, default: ''},
    },

    methods:{
        getIconUrl: function(n){
          return require("@/assets/images/avatar_" + n + "-min.png")
        },

        openIconSelectDialog: function(){
          this.iconDialogVisible = true
          /* Vuex存的头像Id */
          // this.temIconId = 
        },

        selectIcon: function(n){
          this.temIconId = n
        },

        submitNewIcon: function(){
          /* 向服务器提交新头像 */
        },
    },
}
</script>

<style>
 .player-icon-box{
    width: 70%;
    height: 35%;
    margin-top: 4%;
    margin-left: 15%;
    border-radius: 5%;
    border-width: 5px;
    border-color: #e3e197;
    background-size: 100% 100%;
    background-image: url('../../assets/images/icon_background-min.png');
  }

  .player-icon-box:hover{
    cursor: pointer;
  }

  .player-nickname-box{
    width: 85%;
    height: 15%;
    margin-top: 3%;
    margin-left: 7%;
    border-radius: 5px;
    border-style: solid;
    border-color: #e3e197;
    background-color: #ffffdd;
    text-align: center;
    padding-top: 5%;
    font-weight: 600;
    background-image: url('../../assets/images/icon-background-min.png');
    background-size: cover;
  }

  .player-setting-box{
    width: 85%;
    height: 20%;
    margin-top: 5%;
    margin-left: 7%;
  }
  
  .setting-button{
    height: 100%;
    float: left;
    width: 45%;
    padding: 0px;
  }

  .help-button{
    height: 100%;
    float: right;
    width: 45%;
    padding: 0px;
  }


  .aside-icon{
     width: 70%; 
     height: 80%; 
     margin-left: 15%;
     margin-top: 5%;
  }

  .icon-select-box{
    background-image: url('../../assets/images/icon-select-background.png');
    background-size: 100% 100%;
  }

  .icon-is-selected{
    background-image: url('../../assets/images/icon-select-circle.png');
    background-size: 100% 100%;
  }

  .icon-block{
    margin: 2%;
    padding:2% 0;
    width: 15%;
    display: inline-block;
  }

  .icon-block{
    cursor: pointer;
  }
</style>