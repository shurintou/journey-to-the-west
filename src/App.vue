<template>
	<div id="app">
		<div>
			<router-view />
		</div>
		<MusicModule></MusicModule>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { playBgm } from '@/utils/soundHandler'
import { authorization } from '@/api/authorization'
import { getToken } from '@/utils/cookie'
import MusicModule from '@/components/topPage/MusicModule.vue'

export default Vue.extend({

	created: function () {
		if (!getToken()) {
			if (this.$route.path !== '/login') {
				this.$router.push({ name: 'Login' })
			}
			return
		}
		authorization()
		.then((res) => {
			this.$stock.dispatch('initialization', res.account)
			if (this.$route.path === '/chatroom') {
				return
			}
			this.$router.push({ name: 'ChatRoom' })
		})
		.catch(() => { })
	},

	mounted: function () {
		window.addEventListener("click", this.registerEffectAudio, false)
	},

	methods: {
		registerEffectAudio: function () {
			const audios = document.querySelectorAll('.audio_pool') as NodeListOf<HTMLAudioElement>
			audios.forEach(audio => audio.play())
			playBgm()
			window.removeEventListener("click", this.registerEffectAudio)
		}
	},

	components: {
		MusicModule,
	},
})
</script>