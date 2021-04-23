<template>
    <div>
        <div class="setting_item">
            <div>
                <span :style="{'font-size': fontSize}">背景音乐</span>
                <el-switch style="float: right" v-model="backgroundMusic" active-color="#13ce66" inactive-color="#ff4949" @change="setBgm"></el-switch>
            </div>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{'font-size': fontSize}">游戏音效</span>
                <el-switch style="float: right" v-model="soundEffect" active-color="#13ce66" inactive-color="#ff4949" @change="setSound"></el-switch>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            soundEffect: true,
            backgroundMusic: true,
        }
    },

    props:{
        fontSize: {type: String, default: ''},
    },

    methods:{
        setBgm: function(flag){
            let bgm = document.querySelector('#bgm')
            if(flag){
                bgm.play()
            }
            else{
                bgm.pause()
            }
        },

        setSound: function(flag){
            this.$store.dispatch('mutatePlaySound', flag)
        },
    }
}
</script>

<style scoped>

.setting_item{
    margin-bottom: 5%;
    height: 15%;
}

.setting_item :hover{
    background-color: rgb(244, 244, 245);
}

</style>