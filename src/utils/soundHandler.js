import vuex from '../store/index'

export function playSound(data){
    if(!vuex.state.setting.playSound){
        return
    }
    let audio = document.querySelector('#audio')
    let mpeg = document.querySelector('#mpeg')
    let ogg = document.querySelector('#ogg')
    let embed = document.querySelector('#embed')
    mpeg.src = require('@/assets/musics/' + data + '.mp3')
    ogg.src = require('@/assets/musics/' + data + '.ogg')
    embed.src = require('@/assets/musics/' + data + '.mp3')
    audio.load()
    setTimeout(() => {
        audio.play()
    }, 200)
}

export function playBgm(isFirst){
    let bgm = document.querySelector('#bgm')
    if(isFirst && isFirst === true){
        //第一次播放，如果vuex是flase则暂停
        bgm.load()
        bgm.play()
        .then(() => {
            if(!vuex.state.setting.playBgm){
                bgm.pause()
            }
        })
        return
    }
    if(vuex.state.setting.playBgm){
        bgm.play()
    }
    else{
        bgm.pause()
    }
}