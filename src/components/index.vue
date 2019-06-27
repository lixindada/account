
<template>
    <div class="index box">
        <!-- title -->
        <van-nav-bar title="账单列表" right-text="添加" @click-right="onClickRight" />
        <van-cell-group v-for="(item,index) in accountList" :key="index" class="group">
            <van-cell title="类型" :value="item.type" />
            <van-cell title="金额" :value="item.money" />
            <van-cell title="备注" :value="item.remark" />
        </van-cell-group>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
})

export default class index extends Vue {
    accountList:any = []
    // 获取账单列表
    getAccount () :void{
        this.$api.account.query().then((xhr:any) => {
            console.log(xhr)
            if (xhr.data.status === 200) {
                this.accountList = xhr.data.data
            }
        })
    }
    // 添加按钮
    onClickRight () :void{
        this.$router.push('/addAccount')
    }
    mounted () {
        this.getAccount()
    }
}

</script>

<style lang="less">
.index{
    background: rgb(248,248,248);
}
.group{
    margin-bottom: 0.32rem;
}
</style>
