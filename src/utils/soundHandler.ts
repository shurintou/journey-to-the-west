import vuex from '@/store/index'

export function playSound(path: string) {
    if (!vuex.state.setting.playSound) {
        return
    }
    let audios = document.querySelectorAll('.audio_pool') as NodeListOf<HTMLAudioElement>
    let freeAudioIndex = -1
    for (let i = 0; i < audios.length; i++) {
        if (audios[i].ended) {
            freeAudioIndex = i
            break
        }
    }
    if (freeAudioIndex > -1) {
        let audio = document.querySelector('#audio_' + freeAudioIndex) as HTMLAudioElement
        let mpeg = document.querySelector('#mpeg_' + freeAudioIndex) as HTMLAudioElement
        let ogg = document.querySelector('#ogg_' + freeAudioIndex) as HTMLAudioElement
        let embed = document.querySelector('#embed_' + freeAudioIndex) as HTMLAudioElement
        mpeg.src = require('@/assets/musics/' + path + '.mp3')
        ogg.src = require('@/assets/musics/' + path + '.ogg')
        embed.src = require('@/assets/musics/' + path + '.mp3')
        audio.load()
        setTimeout(() => {
            audio.play()
        }, 200)
    }
}

export function playBgm(isFirst?: boolean) {
    let bgm = document.querySelector('#bgm') as HTMLAudioElement
    if (isFirst !== undefined && isFirst === true) {
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

export function modifyBgmVolume(value: number) {
    let bgm = document.querySelector('#bgm') as HTMLAudioElement
    bgm.volume = value
}

export function modifySoundVolume(value: number) {
    let audios = document.querySelectorAll('.audio_pool') as NodeListOf<HTMLAudioElement>
    audios.forEach(audio => audio.volume = value)
}