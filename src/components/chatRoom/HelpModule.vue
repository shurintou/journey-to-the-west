<template>
    <el-tabs type="border-card" v-model="activeHelpModuleTabName">
        <el-tab-pane label="游戏规则" name="rule" lazy>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-warning-outline"></i>游戏简介</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">西游记是一种类似于“斗兽棋”的扑克牌游戏，进行该游戏至少需要2名玩家，可使用2~10副扑克牌，扑克牌数可依玩家人数酌情增减。</p>
            <p :style="{ 'font-size': fontSize }">另外，西游记的游戏规则各个地方不尽相同，以下游戏说明仅代表作者本人观点。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-stopwatch"></i>游戏流程</h1>
            <hr class="divider-line">
            <h2 :style="{ 'font-size': fontSize }">开局：</h2>
            <p :style="{ 'font-size': fontSize }">开局每名玩家起5张牌作为手牌，然后由随机一名(或上局收牌数最多的)玩家开始出牌。</p>
            <h2 :style="{ 'font-size': fontSize }">顺序：</h2>
            <p :style="{ 'font-size': fontSize }">一般由开局出牌玩家开始按逆时针顺序出牌，当有玩家打出观音或如来时，反转出牌方向。</p>
            <h2 :style="{ 'font-size': fontSize }">出牌：</h2>
            <p :style="{ 'font-size': fontSize }">若台面上无牌，玩家可打出同一牌点(如♠A和<span
                    style="color: red">♥A</span>)的任意张牌；若台面上有上家打出的牌，则下家须根据大小顺序打出 <u>张数相同且牌型“大于”上家牌的牌</u>，依次类推。</p>
            <h2 :style="{ 'font-size': fontSize }">连击：</h2>
            <p :style="{ 'font-size': fontSize }">打出的牌计入连击牌池，计+1。当出牌数大于1时，从第二次连击开始将产生从出牌数起计的倍乘效果。</p>
            <p :style="{ 'font-size': fontSize }">如连续5人打出2张牌，倍乘从2开始起计，则连击数计为： 2, 6(2+2*2), 12(6+3*2), 20(12+4*2), 30(20+5*2)。
            </p>
            <p :style="{ 'font-size': fontSize }">如连续5人打出3张牌，倍乘从3开始起计，则连击数计为： 3, 12(3+3*3), 24(12+4*3), 39(24+5*3),
                57(39+6*3)。 </p>
            <h2 :style="{ 'font-size': fontSize }">补牌：</h2>
            <p :style="{ 'font-size': fontSize }">每次玩家出完牌后，若剩余牌堆里还有牌，则将手牌补到5张。</p>
            <h2 :style="{ 'font-size': fontSize }">收牌：</h2>
            <p :style="{ 'font-size': fontSize }">当玩家打不出“大于”牌时，则放弃出牌并收下所有连击牌池中的牌，计入自己的收牌数，然后重新开始出牌。</p>
            <h2 :style="{ 'font-size': fontSize }">结算：</h2>
            <p :style="{ 'font-size': fontSize }">当所有玩家的手牌出完后，结算所有玩家的收牌数，结束游戏。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-finished"></i>大小顺序</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">西游记使用全副扑克牌，牌点大小的比较类似于斗兽棋。</p>
            <p :style="{ 'font-size': fontSize }">其中</p>
            <h2 :style="{ 'font-size': fontSize }">特殊牌：</h2>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/3A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">牌点3，代表沙僧，大于所有妖怪。</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/8A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">牌点8，代表八戒，大于所有妖怪和沙僧。</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/5A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">牌点5，代表悟空，大于所有妖怪、沙僧和八戒。</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/10A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">牌点10，代表师傅，大于三徒弟，小于所有妖怪。</span>
            <br>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/poker/red-joker.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/poker/black-joker.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">大小王，分别代表如来和观音，能应对所有牌点，打出后反转出牌方向，原上家打出的牌依然保留。</span>
            <p :style="{ 'font-size': fontSize }">注意：大小王视为同一牌点。</p>
            <br>
            <h2 :style="{ 'font-size': fontSize }">妖怪牌：</h2>
            <p :style="{ 'font-size': fontSize }">除特殊牌外，其余牌点均为妖怪，</p>
            <span :style="{ 'font-size': fontSize }">大小顺序为</span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">最小</span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/1A.png')"></el-avatar>
            <span :style="{ 'font-size': fontSize }">最大。</span>
            <br>
            <br>
            <h2 :style="{ 'font-size': fontSize }">花色顺序：</h2>
            <p :style="{ 'font-size': fontSize }">同一牌点，花色按</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2C.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">从小到大排序。</p>
            <br>
            <h2 :style="{ 'font-size': fontSize }">多牌比较：</h2>
            <p :style="{ 'font-size': fontSize }">当上家牌数量大于1时，比较规则为 <u>每张牌均不小于上家牌，并且其中至少有一张“大于”上家牌。</u></p>
            <p :style="{ 'font-size': fontSize }">例如上家打出以下牌型：</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2C.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <br>
            <p :style="{ 'font-size': fontSize }">则根据上述比较规则，下家须至少打出</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">的牌型。</p>
            <p :style="{ 'font-size': fontSize }">而下家如果想打下面这种牌型</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">虽然其中一张♠2比<span style="color: red">♥2</span>大，但<span
                    style="color: red">♦2</span>小于♣2，不满足比较规则，所以不能打出。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-magic-stick"></i>变身牌</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">既然孙悟空有七十二变，那么西游记中自然不能缺少变身元素。</p>
            <p :style="{ 'font-size': fontSize }">变身牌，顾名思义，可以改变自身牌面的牌。其规则和用法类似于部分地区斗地主中使用的“癞子牌”。</p>
            <span :style="{ 'font-size': fontSize }">在游戏中，带有蓝色边框的牌即是变身牌，如:</span>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/bianshen-example.png')"></el-avatar>
            <h2 :style="{ 'font-size': fontSize }">变身规则：</h2>
            <p :style="{ 'font-size': fontSize }">1. 变身牌须搭配其他牌(原形牌)使用才有效，单独打出时等同于打出其自身。</p>
            <span :style="{ 'font-size': fontSize }">如单独打出:</span>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/bianshen-example.png')"></el-avatar>
            <br>
            <span :style="{ 'font-size': fontSize }">相当于打出: </span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <br>
            <span :style="{ 'font-size': fontSize }">如组合打出: </span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/3D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40"
                :src="require('@/assets/images/bianshen-example.png')"></el-avatar>
            <br>
            <span :style="{ 'font-size': fontSize }">相当于打出: </span>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/3D.png')"></el-avatar>
            <el-avatar shape="square" style="margin-left: 0.5%" :size="avatarSize + 40"
                :src="require('@/assets/images/poker/3A.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">上述例子中，<span style="color: red">♦3</span>称为“原形牌”。</p>
            <p :style="{ 'font-size': fontSize }">2. 变身牌变身后，牌点变为原形牌的牌点，花色保持自身的花色。</p>
            <p :style="{ 'font-size': fontSize }">3. 变身牌不能变身观音或如来(即反弹牌)。</p>
            <h2 :style="{ 'font-size': fontSize }">使用方法：</h2>
            <p :style="{ 'font-size': fontSize }">1. 要使用变身牌，首先请选择要作为变身对象的原形牌，如上述<span style="color: red">♦3</span>。</p>
            <p :style="{ 'font-size': fontSize }">2. 然后点击 <el-tag type="primary" effect="dark">变身</el-tag> 按钮，选择变身牌，如上述♠2。</p>
            <p :style="{ 'font-size': fontSize }">3. 选好变身牌后，最后点击出牌即可。</p>
        </el-tab-pane>

        <el-tab-pane label="游戏技巧" name="skill" lazy>
            <p :style="{ 'font-size': fontSize }"><i
                    class="el-icon-warning-outline"></i>西游记游戏本身并没有什么太多技巧，玩家收牌多少，运气占很大部分，以下技巧仅供参考。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-star-on"></i>保持牌型</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">尽量保证自己手上有各种牌型：妖怪、徒弟、师傅，缺一不可。观音和如来则不到万不得已尽量不用，留作杀手锏。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-star-on"></i>小牌先出</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">大多数时候，先把小牌打出去都是正确的选择，当然也有特殊情况，具体可参考下方“控制局势”。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-star-on"></i>战略性收牌</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">当连击牌池中的牌数不多，且手上的牌如以下所示时</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2A.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/2B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/11A.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/3D.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">虽然收牌并不是我们想要的，但从长远的战略眼光来看，可以忍痛收下牌，然后把3个2一次性打出以调整自己的手牌组合。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-star-on"></i>控制局势</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">大部分情况下，牌局的走势是不受我们控制的，但我们仍然可以在一定范围内左右它。</p>
            <p :style="{ 'font-size': fontSize }">比如一场5人局游戏，我们手上有以下牌型</p>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/4C.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/6B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/13B.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/1D.png')"></el-avatar>
            <el-avatar shape="square" :size="avatarSize + 40" :src="require('@/assets/images/poker/8B.png')"></el-avatar>
            <p :style="{ 'font-size': fontSize }">此时上家打出了一个♠2，</p>
            <p :style="{ 'font-size': fontSize }">
                虽然大多数时候我们都从小牌出起，但考虑到局势的发展，如果我们接着打出♣4，等再次轮到我们时，上家牌极有可能是徒弟牌，而此时我们手上徒弟师傅牌不足，无法应付可能到来的情况。</p>
            <p :style="{ 'font-size': fontSize }">所以一个较为大胆的做法是：打出K或者A。这样大概率等再次轮到我们时，上家牌会是师傅或者一个点数较小的妖怪。</p>
            <p :style="{ 'font-size': fontSize }">当然，以上只是举例，实际情况可能更加复杂，须根据自己的手牌情况和场上局势来判断。</p>
            <p :style="{ 'font-size': fontSize }">如开头所说，牌局的走势大多数时候是不可控的，况且还有观音如来这些逆天因素的存在，以上方法并不总是有效。</p>
        </el-tab-pane>

        <el-tab-pane label="常见问题" name="questions" lazy>
            <el-collapse v-model="activeQuestionNames">
                <el-collapse-item name="0">
                    <template slot="title">
                        <i class="el-icon-info"></i><span :style="{ 'font-size': fontSize }">作者建议</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">1：建议尽量使用当今的主流浏览器如Chorme, Safari, Firefox等。</p>
                        <p :style="{ 'font-size': fontSize }">2：建议尽量使用大屏幕手机以防止画面出现元素重叠，溢出边界等问题。</p>
                        <p :style="{ 'font-size': fontSize }">3：遇到系统性问题时，可先尝试刷新网页。刷新后如果问题仍没有得到解决，请参考下面回答或联系作者。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="1">
                    <template slot="title">
                        <i class="el-icon-question"></i><span
                            :style="{ 'font-size': fontSize }">Q：画面出现不正常抖动，溢出边界，渲染错误等问题？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">
                            尽管作者已针对各种主流浏览器和移动端做出了响应式布局的设计，但仍然有部分移动端的尺寸会使得画面无法被正确渲染，解决的办法是尝试切换横竖屏后刷新网页。</p>
                        <p :style="{ 'font-size': fontSize }">注意：切换横竖屏后不刷新网页可能会导致一些画面元素渲染位置不正确的问题。</p>
                        <p :style="{ 'font-size': fontSize }">
                            如果切换横竖屏刷新后仍不能解决您的问题，请将您所使用的移动端机型以及出现问题的画面截屏发送给作者以使我们作出针对该机型的调整，谢谢。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：登录网页时不想播放音乐？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">点击登录页面右上角的播放键即可关闭音乐的自动播放。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="3">
                    <template slot="title">
                        <i class="el-icon-question"></i><span
                            :style="{ 'font-size': fontSize }">Q：设置了背景音乐和游戏音效开启但仍然没有声音？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">由于ios等移动端的限制，进入本网页时并不会自动播放音乐，而是需要点击屏幕一下以激活音乐播放器，才能成功播放音乐。</p>
                        <p :style="{ 'font-size': fontSize }">如果您点击了屏幕后仍不会播放音乐，请将您所使用的浏览器和移动端机型发送给作者以使我们作出针对性的调整，谢谢。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="4">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：无法通过游戏内设置调整音量？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">如果您是ios用户，由于ios禁止通过网页调整系统音量，所以ios用户的设置面板上没有调整音量的选项。</p>
                        <p :style="{ 'font-size': fontSize }">
                            如果您不是ios用户，那么可以认为您使用的移动端也采取了与上述ios相同的策略，请将您的移动端机型发送给作者以使我们作出针对该机型的调整，谢谢。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="5">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：游戏内托管失败？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">由于本网页的游戏数据并没有设置锁机制，所以当网络延迟较大时，提交托管可能会失败，属正常行为。</p>
                        <p :style="{ 'font-size': fontSize }">建议您在玩游戏时保持通畅的网咯。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="6">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：游戏内如何快速出牌？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">在选择好要出的牌后，除了点击“出牌”按钮，还可以通过点击台面来出牌。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="7">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：游戏进行时如何与玩家交流？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">本网页效仿了各种棋牌游戏的防作弊机制，即游戏进行中时不能通过打字与其他玩家交流。</p>
                        <p :style="{ 'font-size': fontSize }">但我们仍为您准备了一些快速发言的语句，可以通过点击玩家或自己的计分板来选择要说的话。</p>
                    </div>
                </el-collapse-item>
                <el-collapse-item name="8">
                    <template slot="title">
                        <i class="el-icon-question"></i><span :style="{ 'font-size': fontSize }">Q：快速发言中的方言是？</span>
                    </template>
                    <div>
                        <p :style="{ 'font-size': fontSize }">作者家乡的桂林话及一些自创的术语。其中</p>
                        <p :style="{ 'font-size': fontSize }">洗：通日语「しね」(shi ne)，与叫玩家收牌的“收”一个意思，但表达语气更强烈。</p>
                        <p :style="{ 'font-size': fontSize }">所所所：所，通日语师匠的匠「しょう」(syo)，意为“求师傅”。</p>
                        <p :style="{ 'font-size': fontSize }">卷卷卷：桂林话的“转”，意味“求转向”。</p>
                        <p :style="{ 'font-size': fontSize }">我霉了：霉，桂林话，一般指物理状态的软烂，此处大意为“我人没了”、“我烂掉了”、“我拉跨了”。</p>
                        <p :style="{ 'font-size': fontSize }">瘾：桂林话，大意为“过瘾”、“痛快”。</p>
                        <p :style="{ 'font-size': fontSize }">我好方啊：方，桂林话，意思同“慌”。</p>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-tab-pane>

        <el-tab-pane label="联系作者" name="contact" lazy>
            <i class="el-icon-info"></i><span :style="{ 'font-size': fontSize }">作者建议</span>
            <p :style="{ 'font-size': fontSize }">如果您遇到问题或Bug，请尽快联系作者解决。同时也欢迎各种技术交流切磋，或针对本网站提出的建设性意见和建议。</p>
            <p :style="{ 'font-size': fontSize }">联系作者时请表明来意，如果是报告问题或Bug请同时提供相应的截图、移动端机型和浏览器类型，谢谢。</p>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-chat-dot-round"></i>社交媒体</h1>
            <hr class="divider-line">
            <el-row :gutter="20">
                <el-col :span="2">
                    <div style="visibility: hidden">123</div>
                </el-col>
                <el-col :span="10">
                    <div style="text-align: center">
                        <p :style="{ 'font-size': fontSize }">微信</p>
                        <el-avatar shape="square" :size="avatarSize + 80"
                            :src="require('@/assets/images/wechat-qr-code-min.png')"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="10">
                    <div style="text-align: center">
                        <p :style="{ 'font-size': fontSize }">line</p>
                        <el-avatar shape="square" :size="avatarSize + 80"
                            :src="require('@/assets/images/line-qr-code-min.png')"></el-avatar>
                    </div>
                </el-col>
                <el-col :span="2">
                    <div></div>
                </el-col>
            </el-row>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-chat-dot-round"></i>发送邮件</h1>
            <hr class="divider-line">
            <span :style="{ 'font-size': fontSize }">请发送邮件至</span><i class="el-icon-s-promotion"></i>
            <el-link type="info" href="mailto:shurintou@gmail.com?subject = Hello">shurintou@gmail.com</el-link>
            <h1 :style="{ 'font-size': fontSize }"><i class="el-icon-chat-dot-round"></i>Github</h1>
            <hr class="divider-line">
            <p :style="{ 'font-size': fontSize }">如果您拥有Github账号，您也可以在上面向作者提出issue。</p>
            <span :style="{ 'font-size': fontSize }">前端项目：</span><el-link type="success"
                href="https://github.com/shurintou/journey-to-the-west"
                target="_blank">https://github.com/shurintou/journey-to-the-west</el-link>
            <br>
            <span :style="{ 'font-size': fontSize }">后端项目：</span><el-link type="warning"
                href="https://github.com/shurintou/server-of-jttw"
                target="_blank">https://github.com/shurintou/server-of-jttw</el-link>
            <p :style="{ 'font-size': fontSize }">如果您觉得本网页体验不错，您还可以在Github上给该项目点星<i class="el-icon-star-off"></i>以支持我们，谢谢。</p>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    data() {
        return {
            activeHelpModuleTabName: 'rule',
            activeQuestionNames: ['0'],
        }
    },

    props: {
        fontSize: { type: String, default: '' },
        avatarSize: { type: Number, default: 20 },
        isShowing: { type: Boolean, default: false },
    },

    watch: {
        isShowing: function (newVal) {
            if (newVal) {
                this.activeHelpModuleTabName = 'rule'
                this.activeQuestionNames = ['0']
            }
        }
    },
}
</script>

<style scoped>.divider-line {
    background-color: rgb(233, 233, 235);
    height: 1px;
    border: 0;
}</style>