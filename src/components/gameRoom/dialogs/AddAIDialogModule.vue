<template>
    <el-dialog title="加入电脑" top="2vh" :visible.sync="addAiPlayerDialogModuleVisible" center :width="dialogWidth" :modal="false">
		<el-divider></el-divider>
		<div style="overflow:auto; height: 60vh">
			<div class="icon-select-box">
				<div class="icon-block" :class="{ 'icon-is-selected': temAIPlayerIndex === index}" v-for="(aiPlayer, index) in aiPlayerList" :key="index"
				@click="clickHandler(index)">
					<el-tooltip effect="light" :content="aiPlayerList[index].nickname" placement="bottom">
						<el-image :src="getAvatarUrl(index + 1)" :fit="'fill'" :class="{ 'exist-ai': isAiAlreadyExist(index) }"></el-image>
					</el-tooltip>
				</div>
			</div>
		</div>
		<span slot="footer">
			<el-button @click="closeAddAiPlayerDialog" style="margin-right:10%">取消</el-button>
			<el-button type="primary" @click="submitNewAIPlayer" :disabled="temAIPlayerIndex === -1">添加</el-button>
		</span>
    </el-dialog>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { GamePlayerSeatIndex } from '@/type/index'
import { WebSocketGameRoom, RoomPlayers } from '@/type/room'
import { aiPlayer } from '@/mixins/gameRoom/aiPlayer'

export default aiPlayer.extend({
    data() {
        return {
			/** 
			 * 暂时选择的电脑玩家在{@link cardList} 中的序号
			 */
			temAIPlayerIndex: -1,
        }
    },

	computed: {
		addAiPlayerDialogModuleVisible: {
			get: function () {
				return this.addAiPlayerSeatIndex >= 0
			},
			set: function (newValue: boolean) {
				if (newValue === false) {
            		this.$emit('addAiPlayerSeatIndex', -1)
				}
			}
		}
	},

    props: {
        addAiPlayerSeatIndex: { type: Number, default: -1 },
        dialogWidth: { type: String, default: '' },
        ws: { type: WebSocket, default: null },
        playerLocRoom: { type: Object as PropType<WebSocketGameRoom>, default: null },
    },

	watch: {
		'playerLocRoom.playerList': function (newVal: RoomPlayers) {
			this.currentAiPlayerIndexList.length = 0
			for (let i = 0; i < Object.keys(newVal).length; i++) {
				const seatKey = i as GamePlayerSeatIndex
				const playerId = newVal[seatKey].id
				if (playerId < 0) {
					this.currentAiPlayerIndexList.push(-1 * (playerId + 1))
				}
			}
		},
	},

    methods: {
		getAvatarUrl: function (avatarId: number) {
			return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
		},

        closeAddAiPlayerDialog: function () {
            this.$emit('addAiPlayerSeatIndex', -1)
			this.temAIPlayerIndex = -1
        },

		isAiAlreadyExist: function (index: number) : boolean {
			return this.currentAiPlayerIndexList.indexOf(index) >= 0
		},

		clickHandler: function (index: number) {
			if (!this.isAiAlreadyExist(index)) {
				this.temAIPlayerIndex = index
			}
		},

        submitNewAIPlayer: function () {
			this.ws?.send(JSON.stringify({
				type: 'gameRoomList',
				id: this.playerLocRoom.id,
				seatIndex: this.addAiPlayerSeatIndex,
				aiPlayerId: this.aiPlayerList[this.temAIPlayerIndex].id,
				action: 'enter',
			}))
			this.closeAddAiPlayerDialog()
        },

    },

	mixins: [aiPlayer],
})
</script>

<style scoped>
.exist-ai {
	-webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
}
</style>