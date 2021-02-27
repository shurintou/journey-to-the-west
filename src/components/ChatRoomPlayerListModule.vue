<template>
     <el-table :data="playerList" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="avatar" label="头像" min-width="40">
            <template slot-scope="scope">
            <el-avatar shape="square" :size="avatarSize" :src="getAvatarUrl(scope.row.avatar)"></el-avatar>
            </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" min-width="40">
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="40">
            <template slot-scope="scope">
            <span>{{ getStatus(scope.row.status) }}</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    props:{
        playerList: Array
    },

    methods:{
        tableRowClassName: function({row}) {
            return row.status + '-row'
        },

        getAvatarUrl:function(avatarId){
          return require("@/assets/images/avatar_" + avatarId + "-min.png")
        },

        getStatus:function(status){
            if(status === 'playing'){
                return '游戏中'
            }
            else if(status === 'waiting'){
                return '已进房'
            }
            else if(status === 'free'){
                return '空闲'
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
</style>