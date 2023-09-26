<template>
  <div id="login_root">
    <MusicButton></MusicButton>
    <el-row type="flex" justify="center">
      <el-image :src="require('@/assets/images/head_icon.png')" :fit="fit"></el-image>
    </el-row>

    <el-row type="flex" justify="center">
      <el-card shadow="always">
        <h1 style="text-align: center;">欢迎登陆</h1>
        <el-divider></el-divider>
        <el-form :model="validateForm" label-width="100px" ref="validateForm" @keypress.native="enterLogin($event)">
          <el-form-item label="用户名" prop="username" :rules="[{ required: true, validator: checkName, trigger: 'blur' },]">
            <el-input placeholder="请输入用户名" type="text" v-model="validateForm.username" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password"
            :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]">
            <el-input placeholder="请输入密码" v-model="validateForm.password" show-password></el-input>
          </el-form-item>

          <el-form-item class="shortMargin" label="验证码" prop="vertificationCode"
            :rules="[{ required: true, trigger: 'blur', validator: vertificationCode }]">
            <el-input v-model="validateForm.vertificationCode" type="text" placeholder="请输入验证码"
              autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item class="shortMargin">
            <el-collapse-transition>
              <div v-show="vertificationCodeCorrect">
                <el-alert title="验证成功" type="success" center show-icon :closable="false"></el-alert>
              </div>
            </el-collapse-transition>
          </el-form-item>

          <el-form-item class="shortMargin">
            <div class="shortHeight">
              <VerificationCodeModule :identifyCode="identifyCode"></VerificationCodeModule>
              <el-button @click="refreshCode" type='text'>看不清，换一张</el-button>
            </div>
          </el-form-item>

          <el-button type="primary" @click="submitForm" class="two-button-margin">登录</el-button>
          <el-button @click="goToRgister()">注册</el-button>
        </el-form>
      </el-card>
    </el-row>

    <el-row type="flex" justify="center">
      <el-image :src="require('@/assets/images/master_and_disciples.gif')" :fit="fit"></el-image>
    </el-row>

    <el-row type="flex" justify="center">
      <el-link type="info" @click="left_drawer = true">关于本站</el-link>
      <el-link type="info" @click="right_drawer = true">用户须知</el-link>
    </el-row>

    <el-row type="flex" justify="center">
      <el-image class="media-icon" :src="require('@/assets/images/wechat-icon-min.png')" :fit="fit"
        v-on:click="openDialog('wechat')"></el-image>
      <el-image class="media-icon" :src="require('@/assets/images/line-icon-min.png')" :fit="fit"
        v-on:click="openDialog('line')"></el-image>
      <el-image class="media-icon" :src="require('@/assets/images/mail-icon-min.png')" :fit="fit"
        v-on:click="mailDialogVisible = true"></el-image>
      <el-image class="media-icon" :src="require('@/assets/images/github-icon-min.png')" :fit="fit"
        v-on:click="directToGit"></el-image>
    </el-row>

    <el-row type="flex" justify="center">
      <el-dialog title="联系作者" :visible.sync="qrDialogVisible" center width="50%">
        <span>扫一扫下面的二维码</span>
        <el-divider></el-divider>
        <el-image class="qr-code-icon" :src="qrCodeUrl" :fit="fit"></el-image>
      </el-dialog>
    </el-row>

    <el-row type="flex" justify="center">
      <el-dialog title="联系作者" :visible.sync="mailDialogVisible" center width="50%">
        <span>请发送邮件至</span><i class="el-icon-s-promotion"></i>
        <el-link type="info" href="mailto:shurintou@gmail.com?subject = Hello">shurintou@gmail.com</el-link>
        <el-divider></el-divider>
        <el-image :src="require('@/assets/images/mail-background.png')" :fit="fit"></el-image>
      </el-dialog>
    </el-row>

    <el-drawer title="用户须知" :visible.sync="left_drawer" direction="ltr" size="300px" :with-header="false">
      <div style="height: 100%" class="drawer_background">
        <el-button style="float: right" icon="el-icon-back" size="small" type="info" effect="dark"
          @click="left_drawer = false"></el-button>
        <div class="drawer_background">
          <div style="margin-left: 3px;">
            <br>
            <br>
            <h2 style="text-align: center">关于本站</h2>
            <br>
            <span> 以下是本网站的相关信息。</span>
            <h4>建站初衷</h4>
            <p>西游记是作者与朋友们经常玩的一款线下棋牌游戏，但因为疫情影响，使得面对面的线下交流变得困难。</p>
            <p>而放眼线上的棋牌游戏平台，作者发现目前并没有任何一个平台上线这一款游戏。</p>
            <p>即便将来有望上线，多半还会伴随着客户端下载，氪金买道具等一系列不便。</p>
            <p>所以本站建站的初衷便是想通过建立这么一个网站，能够让因疫情远隔各地的朋友们可以有一个轻量、无课的游戏平台一起交流娱乐，同时也能够磨炼自己的编程技术。</p>
            <h4>网站定位</h4>
            <p>本网站是由私人开设的非营利性网站，仅供授权许可的用户休闲娱乐使用。</p>
            <h4>静态资源</h4>
            <p>本网站所使用的图片，音效资源均来自于网络上公开或已授权资源，及作者本人制作。如您发现其中有涉及到侵权的行为，请及时联系作者，经确认后将下架相应资源。</p>
            <h4>网站源码</h4>
            <p>本网站所使用的源码均由本站作者所写，并开源于Github供他人学习、借鉴、参考。</p>
            <h4>用户信息</h4>
            <p>本网站尊重用户个人隐私，不公开、盗用、贩售用户的任何个人信息。</p>
            <h4>关于作者</h4>
            <p>本站作者是一名中途入行的程序员，目前也正在学习中。欢迎各种技术交流切磋，也欢迎针对本网站提出建设性的意见和建议。</p>
            <h4>特别鸣谢</h4>
            <p>感谢H小姐在项目全程中给予作者的支持与鼓励。</p>
            <p>感谢W先生提供的的技术支持。</p>
            <p>感谢所有参与网站测评的好友们。</p>
            <p>感谢大家。</p>
            <br>
            <p>本站作者享有关于以上内容的最终解释权。</p>
          </div>
        </div>
      </div>
    </el-drawer>

    <el-drawer title="用户须知" :visible.sync="right_drawer" direction="rtl" size="300px" :with-header="false">
      <div style="height: 100%" class="drawer_background">
        <el-button icon="el-icon-right" size="small" type="info" effect="dark" @click="right_drawer = false"></el-button>
        <div class="drawer_background">
          <div style="margin-left: 3px;">
            <br>
            <br>
            <h2 style="text-align: center">用户须知</h2>
            <br>
            <span> 用户在使用本网站之前请先了解下述事宜。</span>
            <h4>禁止行为</h4>
            <p>本网站所提供内容仅供休闲娱乐使用，不得将本网站用于赌博等非法用途，对于非法用途所造成的损失及法律责任，本网站概不负责。</p>
            <h4>发布内容</h4>
            <p>用户应遵守所在国家的相关法律，不得在本网站上发布非法的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的、淫秽等不良言论或内容。</p>
            <p>用户对其所发布的内容单独承担全部法律责任，对于该内容所造成的不良影响与法律责任本站概不负责。</p>
            <h4>郑重声明</h4>
            <p>本站有可能在没有事先通知的情况下对网站信息进行修改，或者停止网站的使用。对于可能造成的用户损失本站概不负责。</p>
            <p>对于用户由于使用了本网站而带来的直接的或间接的不良影响或损失，本站概不负责。</p>
            <h4>关于链接</h4>
            <p>本网站有可能链接到第三方网站，但本站对其内容的安全性和可靠性不承担任何责任。</p>
            <br>
            <p>本站作者享有关于以上内容的最终解释权。</p>
          </div>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script lang="ts">
