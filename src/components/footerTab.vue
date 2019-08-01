
<template>
    <div class="footer-tab box">
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" @click="()=>{this.$router.push('/')}">列表</van-tabbar-item>
            <van-tabbar-item icon="chart-trending-o" @click="()=>{this.$router.push('/summary')}">统计</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
})

export default class index extends Vue {
}

</script>

<style lang="less">

</style>
