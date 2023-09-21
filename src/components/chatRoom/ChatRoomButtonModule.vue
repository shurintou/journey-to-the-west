<template>
    <div class="button-box" v-if="whichPattern === 'vertical'">
        <el-button type="success" class="chat-room-aside-button" icon="el-icon-circle-plus"
            :style="{ 'font-size': largeFontSize }" @click="emitCreateGameRoomDialog" :size="buttonSize">创建房间</el-button>
        <el-button type="danger" class="chat-room-aside-button" icon="el-icon-d-arrow-left"
            :style="{ 'font-size': largeFontSize }" @click="emitCancelLeaveDialog" :size="buttonSize">登出离开</el-button>
    </div>
    <div style="height: 100%" v-else>
        <el-button type="danger" class="chat-room-header-button" icon="el-icon-d-arrow-left"
            :style="{ 'font-size': largeFontSize, 'padding': '0px 0px' }" @click="emitCancelLeaveDialog" :size="buttonSize"
            round>登出离开</el-button>
        <el-button type="success" class="chat-room-header-button" icon="el-icon-circle-plus"
            :style="{ 'font-size': largeFontSize, 'padding': '0px 0px' }" @click="emitCreateGameRoomDialog" :size="buttonSize"
            round>创建房间</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    props: {
        whichPattern: {
            type: String,
            default: function () {
                if (document.body.clientWidth < 400) {
                    return 'horizontal'
                }
                return 'vertical'
            }
        },
        buttonSize: { type: String, default: '' },
        largeFontSize: { type: String, default: '' },
    },

    methods: {
        emitCancelLeaveDialog: function () {
            this.$emit('cancelLeaveDialogVisible', true)
        },

        emitCreateGameRoomDialog: function () {
            this.$emit('createGameRoomDialogVisible', true)
        },
    }
}
</script>

<style>
.button-box {
    margin-top: 5%;
    width: 80%;
    height: 20%;
    margin-left: 10%;
    border-radius: 4px;
}

.chat-room-header-button {
    float: right;
    width: 20%;
    margin-top: 2%;
    height: 80%;
}

.chat-room-header-button:first-of-type {
    margin-right: 5%;
}

.chat-room-aside-button {
    width: 100%;
    height: 40%;
    margin-bottom: 5%;
}</style>