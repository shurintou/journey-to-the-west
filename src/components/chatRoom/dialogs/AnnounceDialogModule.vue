<template>
    <el-dialog title="公告栏" :visible.sync="announceDialogVisible" :width="dialogWidth" center :close-on-click-modal="false"
        :before-close="closeAnnounceDialog">
        <el-divider></el-divider>
        <h3 :style="{ 'font-size': fontSize }">2021年5月14日更新</h3>
        <h4 :style="{ 'font-size': fontSize }"><i class="el-icon-circle-plus"></i>增加变身牌机制：</h4>
        <p :style="{ 'font-size': fontSize }">●应对多牌时玩家可根据需要打出变身牌；</p>
        <p :style="{ 'font-size': fontSize }">●新建房间或修改房间设置时，房主可选择每副牌中的变身牌数量(0~10张)；</p>
        <p :style="{ 'font-size': fontSize }">●游戏战绩中新增关于变身牌的统计；</p>
        <P :style="{ 'font-size': fontSize }">●关于变身牌的具体规则和用法请参考右下角「帮助--游戏规则--变身牌」。</P>
        <div slot="footer">
            <el-button type="primary" @click="closeAnnounceDialog">关闭</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    props: {
        announceDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
        avatarSize: { type: Number, default: 20 },
        fontSize: { type: String, default: '' },
    },

    methods: {
        closeAnnounceDialog: function () {
            this.$emit('announceDialogVisible', false)
        }
    },
}
</script>