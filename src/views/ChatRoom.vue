<template>
	<div>
		<el-container>
		<el-aside :width="asideWidth" v-if="asideWidth !== '0px'"
			:style="{ backgroundImage: 'url(' + verticalBackground + ')' }">
			<div class="player-list-box">
			<PlayerListModule :playerList="playerList" :avatarSize="avatarSize" :fontSize="fontSize" :tagSize="tagSize"
				:popupWidth="popupWidth" :buttonSize="buttonSize" :dialogWidth="dialogWidth"
				:largeDialogWidth="largeDialogWidth" :largeFontSize="largeFontSize" :isHorizontal="asideWidth !== '0px'"
				:playerInfoDialogWidth="playerInfoDialogWidth"
				@sendGameResultToChatRoom="function (value) { gameResult = value.gameResult; gameResultDialogVisible = true }">
			</PlayerListModule>
			</div>
			<ChatRoomButtonModule v-if="$store.state.player_loc === 0" :whichPattern="'vertical'" :buttonSize="buttonSize"
			:largeFontSize="largeFontSize" @cancelLeaveDialogVisible="function (value) { cancelLeaveDialogVisible = value }"
			@createGameRoomDialogVisible="function (value) { createGameRoomDialogVisible = value }"></ChatRoomButtonModule>
			<GameRoomButtonModule v-else :whichPattern="'vertical'" :buttonSize="buttonSize" :largeFontSize="largeFontSize"
			:playerLocRoom="playerLocRoom" :ws="ws"
			@leaveRoomDialogVisible="function (value) { leaveRoomDialogVisible = value }"></GameRoomButtonModule>
		</el-aside>
		<el-container>
			<el-header v-if="asideWidth === '0px'" :style="{ backgroundImage: 'url(' + verticalBackground + ')' }">
			<el-popover placement="bottom" :width="popupWidth" trigger="manual" v-model="playerListVisible">
				<PlayerListModule :playerList="playerList" :avatarSize="avatarSize" :fontSize="fontSize" :tagSize="tagSize"
				:popupWidth="popupWidth" :buttonSize="buttonSize" :dialogWidth="dialogWidth"
				:largeDialogWidth="largeDialogWidth" :largeFontSize="largeFontSize" :isHorizontal="asideWidth !== '0px'"
				:playerInfoDialogWidth="playerInfoDialogWidth"
				@sendGameResultToChatRoom="function (value) { gameResult = value.gameResult; gameResultDialogVisible = true }">
				</PlayerListModule>
				<el-button slot="reference" class="chat-room-header-button-player-list"
				:type="playerListVisible ? 'info' : 'primary'" icon="el-icon-user-solid"
				:style="{ 'font-size': largeFontSize, 'padding': '0px 0px' }" :size="buttonSize" round
				@click="playerListVisible = !playerListVisible">{{ playerListVisible ? '收起' : '玩家列表' }}</el-button>
			</el-popover>
			<ChatRoomButtonModule v-if="$store.state.player_loc === 0" :whichPattern="'horizontal'" :buttonSize="buttonSize"
				:largeFontSize="largeFontSize"
				@cancelLeaveDialogVisible="function (value) { cancelLeaveDialogVisible = value }"
				@createGameRoomDialogVisible="function (value) { createGameRoomDialogVisible = value }">
			</ChatRoomButtonModule>
			<GameRoomButtonModule v-else :whichPattern="'horizontal'" :buttonSize="buttonSize"
				:largeFontSize="largeFontSize" :playerLocRoom="playerLocRoom" :ws="ws"
				@leaveRoomDialogVisible="function (value) { leaveRoomDialogVisible = value }"></GameRoomButtonModule>
			</el-header>
			<el-main :style="{ backgroundImage: 'url(' + mainImg + ')', padding: '0px 0px 0px 5px' }">
			<GameRoomListModule v-if="$store.state.player_loc === 0" :largeFontSize="largeFontSize"
				:gameRoomItemWidth="gameRoomItemWidth" :gameRoomList="gameRoomList" :playerList="playerList" :ws="ws"
				@enterGameRoomDialogVisible="function (value) { enterGameRoomDialogVisible = value }"
				@enterRoomDto="function (value) { enterRoomDto = value }"></GameRoomListModule>
			<GameRoomModule v-else :playerLocRomTypeChatMessageObject="playerLocRomTypeChatMessageObject"
				:sentGameTextToPlayerObj="sentGameTextToPlayerObj" :playerLocRoom="playerLocRoom" :playerList="playerList"
				:isHorizontal="asideWidth !== '0px'" :tagSize="tagSize" :fontSize="fontSize" :largeFontSize="largeFontSize"
				:dialogWidth="dialogWidth" :ws="ws" :gameInfo="gameInfo" @playCard="invokePlayerCardRefPlayCardEmitted"
				@addAiPlayerSeatIndex="function (seatIndex) { addAiPlayerSeatIndex = seatIndex }"
				@gameTextToPlayerSent="function (seatIndex) { sentGameTextToPlayerObj[seatIndex] = {} }">
			</GameRoomModule>
			</el-main>
			<el-footer :height="footHeight">
			<el-container class="fill-height">
				<ChatModule v-if="playerLocRoom ? playerLocRoom.status === 0 : true"
				:horizontalBackground="horizontalBackground" :chatText="chatText" :buttonSize="buttonSize" :ws="ws"
				ref="chatModule"></ChatModule>
				<CardModule v-else :gameInfo="gameInfo" :horizontalBackground="horizontalBackground" :fontSize="fontSize"
				:buttonSize="buttonSize" :ws="ws" ref="cardModule"></CardModule>
				<PlayerInfoModule :gameInfo="gameInfo" :playerLocRoom="playerLocRoom" :subAsideWidth="subAsideWidth"
				:verticalBackground="verticalBackground" :fontSize="largeFontSize" :dialogWidth="dialogWidth"
				:playerInfoDialogWidth="playerInfoDialogWidth" :ws="ws" :isHorizontal="asideWidth !== '0px'"
				:buttonSize="buttonSize" :avatarSize="avatarSize"
				@sendGameResultToChatRoom="function (value) { gameResult = value.gameResult; gameResultDialogVisible = true }">
				</PlayerInfoModule>
			</el-container>
			</el-footer>
		</el-container>
		</el-container>
		<LogoutDialogModule :cancelLeaveDialogVisible="cancelLeaveDialogVisible" :dialogWidth="dialogWidth"
		@cancelLeaveDialogVisible="function (value) { cancelLeaveDialogVisible = value }"></LogoutDialogModule>
		<CreateGameRoomDialogModule :createGameRoomDialogVisible="createGameRoomDialogVisible" :dialogWidth="dialogWidth"
		:ws="ws" @createGameRoomDialogVisible="function (value) { createGameRoomDialogVisible = value }">
		</CreateGameRoomDialogModule>
		<LeaveRoomDialogModule :leaveRoomDialogVisible="leaveRoomDialogVisible" :dialogWidth="dialogWidth"
		:playerLocRoom="playerLocRoom" :ws="ws"
		@leaveRoomDialogVisible="function (value) { leaveRoomDialogVisible = value }">
		</LeaveRoomDialogModule>
		<EnterGameRoomDialogModule :enterGameRoomDialogVisible="enterGameRoomDialogVisible" :enterRoomDto="enterRoomDto"
		:dialogWidth="dialogWidth" :ws="ws"
		@enterGameRoomDialogVisible="function (value) { enterGameRoomDialogVisible = value }"></EnterGameRoomDialogModule>
		<AskChangeSeatDialogModule :askChangeSeatDialogVisible="askChangeSeatDialogVisible"
		:askChangeSeatInfo="askChangeSeatInfo" :playerList="playerList" :buttonSize="buttonSize" :fontSize="fontSize"
		:dialogWidth="dialogWidth" :ws="ws"
		@askChangeSeatDialogVisible="function (value) { askChangeSeatDialogVisible = value }"></AskChangeSeatDialogModule>
		<GameResultDialogModule :gameResult="gameResult" :gameResultDialogVisible="gameResultDialogVisible"
		:avatarSize="avatarSize" :fontSize="fontSize" :tagSize="tagSize" :popupWidth="popupWidth" :buttonSize="buttonSize"
		:dialogWidth="dialogWidth" :largeDialogWidth="largeDialogWidth" :largeFontSize="largeFontSize"
		@gameResultDialogVisible="function (value) { gameResultDialogVisible = value }"></GameResultDialogModule>
		<AnnounceDialogModule :announceDialogVisible="announceDialogVisible" :dialogWidth="dialogWidth"
		:avatarSize="avatarSize" :fontSize="largeFontSize" @announceDialogVisible="announceViewHandler">
		</AnnounceDialogModule>
		<AddAIDialogModule :addAiPlayerSeatIndex="addAiPlayerSeatIndex" :dialogWidth="dialogWidth"
		:ws="ws" :playerLocRoom="playerLocRoom" @addAiPlayerSeatIndex="function (value) { addAiPlayerSeatIndex = value }">
		</AddAIDialogModule>
	</div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { GamePlayerSeatIndex } from '@/type/index'
