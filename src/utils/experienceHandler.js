var levelUpExp = [100, 300, 600, 1000, 1500, 2200, 3000, 3900, 4900, 6000, 7500, 9300, 11500, 14200, 17500, 22500, 30000, 42000, 59000, 85000]

export function calAllStaffsOfExperience(currentExp){
    let nextLevelExp = 0
    let level = 0
    let expPecent = 0

    for( var i = 0; i < levelUpExp.length; i++){
        if(currentExp < levelUpExp[i]){
            nextLevelExp = levelUpExp[i]
            level = i + 1
            expPecent = Math.round(100 * currentExp / levelUpExp[i] )
            return { nextLevelExp: nextLevelExp, level: level, expPecent: expPecent, currentExp: currentExp  }
        }
        else{
            currentExp = currentExp - levelUpExp[i]
        }
    }
    currentExp = NaN
    nextLevelExp = NaN
    level = 20
    expPecent = 100
    return { nextLevelExp: nextLevelExp, level: level, expPecent: expPecent, currentExp: currentExp  }
}