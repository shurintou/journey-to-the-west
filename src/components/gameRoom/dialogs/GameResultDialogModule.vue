<template>
    <el-dialog title="游戏战绩" :visible.sync="gameResultDialogVisible" :width="customDialogWidth" :modal-append-to-body = false center :modal="false">
        <div style="width: 100%">
            <div>
                
            </div>
            <el-table :default-sort = "{prop: 'seatIndex', order: 'ascending'}" :data="gameResult.gameResultList" style="width: 100%" :row-class-name="tableRowClassName" :row-style="{'font-size': this.largeFontSize}" :header-row-style="{'font-size': this.fontSize}">
                <el-table-column align="center" fixed prop="avatar_id" label="头像" min-width="60">
                    <template slot-scope="scope">
                        <el-avatar shape="square" :size="avatarSize" :src="getAvatarUrl(scope.row.avatar_id)"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column align="center" fixed prop="nickname" label="昵称" min-width="80"></el-table-column>
                <el-table-column align="center" sortable prop="seatIndex" label="座位号" min-width="60"></el-table-column>
                <el-table-column align="center" sortable prop="cards" label="总收牌" min-width="60"></el-table-column>
                <el-table-column align="center" sortable prop="maxCombo" label="最大收牌" min-width="60"></el-table-column>
                <el-table-column align="center" sortable prop="wukong" label="使用悟空" min-width="60"></el-table-column>
                <el-table-column align="center" sortable prop="bajie" label="使用八戒" min-width="60"></el-table-column>
                <el-table-column align="center" sortable prop="shaseng" label="使用沙僧" min-width="60"></el-table-column>
                <el-table-column align="center" sortable prop="tangseng" label="使用唐僧" min-width="60"></el-table-column>
                <el-table-column align="center" sortable prop="joker" label="使用反弹" min-width="60"></el-table-column>
            </el-table>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return{
            gameResult:{
                winnerNickname: '',
                winnerCards: 0,
                loserNickname: '',
                loserCards: 0,
                cardsNum: 0,
                playersNum: 0,
                maxCombo: 0,
                gameResultList:[
                    {
                        id: 10,
                        nickname: '345',
                        avatar_id: 10,
                        cards: 110,
                        seatIndex: 7, 
                        maxCombo: 0,
                        wukong: 0, 
                        bajie: 0, 
                        shaseng: 0, 
                        tangseng: 0, 
                        joker: 0
                    },
                    {
                        id: 0,
                        nickname: '234',
                        avatar_id: 12,
                        cards: 100,
                        seatIndex: 5, 
                        maxCombo: 100,
                        wukong: 0, 
                        bajie: 0, 
                        shaseng: 0, 
                        tangseng: 0, 
                        joker: 0
                    },
                    {
                        id: 0,
                        nickname: '123',
                        avatar_id: 20,
                        cards: 100,
                        seatIndex: 6, 
                        maxCombo: 90,
                        wukong: 0, 
                        bajie: 0, 
                        shaseng: 0, 
                        tangseng: 0, 
                        joker: 0
                    },
                    {
                        id: 3,
                        nickname: '155523',
                        avatar_id: 22,
                        cards: 100,
                        seatIndex: 2, 
                        maxCombo: 90,
                        wukong: 50, 
                        bajie: 0, 
                        shaseng: 0, 
                        tangseng: 0, 
                        joker: 0
                    },
                     {
                        id: 0,
                        nickname: '6523',
                        avatar_id: 21,
                        cards: 100,
                        seatIndex: 3, 
                        maxCombo: 90,
                        wukong: 30, 
                        bajie: 0, 
                        shaseng: 0, 
                        tangseng: 0, 
                        joker: 0
                    },
                ]
            }
        }
    },

    computed:{
        customDialogWidth: function(){
            let str = this.largeDialogWidth.split('%')[0]
            let i = parseInt(str)
            if(i < 80){
                return '80%'
            }
            return this.largeDialogWidth
        }
    },

    props:{
        // gameResultList: Array,
        gameResultDialogVisible: { type: Boolean, default: false},
        avatarSize: {type: Number, default: 20},
        fontSize: {type: String, default: '14px'},
        largeFontSize : {type: String, default: '16px'},
        tagSize: {type: String, default: 'medium'},
        popupWidth: {type: Number, default: 160},
        buttonSize: {type: String, default: 'medium'},
        dialogWidth: {type: String, default: '50%'},
        largeDialogWidth: {type: String, default: '50%'},
    },

    methods:{
        getAvatarUrl: function(avatarId){
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },

        tableRowClassName: function({row}) {
            if(row.id === this.$store.state.id)
            return 'is-local-player-row'
        },
    },
}
</script>

<style>
    .el-table .is-local-player-row {
        background: rgb(240, 249, 235);
    }
</style>