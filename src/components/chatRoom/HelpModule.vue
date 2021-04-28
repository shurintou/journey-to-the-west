<template>
    <el-tabs type="border-card" v-model="activeHelpModuleTabName">
        <el-tab-pane label="游戏规则" name="rule" lazy>
            <h1 :style="{'font-size': fontSize}"><i class="el-icon-warning-outline"></i>游戏简介</h1>
            <hr class="divider-line">
            <p :style="{'font-size': fontSize}">西游记是一种类似于“斗兽棋”的扑克牌游戏，进行该游戏至少需要2名玩家，可使用2~10副扑克牌，扑克牌数可依玩家人数酌情增减。</p>
            <p :style="{'font-size': fontSize}">另外，西游记的游戏规则各个地方不尽相同，以下游戏说明仅代表作者本人观点。</p>
            
            <h1 :style="{'font-size': fontSize}"><i class="el-icon-stopwatch"></i>游戏流程</h1>
            <hr class="divider-line">
            <h2 :style="{'font-size': fontSize}">开局：</h2>
            <p :style="{'font-size': fontSize}">开局每名玩家起5张牌作为手牌，然后由随机一名(或上局收牌数最多的)玩家开始出牌。</p>
            <h2 :style="{'font-size': fontSize}">顺序：</h2>
            <p :style="{'font-size': fontSize}">一般由开局出牌玩家开始按逆时针顺序出牌，当有玩家打出观音或如来时，反转出牌方向。</p>
            <h2 :style="{'font-size': fontSize}">出牌：</h2>
            <p :style="{'font-size': fontSize}">若台面上无牌，玩家可打出同一牌点(如♠A和<span style="color: red">♥A</span>)的任意张牌；若台面上有上家打出的牌，则下家须根据大小顺序打出 <u>张数相同且牌型“大于”上家牌的牌</u>，依次类推。</p>
            <h2 :style="{'font-size': fontSize}">连击：</h2>
            <p :style="{'font-size': fontSize}">打出的牌计入连击牌池。并且当出牌数大于1时，每次连击还将产生倍乘效果。</p>
            <h2 :style="{'font-size': fontSize}">补牌：</h2>
            <p :style="{'font-size': fontSize}">每次玩家出完牌后，若剩余牌堆里还有牌，则将手牌补到5张。</p>
            <h2 :style="{'font-size': fontSize}">收牌：</h2>
            <p :style="{'font-size': fontSize}">当玩家打不出“大于”牌时，则放弃出牌并收下所有连击牌池中的牌，计入自己的收牌数，然后重新开始出牌。</p>
            <h2 :style="{'font-size': fontSize}">结算：</h2>
            <p :style="{'font-size': fontSize}">当所有玩家的手牌出完后，结算所有玩家的收牌数，结束游戏。</p>

            <h1 :style="{'font-size': fontSize}"><i class="el-icon-finished"></i>大小顺序</h1>
            <hr class="divider-line">
            <p :style="{'font-size': fontSize}">西游记使用全副扑克牌，牌点大小的比较类似于斗兽棋。</p>
            <p :style="{'font-size': fontSize}">其中</p>
            <h2 :style="{'font-size': fontSize}">特殊牌：</h2>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/3A.png')"></el-avatar>
            <span :style="{'font-size': fontSize}">牌点3，代表沙僧，大于所有妖怪。</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/8A.png')"></el-avatar>
            <span :style="{'font-size': fontSize}">牌点8，代表八戒，大于所有妖怪和沙僧。</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/5A.png')"></el-avatar>
            <span :style="{'font-size': fontSize}">牌点5，代表悟空，大于所有妖怪、沙僧和八戒。</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/10A.png')"></el-avatar>
            <span :style="{'font-size': fontSize}">牌点10，代表师傅，大于三徒弟，小于所有妖怪。</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/red-joker.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/black-joker.png')"></el-avatar>
            <span :style="{'font-size': fontSize}">大小王，分别代表如来和观音，能应对所有牌点，打出后反转出牌方向，原上家打出的牌依然保留。</span>
            <p :style="{'font-size': fontSize}">注意：大小王视为同一牌点。</p>
            <br>
            <h2 :style="{'font-size': fontSize}">妖怪牌：</h2>
            <p :style="{'font-size': fontSize}">除特殊牌外，其余牌点均为妖怪，</p>
            <span :style="{'font-size': fontSize}">大小顺序为</span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <span :style="{'font-size': fontSize}">最小</span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/1A.png')"></el-avatar>
            <span :style="{'font-size': fontSize}">最大。</span>
            <br>
            <br>
            <h2 :style="{'font-size': fontSize}">花色顺序：</h2>
            <p :style="{'font-size': fontSize}">同一牌点，花色按</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2C.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <p :style="{'font-size': fontSize}">从小到大排序。</p>
            <br>
            <h2 :style="{'font-size': fontSize}">多牌比较：</h2>
            <p :style="{'font-size': fontSize}">当上家牌数量大于1时，比较规则为 <u>每张牌均不小于上家牌，并且其中至少有一张“大于”上家牌</u></p>
            <p :style="{'font-size': fontSize}">例如上家打出以下牌型：</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2C.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <br>
            <p :style="{'font-size': fontSize}">则根据上述比较规则，下家须至少打出</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <p :style="{'font-size': fontSize}">的牌型。</p>
            <p :style="{'font-size': fontSize}">而下家如果想打下面这种牌型</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <p :style="{'font-size': fontSize}">虽然其中一张♠2比<span style="color: red">♥2</span>大，但<span style="color: red">♦2</span>小于♣2，不满足比较规则，所以不能打出。</p>


            
            <p :style="{'font-size': fontSize}"></p>

        </el-tab-pane>
        <el-tab-pane label="等级经验" name="level" lazy>暂未开放</el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    data() {
        return{
            activeHelpModuleTabName: 'rule',
        }
    },

    props:{
        fontSize: {type: String, default: ''},
        avatarSize: {type: Number, default: 20},
        isShowing: {type: Boolean, default: false},
    },

    watch:{
        isShowing: function(newVal){
            if(newVal){
                this.activeHelpModuleTabName = 'rule'
            }
        }
    },
}
</script>

<style scoped>
.divider-line{
    background-color: rgb(233, 233, 235);
    height: 1px;
    border: 0;
}
</style>