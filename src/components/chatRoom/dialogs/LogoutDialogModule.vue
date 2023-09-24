<template>
    <el-dialog title="提示" :visible.sync="cancelLeaveDialogVisible" :width="dialogWidth" center
        :before-close="closeLeaveDialog">
        <i class="el-icon-question"></i>
        <span style="text-align:center">确定要登出并离开游戏大厅吗？</span>
        <span slot="footer">
            <el-button @click="closeLeaveDialog" style="margin-right:10%">取消</el-button>
            <el-button type="danger" @click="logOut">确定</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts">
import { removeToken } from '@/utils/cookie'
import { logout } from '@/api/login'

export default {
    data() {
        return {

        }
    },

    props: {
        cancelLeaveDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
    },

    methods: {
        closeLeaveDialog: function () {
            this.$emit('cancelLeaveDialogVisible', false)
        },

        logOut: function () {
            this.$message({ message: '已登出，回到登录页面', type: 'info' });
            logout().finally(() => { removeToken() });
            this.$router.push({ name: 'Login' })
            this.closeLeaveDialog()
        },
    }
}
</script>