import vuex from '../store/index'

export function playSound(data) {
    if (!vuex.state.setting.playSound) {
        return
    }
    let audios = document.querySelectorAll('.audio_pool')
    let freeAudioIndex = -1
    for (let i = 0; i < audios.length; i++) {
        if (audios[i].ended) {
            freeAudioIndex = i
            break
        }
    }
    if (freeAudioIndex > -1) {
        let audio = document.querySelector('#audio_' + freeAudioIndex)
        let mpeg = document.querySelector('#mpeg_' + freeAudioIndex)
        let ogg = document.querySelector('#ogg_' + freeAudioIndex)
        let embed = document.querySelector('#embed_' + freeAudioIndex)
        mpeg.src = require('@/assets/musics/' + data + '.mp3')
        ogg.src = require('@/assets/musics/' + data + '.ogg')
        embed.src = require('@/assets/musics/' + data + '.mp3')
        audio.load()
        setTimeout(() => {
            audio.play()
        }, 200)
    }
}

export function playBgm(isFirst) {
    let bgm = document.querySelector('#bgm')
    if (isFirst && isFirst === true) {
        //第一次播放，如果vuex是flase则暂停
        bgm.load()
        bgm.play()
            .then(() => {
                if (!vuex.state.setting.playBgm) {
                    bgm.pause()
                }
            })
        return
    }
    if (vuex.state.setting.playBgm) {
        bgm.play()
    }
    else {
        bgm.pause()
    }
}

export function modifyBgmVolume(value) {
    let bgm = document.querySelector('#bgm')
    bgm.volume = value
}

export function modifySoundVolume(value) {
    let audios = document.querySelectorAll('.audio_pool')
    audios.forEach(audio => audio.volume = value)
}