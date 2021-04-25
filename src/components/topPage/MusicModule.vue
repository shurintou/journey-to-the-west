<template>
    <div>
        <audio id="bgm" loop>
            <source :src="require('@/assets/musics/bgm.mp3')" type="audio/mpeg">
            <source :src="require('@/assets/musics/bgm.ogg')" type="audio/ogg">
            <embed :src="require('@/assets/musics/bgm.mp3')">
        </audio>
        <audio id="audio">
            <source id="mpeg" :src="require('@/assets/musics/mute.mp3')" type="audio/mpeg">
            <source id="ogg" :src="require('@/assets/musics/mute.ogg')" type="audio/ogg">
            <embed id="embed" :src="require('@/assets/musics/mute.mp3')">
        </audio>
    </div>
</template>