import { WebSocketGameRoom, WebSocketChangeSeat, ChatTextInfo, PlayerLocRomTypeChatMessageObject, EnterRoomDto } from '@/type/room'
import { WebSocketPlayer } from '@/type/player'
import { WebSocketGame, GameResult } from '@/type/game'
import { CardModuleRef } from '@/type/ref'
import { TextToPlayerGameData } from '@/type/websocket'
import { ElLoadingComponent } from 'element-ui/types/loading'
import { SystemSetting } from '@/type/setting'
import { chatRoomWebSocket } from '@/mixins/chatRoom/chatRoomWebSocket'
import { chatRoomResize } from '@/mixins/chatRoom/chatRoomResize'
import PlayerListModule from '@/components/chatRoom/PlayerListModule.vue'
import PlayerInfoModule from '@/components/chatRoom/PlayerInfoModule.vue'
import ChatModule from '@/components/chatRoom/ChatModule.vue'
import GameRoomListModule from '@/components/chatRoom/GameRoomListModule.vue'
import LogoutDialogModule from '@/components/chatRoom/dialogs/LogoutDialogModule.vue'
import CreateGameRoomDialogModule from '@/components/chatRoom/dialogs/CreateGameRoomDialogModule.vue'
import ChatRoomButtonModule from '@/components/chatRoom/ChatRoomButtonModule.vue'
import GameRoomButtonModule from '@/components/gameRoom/GameRoomButtonModule.vue'
import LeaveRoomDialogModule from '@/components/gameRoom/dialogs/LeaveRoomDialogModule.vue'
import EnterGameRoomDialogModule from '@/components/chatRoom/dialogs/EnterGameRoomDialogModule.vue'
import GameRoomModule from '@/components/gameRoom/GameRoomModule.vue'
import AskChangeSeatDialogModule from '@/components/gameRoom/dialogs/AskChangeSeatDialogModule.vue'
import GameResultDialogModule from '@/components/gameRoom/dialogs/GameResultDialogModule.vue'
import AnnounceDialogModule from '@/components/chatRoom/dialogs/AnnounceDialogModule.vue'
import AddAIDialogModule from '@/components/gameRoom/dialogs/AddAIDialogModule.vue'
import CardModule from '@/components/gameRoom/CardModule.vue'

