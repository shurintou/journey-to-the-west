import vuex from '@/store/index'

export function playSound(path: string) {
    if (!vuex.state.setting.playSound) {
        return
    }
    const audios = document.querySelectorAll('.audio_pool') as NodeListOf<HTMLAudioElement>
    let freeAudioIndex = -1
    for (let i = 0; i < audios.length; i++) {
        if (audios[i].ended) {
            freeAudioIndex = i
            break
        }
    }
    if (freeAudioIndex > -1) {
        const audio = document.querySelector('#audio_' + freeAudioIndex) as HTMLAudioElement
        const mpeg = document.querySelector('#mpeg_' + freeAudioIndex) as HTMLAudioElement
        const ogg = document.querySelector('#ogg_' + freeAudioIndex) as HTMLAudioElement
        const embed = document.querySelector('#embed_' + freeAudioIndex) as HTMLAudioElement
        mpeg.src = require('@/assets/musics/' + path + '.mp3')
        ogg.src = require('@/assets/musics/' + path + '.ogg')
        embed.src = require('@/assets/musics/' + path + '.mp3')
        audio.load()
        setTimeout(() => {
            audio.play()
        }, 200)
    }
}

export function playBgm() {
    const bgm = document.querySelector('#bgm') as HTMLAudioElement
    if (vuex.state.setting.playBgm) {
        bgm.play()
    }
    else {
        bgm.pause()
    }
}

export function modifyBgmVolume(value: number) {
    const bgm = document.querySelector('#bgm') as HTMLAudioElement
    bgm.volume = value
}

export function modifySoundVolume(value: number) {
    const audios = document.querySelectorAll('.audio_pool') as NodeListOf<HTMLAudioElement>
    audios.forEach(audio => audio.volume = value)
}