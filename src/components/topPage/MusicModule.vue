<template>
    <div>
        <audio id="bgm" loop>
            <source :src="require('@/assets/musics/bgm.mp3')" type="audio/mpeg">
            <source :src="require('@/assets/musics/bgm.ogg')" type="audio/ogg">
            <embed :src="require('@/assets/musics/bgm.mp3')">
        </audio>
        <audio class="audio_pool" id="audio_0">
            <source id="mpeg_0" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source id="ogg_0" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed id="embed_0" :src="require('@/assets/musics/mute.mp3')">
        </audio>
        <audio class="audio_pool" id="audio_1">
            <source id="mpeg_1" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source id="ogg_1" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed id="embed_1" :src="require('@/assets/musics/mute.mp3')">
        </audio>
        <audio class="audio_pool" id="audio_2">
            <source id="mpeg_2" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source id="ogg_2" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed id="embed_2" :src="require('@/assets/musics/mute.mp3')">
        </audio>
        <audio class="audio_pool" id="audio_3">
            <source id="mpeg_3" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source id="ogg_3" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed id="embed_3" :src="require('@/assets/musics/mute.mp3')">
        </audio>
        <audio class="audio_pool" id="audio_4">
            <source id="mpeg_4" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source id="ogg_4" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed id="embed_4" :src="require('@/assets/musics/mute.mp3')">
        </audio>
        <audio class="audio_pool" id="audio_5">
            <source id="mpeg_5" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source id="ogg_5" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed id="embed_5" :src="require('@/assets/musics/mute.mp3')">
        </audio>
        <audio class="audio_pool" id="audio_6">
            <source id="mpeg_6" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source id="ogg_6" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed id="embed_6" :src="require('@/assets/musics/mute.mp3')">
        </audio>
        <audio class="audio_pool" id="audio_7">
            <source id="mpeg_7" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source id="ogg_7" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed id="embed_7" :src="require('@/assets/musics/mute.mp3')">
        </audio>
    </div>
</template>