export default (Vue as VueConstructor<
  Vue &
  InstanceType<typeof chatRoomResize> &
  InstanceType<typeof chatRoomWebSocket>
>).extend({
  name: 'ChatRoom',
	data() {
		return {
			chatText: [] as ChatTextInfo[],
			playerListVisible: false,
			cancelLeaveDialogVisible: false,
			createGameRoomDialogVisible: false,
			leaveRoomDialogVisible: false,
			enterGameRoomDialogVisible: false,
			askChangeSeatDialogVisible: false,
			gameResultDialogVisible: false,
			announceDialogVisible: false,
			addAiPlayerSeatIndex: -1,
			announceVersionId: 1, //每次更新公告须修改此处, +1
			playerList: [] as WebSocketPlayer[],
			gameRoomList: [] as WebSocketGameRoom[],
			playerLocRoom: null as WebSocketGameRoom | null,
			enterRoomDto: null as EnterRoomDto | null,
			askChangeSeatInfo: null as WebSocketChangeSeat | null,
			gameInfo: null as WebSocketGame | null,
			gameResult: null as GameResult | null,
			sentGameTextToPlayerObj: { 0: {}, 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {}, } as { [key in GamePlayerSeatIndex]: {} | TextToPlayerGameData },
			loading: null as ElLoadingComponent | null,
			playerLocRomTypeChatMessageObject: null as PlayerLocRomTypeChatMessageObject | null,
		}
	},

	mixins: [chatRoomWebSocket, chatRoomResize],

	methods: {
		announceViewHandler: function (value: boolean) {
			this.announceDialogVisible = value
			const setting = this.$stock.state.setting
			setting.announceId = this.announceVersionId
			this.$stock.dispatch('mutateSetting', setting)
		},

		invokePlayerCardRefPlayCardEmitted: function () {
			const cardModuleRef = this.$refs.cardModule as Element & CardModuleRef
			cardModuleRef.playCardEmittedByRef()
		}
	},

	created: function () {
		this.loading = this.$loading({
			lock: true,
			text: '努力连接中',
			spinner: 'el-icon-loading',
			background: 'rgba(255, 255, 255, 0.7)'
		})
	},

	mounted: function () {
		const setting: SystemSetting = JSON.parse(localStorage.getItem('setting') || '')
		const announceId = setting?.announceId === undefined ? 0 : setting.announceId
		if (announceId < this.announceVersionId) {
			this.announceDialogVisible = true
		}
	},

	beforeRouteEnter(to, from, next) {
		next(vm => {
			if (from.name === 'Login') {
				const selfVm = vm as unknown as { loading: ElLoadingComponent } // this is a workaround for type definition.
				selfVm.loading.close()
			}
		})
	},

	components: {
		PlayerListModule,
		PlayerInfoModule,
		ChatModule,
		GameRoomListModule,
		LogoutDialogModule,
		CreateGameRoomDialogModule,
		ChatRoomButtonModule,
		GameRoomButtonModule,
		LeaveRoomDialogModule,
		EnterGameRoomDialogModule,
		GameRoomModule,
		AskChangeSeatDialogModule,
		CardModule,
		GameResultDialogModule,
		AnnounceDialogModule,
		AddAIDialogModule,
	},
})
</script>


