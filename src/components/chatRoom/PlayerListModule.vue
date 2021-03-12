<template>
     <el-table :data="playerList" style="width: 100%" :row-class-name="tableRowClassName" :row-style="rowStyle" :header-row-style="rowStyle">
        <el-table-column prop="avatar_id" label="头像" min-width="30">
            <template slot-scope="scope">
            <el-avatar shape="square" :size="avatarSize" :src="getAvatarUrl(scope.row.avatar_id)"></el-avatar>
            </template>
        </el-table-column>
        <el-table-column prop="nickname" label="玩家" min-width="80">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="right" popper-class="chat-popover" :width="popupWidth">
                    <p>玩家信息
                        <el-tag :type="getType(scope.row.player_status)" effect="dark" :style="rowStyle" size="small" style="float:right">
                            {{ getStatus(scope.row.player_status) }}
                        </el-tag>
                    </p>
                    <el-image style="width: 100px; height: 100px" :src="getAvatarUrl(scope.row.avatar_id)" :fit="'fill'"></el-image>
                    <p>昵称: {{ scope.row.nickname }}</p>
                    <!-- <p>胜局数: {{ scope.row.wins }}</p> -->
                    <!-- 其他数据之后再加 -->
                    <div slot="reference" class="name-wrapper">
                        <el-tag :type="getType(scope.row.player_status)" effect="dark" :style="rowStyle" :size="tagSize">
                            {{ getStatus(scope.row.player_status) }}
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
            return this.getType(row.player_status) + '-row'
        },

        getAvatarUrl: function(avatarId){
          return require("@/assets/images/avatar_" + avatarId + "-min.png")
        },

        getStatus: function(player_status){
            if(player_status === 2){
                return '忙碌'
            }
            else if(player_status === 1){
                return '等待'
            }
            else if(player_status === 0){
                return '空闲'
            }
        },

        getType: function(player_status){
            if(player_status === 2){
                return 'danger'
            }
            else if(player_status === 1){
                return 'warning'
            }
            else if(player_status === 0){
                return 'success'
            }
        },
    },
}
</script>

<style>
    .el-table .warning-row {
        background: #f3efcb;
    }

    .el-table .success-row {
        background: #d5f8ca;
    }

    .el-table .danger-row {
        background: #f0caca;
    }

    .chat-popover{
        background-size: 100% 100%;
        background-image: url('../../assets/images/popupBackground.png');
        color: #D3DCE6;
        font-size: 18px;
        font-weight: 500;
    }
</style>