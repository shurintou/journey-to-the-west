<template>
  <el-aside class="hide-scroll-bar" :width="subAsideWidth"
    :style="{ backgroundImage: 'url(' + verticalBackground + ')' }">
    <el-tooltip :disabled="$store.state.isMobile" effect="light" content="点击以修改头像" placement="left">
      <div class="player-icon-box" @click="openEditAvatarDialog">
        <el-image v-if="gameInfo === null || gameInfo.currentPlayer === -1" class="aside-icon"
          :src="getAvatarUrl($store.state.avatar_id)"></el-image>
        <AnimatedAvatar v-else :avatarClass="'aside-icon'" :avatarUrl="getAvatarUrl($store.state.avatar_id)"
          :currentPlayerCards="getGamePlayer?.cards || 0"
          :isCurrentPlayer="gameInfo.gamePlayer[gameInfo.currentPlayer].id === $store.state.id"
          :currentGameCombo="gameInfo.currentCombo"></AnimatedAvatar>
      </div>
    </el-tooltip>
    <el-tooltip :disabled="$store.state.isMobile" effect="light" content="点击以修改昵称" placement="left">
      <div class="player-nickname-box" :style="{ 'font-size': fontSize }" @click="openEditNicknameDialog">
        <span>{{ $store.state.nickname }}</span>
      </div>
    </el-tooltip>
    <div class="player-setting-box">
      <el-button class="setting-button" :style="{ 'font-size': fontSize }" type="info" icon="el-icon-view"
        @click="openViewModule">查看</el-button>
      <el-button class="help-button" :style="{ 'font-size': fontSize }" type="warning" icon="el-icon-s-opportunity"
        @click="openHelpModule">帮助</el-button>
    </div>

    <el-dialog title="修改头像" :visible.sync="avatarDialogVisible" center :width="dialogWidth" :modal="false">
      <el-divider></el-divider>
      <div class="icon-select-box">
        <div class="icon-block" :class="{ 'icon-is-selected': temAvatarId === n }" v-for="n in iconNum" :key="n"
          @click="temAvatarId = n">
          <el-image :src="getAvatarUrl(n)" :fit="'fill'"></el-image>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="avatarDialogVisible = false" style="margin-right:10%">取消</el-button>
        <el-button type="primary" @click="submitNewAvatar">修改</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改昵称" :visible.sync="nicknameDialogVisible" center :width="dialogWidth"
      :close-on-click-modal="false" :modal="false">
      <el-form :model="nicknameForm" ref="nicknameForm" @submit.native.prevent="submitNewNickname">
        <el-form-item label="新昵称" prop="name" :rules="[{ required: true, validator: checkNickname, trigger: 'blur' }]">
          <el-input v-model="nicknameForm.name" autocomplete="off" placeholder="输入新昵称" maxlength="10" show-word-limit>
            <i slot="prefix" class="el-input__icon el-icon-edit-outline"></i>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancelNicknameEdit" style="margin-right:10%">取消</el-button>
        <el-button type="primary" @click.stop.prevent="submitNewNickname">修改</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看" :visible.sync="viewModuleDialogVisible" center :width="playerInfoDialogWidth" :modal="false">
      <PlayerInfoTabModule :playerProfile="playerProfile" :fontSize="fontSize" :isShowing="viewModuleDialogVisible"
        @sendGameResultToPlayerInfo="function (value) { $emit('sendGameResultToChatRoom', value) }"></PlayerInfoTabModule>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="viewModuleDialogVisible = false" :style="{ 'font-size': fontSize }"
          :size="buttonSize">关闭</el-button>
      </span>
    </el-dialog>

    <el-dialog title="帮助" :visible.sync="helpModuleDialogVisible" center :width="playerInfoDialogWidth" :modal="false">
      <HelpModule :isShowing="helpModuleDialogVisible" :fontSize="fontSize" :avatarSize="avatarSize"></HelpModule>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="helpModuleDialogVisible = false" :style="{ 'font-size': fontSize }"
          :size="buttonSize">关闭</el-button>
      </span>
    </el-dialog>
  </el-aside>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { WebSocketGameRoom } from '@/type/room'