<style>
#input-button {
  background-color: #409eff;
  color: #fff
}

.el-header,
.el-footer {
  background-color: #B3C0D1;
  color: #333;
  background-size: 100% 100%;
  padding: 0px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  background-size: 100% 100%;
}

.el-main {
  background-color: #D3DCE6;
  color: #333;
  background-size: 100% 100%;
}

.el-container {
  padding: 0px !important;
  margin: 0px !important;
  height: 97vh;
}

.el-avatar {
  background: none
}

.player-list-box {
  width: 90%;
  height: 70%;
  margin-left: 5%;
  margin-top: 10%;
  background-color: #edf0f5;
  border-radius: 6px;
  border: 2px solid #ebab0b;
}

.chat-room-header-button-player-list {
  float: left;
  width: 20%;
  margin-top: 2%;
  margin-left: 5%;
  height: 80%;
}

.chat-box {
  width: 100%;
  height: 80%;
  background-color: #edf0f5;
  float: left;
  overflow-y: auto;
  border-radius: 4px;
}

.el-button+.el-button {
  margin-left: 0px;
}

.chat-text {
  margin: 0;
  padding: 0px;
}

.input-box {
  float: left;
}

.hide-scroll-bar {
  overflow-y: hidden;
}

.fill-width {
  width: 100%;
}

.fill-height {
  height: 100%;
}
</style>@/type/ref