import { ElLoadingComponent } from 'element-ui/types/loading'
import { ExecuteValidator, ExecuteValidate } from '@/type/validator'
import VerificationCodeModule from '@/components/topPage/VerificationCode.vue'
import MusicButton from '@/components/topPage/MusicButton.vue'
import { verificationLogic } from '@/mixins/topPage/verificationLogic'
import { login } from '@/api/login'

const checkName: ExecuteValidator = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  }
  else {
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/
    if (!uPattern.test(value)) {
      callback(new Error('用户名须4到16位字母,数字,下划线,减号'));
    }
    else {
      callback();
    }
    callback();
  }
}
export default verificationLogic.extend({
  name: 'Login',
  data() {
    return {
      fit: 'fill',
      validateForm: {
        username: '',
        password: '',
        vertificationCode: ''
      },
      qrDialogVisible: false,
      mailDialogVisible: false,
      duplicateLoginFlag: false,
      left_drawer: false,
      right_drawer: false,
      qrCodeUrl: '',
      checkName: checkName,
      loading: null as ElLoadingComponent | null,
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!from || from.name === null) {
        if (vm.$stock.state.setting.playBgm) {
          vm.$notify({ title: '将要播放背景音乐', type: 'warning', dangerouslyUseHTMLString: true, message: '您可点击右上角<i class="el-icon-video-pause"></i>图标关闭背景音乐', offset: 50, duration: 8000, })
        }
      }
    })
  },

  methods: {
    submitForm: function () {
      if (this.duplicateLoginFlag) return;
      this.duplicateLoginFlag = true
      const validateFormRef = this.$refs.validateForm as Element & ExecuteValidate
      validateFormRef.validate((valid: boolean) => {
        if (valid) {
          this.loading = this.$loading({
            lock: true,
            text: '登录中',
            spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.7)'
          })
          login({ username: this.validateForm.username, password: this.validateForm.password })
            .then((res) => {
              if (res.account) {
                this.$router.push({ name: 'ChatRoom' })
                this.$stock.dispatch('initialization', res.account)
              }
              else {
                this?.loading?.close()
              }
            })
            .catch(() => {
              this?.loading?.close()
            })
            .finally(() => {
              this.duplicateLoginFlag = false
            })
        }
        else {
          this.$message.error('请正确填写登录信息');
          this.duplicateLoginFlag = false
        }
      })
      this.refreshCode()
    },

    goToRgister: function () {
      this.$router.push({ name: 'Register' })
    },

    directToGit: function () {
      window.open('https://github.com/shurintou/journey-to-the-west')
    },

    openDialog: function (which: 'wechat' | 'line') {
      this.qrDialogVisible = true
      if (which === 'wechat') {
        this.qrCodeUrl = require('@/assets/images/wechat-qr-code-min.png')
      }
      else if (which === 'line') {
        this.qrCodeUrl = require('@/assets/images/line-qr-code-min.png')
      }
    },

    enterLogin: function (e: KeyboardEvent) {
      if (e.key === 'Enter') this.submitForm()
    },
  },

  components: {
    VerificationCodeModule,
    MusicButton,
  },

  mixins: [verificationLogic]
})
</script>

<style scoped>
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100vh;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-card {
  border-radius: 30px;
  width: 350px;
}

.grid-content {
  border-radius: 4px;
  min-height: 80px;
}

.el-row {
  margin-bottom: 20px;
}

.el-form-item {
  width: 280px;
}

.el-link {
  margin-right: 2%;
}

.two-button-margin {
  margin-left: 20%;
  margin-right: 10%;
}

.media-icon {
  min-width: 30px;
  min-height: 30px;
  width: 3%;
  height: 3%;
  margin: 1%;
}

.media-icon:hover {
  cursor: pointer;
}

.qr-code-icon {
  min-width: 60px;
  min-height: 60px;
  width: 40%;
  height: 40%;
  margin-left: 30%;
}

.shortMargin {
  margin-bottom: 9px;
}

.shortHeight {
  line-height: 0px
}

.drawer_background {
  background-image: url('@/assets/images/icon-select-background.png');
  background-size: 100% 100%;
}
</style>


<style>
.el-drawer__body {
  overflow: auto;
}
</style>