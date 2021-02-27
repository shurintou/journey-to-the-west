<template>
     <el-table :data="playerList" style="width: 100%" :row-class-name="tableRowClassName" :row-style="rowStyle" :header-row-style="rowStyle">
        <el-table-column prop="avatar" label="头像" min-width="30">
            <template slot-scope="scope">
            <el-avatar shape="square" :size="avatarSize" :src="getAvatarUrl(scope.row.avatar)"></el-avatar>
            </template>
        </el-table-column>
        <el-table-column prop="nickname" label="玩家" min-width="80">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top" popper-class="chat-popover" :width="popupWidth">
                    <p>玩家信息
                        <el-tag :type="getType(scope.row.status)" effect="dark" :style="rowStyle" size="small" style="float:right">
                            {{ getStatus(scope.row.status) }}
                        </el-tag>
                    </p>
                    <el-image style="width: 100px; height: 100px" :src="getAvatarUrl(scope.row.avatar)" :fit="'fill'"></el-image>
                    <p>昵称: {{ scope.row.nickname }}</p>
                    <p>胜局数: {{ scope.row.wins }}</p>
                    <!-- 其他数据之后再加 -->
                    <div slot="reference" class="name-wrapper">
                        <el-tag :type="getType(scope.row.status)" effect="dark" :style="rowStyle" :size="tagSize">
                            {{ getStatus(scope.row.status) }}
                        </el-tag>
                        <span>{{ ' ' + scope.row.nickname }}</span>
                    </div>
                </el-popover>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data(){
        return {
        }
    },

    computed:{
        rowStyle: function(){
            return {'font-size': this.fontSize}
        },
    },

    props:{
        playerList: Array,
        avatarSize: {type: Number, default: 20},
        fontSize: {type: String, default: '14px'},
        tagSize: {type: String, default: 'medium'},
        popupWidth: {type: Number, default: 160},
    },

    methods:{
        tableRowClassName: function({row}) {
            return row.status + '-row'
        },

        getAvatarUrl: function(avatarId){
          return require("@/assets/images/avatar_" + avatarId + "-min.png")
        },

        getStatus: function(status){
            if(status === 'playing'){
                return '忙碌'
            }
            else if(status === 'waiting'){
                return '等待'
            }
            else if(status === 'free'){
                return '空闲'
            }
        },

        getType: function(status){
            if(status === 'playing'){
                return 'danger'
            }
            else if(status === 'waiting'){
                return 'warning'
            }
            else if(status === 'free'){
                return 'success'
            }
        },
    },
}
</script>

<style>
    .el-table .waiting-row {
        background: #f3efcb;
    }

    .el-table .free-row {
        background: #d5f8ca;
    }

    .el-table .playing-row {
        background: #f0caca;
    }

    .chat-popover{
        background-size: 100% 100%;
        background-image: url('../assets/images/popupBackground.png');
        color: #D3DCE6;
        font-size: 18px;
        font-weight: 500;

    }
</style>