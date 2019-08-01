
<template>
    <div class="index box">
        <!-- title -->
        <div class="screen">
            <van-row gutter="20">
                <van-col span="8">
                    <span @click="clickScreen(1)">{{params.create_time_begin ? params.create_time_begin : "请选择开始时间"}}</span>
                </van-col>
                <van-col span="8">
                    <span @click="clickScreen(2)">{{params.create_time_end ? params.create_time_end : "请选择结束时间"}}</span>
                </van-col>
            </van-row>
        </div>
        <van-tabs v-model="active" sticky @click="tabClick">
            <van-button round class="add-btn" type="danger" size="small" @click="onClickRight">添加</van-button>
            <van-tab title="账单列表">
                <van-cell-group v-for="(item,index) in accountList" :key="index" class="group">
                    <van-cell title="类型" :value="item.typeName" />
                    <van-cell title="金额" :value="item.money" />
                    <van-cell title="备注" :value="item.remark" />
                    <van-cell title="创建时间" :value="item.create_time" />
                </van-cell-group>
            </van-tab>
            <van-tab title="公费列表">
                <van-row gutter="20">
                    <van-col span="8">
                        <van-tag type="danger">总计月支出{{sumMoney}}
                    </van-tag></van-col>
                </van-row>
                <van-row gutter="10">
                    <van-col span="8" v-for="(item,i) in paping" :key="i">
                       <van-tag type="primary">({{item.real_name}})<br />月支出{{item.total_money}}元<br />月底结算{{ settlementMoney(item.total_money) }}元</van-tag>
                    </van-col>
                </van-row>
                <van-cell-group v-for="(item,index) in accountList" :key="index" class="group">
                    <van-cell title="姓名" :value="item.real_name" />
                    <van-cell title="金额" :value="item.money" />
                    <van-cell title="备注" :value="item.remark" />
                    <van-cell title="类型" :value="item.typeName" />
                    <van-cell title="创建时间" :value="item.create_time" />
                </van-cell-group>
            </van-tab>
        </van-tabs>
        <!-- 时间选择器 -->
        <van-popup
            v-model="show"
            position="bottom"
        >
            <van-datetime-picker
                @confirm="confirmTime"
                v-model="currentDate"
                type="datetime"
                :min-date="minDate"
                :max-date="maxDate"
            />
        </van-popup>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
})

export default class index extends Vue {
    minHour:number = 10
    maxHour:number = 20
    minDate:any = new Date(2019, 1, 1)
    maxDate:any = new Date(2019, 10, 1)
    currentDate:any = new Date()
    show:any = false
    accountList:any = []
    paping:any = []
    active:number = 0
    params:any = {}
    sumMoney:any = 0
    type:number = 0
    // 结算函数
    settlementMoney (money:any) :void{
        console.log(money)
        let mon:any = money - this.sumMoney / 4
        return mon.toFixed(2)
    }
    // 获取账单列表
    getAccount () :void{
        this.$api.account.query({
            ...this.params
        }).then((xhr:any) => {
            console.log(xhr)
            if (xhr.data.status === 200) {
                this.accountList = xhr.data.data
                if (this.params.is_public === 1) {
                    this.paping = xhr.data.paping
                    this.sumMoney = 0
                    this.paping.map((item:any) => {
                        this.sumMoney += item.total_money
                    })
                }
            }
        })
    }
    // 添加按钮
    onClickRight () :void{
        this.$router.push('/addAccount')
    }
    // 点击tab
    tabClick (name:any, title:any) :void{
        // console.log(name,title);
        if (name === 1) {
            this.params.type = 13
            this.params.is_public = 1
            this.getAccount()
        } else {
            this.params.type = 0
            this.params.is_public = 0
            this.getAccount()
        }
    }
    // 点击时间筛选
    clickScreen (e:any) {
        this.show = true
        this.type = e
    }
    confirmTime (e:any) {
        this.show = false
        let d = new Date(e)
        let datetime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        if (this.type === 1) {
            this.params.create_time_begin = datetime
        } else {
            this.params.create_time_end = datetime
        }
        this.getAccount()
    }
    mounted () {
        this.getAccount()
    }
}

</script>

<style lang="less">
.add-btn{
    position: fixed;
    right: 10px;
    bottom: 10px;
    z-index: 1;
}
.index{
    background: rgb(248,248,248);
}
.group{
    margin-bottom: 0.32rem;
}
.screen{
    span{
        font-size:0.28rem;
    }
}
</style>