import { GamePlayerSeatIndex } from '@/type/index'
import { PlayerProfile } from '@/type/record'
import { WebSocketGame, WebSocketPlayerInGame } from '@/type/game'
import { InternalRuleItem, Value, ExecuteValidate } from '@/type/validator'
import { modifyAvatar, modifyNickname } from '@/api/modify'
import PlayerInfoTabModule from '@/components/chatRoom/PlayerInfoTabModule.vue'
import { getPlayerRecord } from '@/api/infoSearch'
import AnimatedAvatar from '@/components/gameRoom/fragment/AnimatedAvatar.vue'
import HelpModule from '@components/chatRoom/HelpModule.vue'

export default Vue.extend({

  data() {
    return {
      avatarDialogVisible: false,
      nicknameDialogVisible: false,
      viewModuleDialogVisible: false,
      helpModuleDialogVisible: false,
      duplicateSubmitAvatarFlag: false,
      duplicateSubmitNicknameFlag: false,
      duplicateGetInfoFlag: false,
      activeViewModuleTabName: 'record',
      /* 头像数量 */
      iconNum: 35,
      /* 暂时选择的头像Id */
      temAvatarId: 0,
      nicknameForm: { name: '' },
      playerProfile: {
        id: 0,
        avatar_id: 0,
        nickname: '',
        record: {
          num_of_game: 0,
          most_game: 0,
          least_game: 0,
          experience: 0,
          experienced_cards: 0,
          max_card: 0,
          max_card_amount: 0,
          min_card: 0,
          min_card_amount: 0,
          least_cards: 0,
          most_cards: 0,
        }
      } as PlayerProfile,
      checkNickname: (rule: InternalRuleItem, value: Value, callback: (arg0?: Error) => void) => {
        if (value === '') {
          callback(new Error('请输入昵称'));
        }
        else if (value === this.$stock.state.nickname) {
          callback(new Error('修改前后昵称一致'));
        }
        callback()
      }
    }
  },

  props: {
    gameInfo: { type: Object as PropType<WebSocketGame>, default: null },
    subAsideWidth: { type: String, default: '' },
    verticalBackground: { type: String, default: '' },
    fontSize: { type: String, default: '' },
    dialogWidth: { type: String, default: '' },
    playerInfoDialogWidth: { type: String, default: '' },
    playerLocRoom: { type: Object as PropType<WebSocketGameRoom>, default: null },
    ws: { type: Object as PropType<WebSocket>, default: null },
    isHorizontal: { type: Boolean, default: false },
    buttonSize: { type: String, default: '' },
    avatarSize: { type: Number, default: 20 },
  },

  computed: {
    getGamePlayer: function (): WebSocketPlayerInGame | null {
      if (this.gameInfo === null) return null
      for (let i = 0 as GamePlayerSeatIndex; i < Object.keys(this.gameInfo.gamePlayer).length; i++) {
        if (this.gameInfo.gamePlayer[i].id === this.$stock.state.id) {
          return this.gameInfo.gamePlayer[i]
        }
      }
      return null
    },
  },

  methods: {
    getAvatarUrl: function (avatarId: number) {
      return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
    },

    submitNewAvatar: function () {
      if (this.playerLocRoom && this.playerLocRoom.status === 1) {
        this.$message.warning('游戏中，请勿修改头像')
        this.avatarDialogVisible = false
        return
      }
      if (this.duplicateSubmitAvatarFlag) return;
      this.duplicateSubmitAvatarFlag = true
      if (this.temAvatarId === this.$stock.state.avatar_id) {
        this.$message.error('修改前后头像一致，请重新选择')
        this.duplicateSubmitAvatarFlag = false
      }
      else {
        modifyAvatar({ avatar_id: this.temAvatarId })
          .then((res) => {
            if (res.code === 200) {
              this.$stock.dispatch('mutateAvatarId', this.temAvatarId)
                .then(() => {
                  this.ws.send(JSON.stringify({ type: 'playerList', nickname: this.$stock.state.nickname, avatar_id: this.$stock.state.avatar_id, player_loc: this.$stock.state.player_loc, player_status: this.$stock.state.player_status }))
                })
              this.$message.success('成功修改头像')
            }
            else {
              this.$message.error('修改失败，请稍后重试')
            }
          })
          .catch(() => {
            this.$message.error('修改失败，请稍后重试')
          })
          .finally(() => {
            this.avatarDialogVisible = false
            this.duplicateSubmitAvatarFlag = false
          })
      }
    },

    cancelNicknameEdit: function () {
      this.nicknameDialogVisible = false
      const nicknameFormRef = this.$refs.nicknameForm as Element & ExecuteValidate
      nicknameFormRef.clearValidate()
    },

    submitNewNickname: function () {
      if (this.playerLocRoom && this.playerLocRoom.status === 1) {
        this.$message.warning('游戏中，请勿修改昵称')
        this.nicknameDialogVisible = false
        return
      }
      if (this.duplicateSubmitNicknameFlag) return
      this.duplicateSubmitNicknameFlag = true
      const nicknameFormRef = this.$refs.nicknameForm as Element & ExecuteValidate
      nicknameFormRef.validate(valid => {
        if (valid) {
          modifyNickname({ nickname: this.nicknameForm.name })
            .then((res) => {
              if (res.code === 200) {
                this.$stock.dispatch('mutateNickname', this.nicknameForm.name).then(() => {
                  this.ws.send(JSON.stringify({ type: 'playerList', nickname: this.$stock.state.nickname, avatar_id: this.$stock.state.avatar_id, player_loc: this.$stock.state.player_loc, player_status: this.$stock.state.player_status }))
                  this.nicknameForm.name = this.$stock.state.nickname
                })
                this.$message.success('成功修改昵称')
              }
              else {
                this.$message.error('修改失败，请稍后重试')
              }
            })
            .catch(() => {
              this.$message.error('修改失败，请稍后重试')
            })
            .finally(() => {
              this.nicknameDialogVisible = false
              this.duplicateSubmitNicknameFlag = false
            })
        }
        else {
          this.duplicateSubmitNicknameFlag = false
        }
      })
    },

    openViewModule: function () {
      this.viewModuleDialogVisible = true
      this.getPlayerRecord(this.$stock.state.id, this.$stock.state.avatar_id, this.$stock.state.nickname)
    },

    openHelpModule: function () {
      this.helpModuleDialogVisible = true
    },

    getPlayerRecord: function (id: number, avatar_id: number, nickname: string) {
      if (this.duplicateGetInfoFlag) return;
      this.duplicateGetInfoFlag = true
      this.playerProfile.id = id
      this.playerProfile.avatar_id = avatar_id
      this.playerProfile.nickname = nickname
      getPlayerRecord({ id: id })
        .then((res) => {
          this.playerProfile.record = res.record
        })
        .catch()
        .finally(() => {
          this.duplicateGetInfoFlag = false
        })
    },

    openEditAvatarDialog: function () {
      if (this.playerLocRoom !== null && this.playerLocRoom.status === 1) {
        this.$message.error('游戏中，请勿修改头像')
        return
      }
      this.avatarDialogVisible = true
      this.temAvatarId = this.$stock.state.avatar_id
    },

    openEditNicknameDialog: function () {
      if (this.playerLocRoom !== null && this.playerLocRoom.status === 1) {
        this.$message.error('游戏中，请勿修改昵称')
        return
      }
      this.nicknameDialogVisible = true
      this.nicknameForm.name = this.$stock.state.nickname
      this.$nextTick(() => {
        const nicknameFormRef = this.$refs.nicknameForm as Element & ExecuteValidate
        nicknameFormRef.clearValidate()
      })
    }
  },

  components: {
    PlayerInfoTabModule,
    AnimatedAvatar,
    HelpModule,
  }
})
</script>

