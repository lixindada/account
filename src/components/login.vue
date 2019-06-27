<template>
    <div>
        <!-- title -->
        <van-nav-bar title="登陆" />
        <van-cell-group>
            <van-field
                v-model="username"
                required
                clearable
                label="用户名"
                right-icon="question-o"
                placeholder="请输入用户名"
                @click-right-icon="$toast('死胖子')"
            />

            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
            />
        </van-cell-group>
        <div class="login-btn">
            <van-button @click="login()" type="primary">登陆</van-button>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
    mounted () {
    }
})

export default class HelloWorld extends Vue {
    username:string = ''
    password:string = ''
    // 登陆
    login () :void {
        this.$api.login.signIn({
            uname: this.username,
            pwd: this.password
        }).then((xhr:any) => {
            console.log(xhr)
            if (xhr.data.status === 200) {
                localStorage.setItem('token', xhr.data.data.token)
                this.$router.push('/')
            }
        })
    }
    @Prop() private msg!: string;
}

</script>

<style lang="less">
    .login-btn{
        margin: 0.4rem auto;
        width: 2rem;
        button{
            width: 100%;
        }
    }
</style>
