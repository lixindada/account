
<template>
    <div class="add-account box">
        <!-- title -->
        <van-nav-bar title="添加记录" left-arrow @click-left="onClickLeft" />
        <van-field
            v-model="money"
            required
            clearable
            label="金额"
            placeholder="金额"
        />
        <van-field
            v-model="remark"
            clearable
            label="备注"
            placeholder="备注"
        />
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="typeList"
                @cancel="showPicker = false"
                @confirm="onConfirm"
            />
        </van-popup>
        <van-field
            readonly
            clickable
            label="类型"
            :value="typeName"
            placeholder="选择类型"
            @click="showPicker = true"
        />

        <div class="btn">
            <van-button @click="addAccount()" type="primary">添加</van-button>
        </div>

    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
})

export default class addAccount extends Vue {
    accountList:any = []
    typeList:any = []
    typeLists:any = []
    money:string = ''
    remark:string = ''
    typeName:string = ''
    typeId:number = 1
    showPicker:boolean = false
    // 获取类型列表
    getType () :void{
        this.$api.type.query().then((xhr:any) => {
            console.log(xhr)
            if (xhr.data.status === 200) {
                this.typeLists = xhr.data.data
                xhr.data.data.map((item:any) => {
                    this.typeList.push(
                        item.typeName
                    )
                })
            }
        })
    }
    // 添加账单
    addAccount () :void{
        this.$api.account.add({
            type: this.typeId,
            remark: this.remark,
            money: this.money
        }).then((xhr:any) => {
            console.log(xhr)
            if (xhr.data.status === 200) {
                this.$toast.success('添加成功')
                this.$router.push('/')
            }
        })
    }
    // 确定按钮
    onConfirm (e:any) :void{
        console.log(e)
        this.typeName = e
        this.typeLists.map((item:any) => {
            if (item.typeName === e) {
                this.typeId = item.id
            }
        })
        this.showPicker = false
    }
    onClickLeft () :void{
        this.$router.push('/')
    }
    mounted () {
        this.getType()
    }
}

</script>

<style lang="less">
.btn{
    margin: 0.4rem auto;
    width: 2rem;
    button{
        width: 100%;
    }
}
</style>
