<template>
    <div>
        <audio id="bgm" loop>
            <source :src="require('@/assets/musics/bgm.mp3')" type="audio/mpeg">
            <source :src="require('@/assets/musics/bgm.ogg')" type="audio/ogg">
            <embed :src="require('@/assets/musics/bgm.mp3')">
        </audio>
        <audio class="audio_pool" :id="'audio_' + index" v-for="(n, index) in audioPoolSize" :key="n">
            <source :id="'mpeg_' + index" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source :id="'ogg_' + index" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed :id="'embed_' + index" :src="require('@/assets/musics/mute.mp3')">
        </audio>
    </div>
</template>

<script>
export default {
    data() {
        return {
            audioPoolSize: 8,
        }
    },
}
</script>