<style>
.player-icon-box {
  width: 70%;
  height: 35%;
  margin-top: 4%;
  margin-left: 15%;
  border-radius: 5%;
  border-width: 5px;
  border-color: #e3e197;
  background-size: 100% 100%;
  background-image: url('@/assets/images/icon_background-min.png');
}

.player-icon-box:hover {
  cursor: pointer;
}

.player-nickname-box {
  cursor: pointer;
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
  background-image: url('@/assets/images/icon-background-min.png');
  background-size: cover;
}

.player-setting-box {
  width: 85%;
  height: 20%;
  margin-top: 5%;
  margin-left: 7%;
}

.setting-button {
  height: 100%;
  float: left;
  width: 45%;
  padding: 0px;
}

.help-button {
  height: 100%;
  float: right;
  width: 45%;
  padding: 0px;
}


.aside-icon {
  width: 70%;
  height: 80%;
  margin-left: 15%;
  margin-top: 5%;
}

.icon-select-box {
  background-image: url('@/assets/images/icon-select-background.png');
  background-size: 100% 100%;
}

.icon-is-selected {
  background-image: url('@/assets/images/icon-select-circle.png');
  background-size: 100% 100%;
}

.icon-block {
  margin: 2%;
  padding: 2% 0;
  width: 15%;
  display: inline-block;
}

.icon-block {
  cursor: pointer;
}
</style>