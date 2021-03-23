<template>
    <div id="game-room-box-horizontal">
        <div id="game-room-box-horizontal-header">
            <div class="game-room-box-horizontal-header-item" style="margin-left: 15%;">6</div>
            <div class="game-room-box-horizontal-header-item">5</div>
            <div class="game-room-box-horizontal-header-item">4</div>
        </div>
        <div id="game-room-box-horizontal-body">
            <div class="game-room-box-horizontal-body-aside" style="float: left;">
                <div class="game-room-box-horizontal-body-aside-item-top">7</div>
                <div class="game-room-box-horizontal-body-aside-item-bottom">8</div>
            </div>
            <div id="game-room-box-horizontal-body-table"> 
            </div>
            <div class="game-room-box-horizontal-body-aside" style="float: right;">
                 <el-tooltip effect="light" placement="top-start" :manual="true" v-model="dis">
                    <div slot="content">
                        <el-alert
    title="成功提示的文案"
    type="success" :closable="false">
  </el-alert>
  <el-alert
    title="成功提示的文案"
    type="success" :closable="false">
  </el-alert>
                    </div> 
                    <div class="game-room-box-horizontal-body-aside-item-top">
                    3
                    </div>
                </el-tooltip>
                
                <div class="game-room-box-horizontal-body-aside-item-bottom">
                    2
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            dis: false,
        }
    },

    props:{
        playerLocRoom: { type: Object, default: null}
    }


}
</script>

<style>
    #game-room-box-horizontal{
        background-size: 80% 100%;
        background-repeat: no-repeat;
        background-position-x: center;
        background-position-y: 7vh;
        /* background-color: black; */
        background-image: url('../../assets/images/game-table.png');
        width: 100%;
        height: 100%;
    }

    #game-room-box-horizontal-header{
        width: 100%;
        height: 25%;   
    }

    .game-room-box-horizontal-header-item{
        margin-left: 12.5%;
        width: 15%;
        height: 100%;
        display: inline-block;
        background-color: red;
    }

    #game-room-box-horizontal-body{
        width: 100%; 
        height: 75%;
    }

    .game-room-box-horizontal-body-aside{
        width: 15%;
        height: 100%; 
        display: inline-block; 
    }

    .game-room-box-horizontal-body-aside-item-top{
        width: 100%;
        height: 33%; 
        margin-top: 10%; 
        background-color: red;
    }

    .game-room-box-horizontal-body-aside-item-bottom{
        width: 100%; 
        height: 33%; 
        margin-top: 35%; 
        background-color: red;
    }

    #game-room-box-horizontal-body-table{
        width: 70%; 
        height: 100%; 
        display: inline-block; 
        background-color: yellow
    }
</style>