<template>
    <el-image :class="avatarClass" :src="avatarUrl"></el-image>
</template>

<script>
export default {
    data() {
        return{

        }
    },

    props:{
        avatarClass: { type: String, default: ''},
        avatarUrl: { type: String, default: ''},
        gameInfo: { type: Object, default: null },
    },
}
</script>