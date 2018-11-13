<template>
    <div class="login-container">
        <header class="login-head">
            <span>树下一只猫</span>
            <img class="logo" src="../assets/image/logo.png" alt="营火">
        </header>
        <section class="form">
            <span class="slogan">登登登登...录!
                <span>/ Login</span>
            </span>
            <input type="text" name="user" v-validate="'required'" id="user" placeholder="请输入用户名" v-model="LoginForm.user">
            <input type="password" name="password" v-validate="'required'" id="password" placeholder="请输入密码" @keyup.enter="login" v-model="LoginForm.password">
            <button id="login" @click="login">登录</button>
        </section>
        <footer>Always.</footer>
        <span>{{ errors.first('password')}}</span>
        <notifications group="user"></notifications>
    </div>
</template>

<script>
// 设置验证的提示消息
import { Validator } from 'vee-validate'
const dict = {
  custom: {
    user: {
      required: '用户名不能为空'
    },
    password: {
      required: () => '密码不能为空'
    }
  }
};

Validator.localize('en', dict);
// 引入发请求的模块
import request from '@/utils/request'
export default {
  name: "Login",
  data() {
    return{
      LoginForm:{
        user:'',
        password:''
      }
    }
  },
  methods:{
    login() {
      // 首先拿到验证成功失败的结果，如果成功了，在进行登录，如果失败了，则进行消息提示
      if (this.errors.items.length === 0) {
        request({
          url:'/login',
          method:'post',
          data:this.LoginForm
        }).then(res=>{
          console.log(res)

          // 如果用户名、密码不正确的话，要给出提示
          // 正确后，要先得到token值，将token存到cookie
          // 跳转到博客系统的首页
        }).catch(err=>{
          // 如果发请求的时候有错误，把错误扔到控制台里面去
          console.log(err)
        })
        
        console.log('验证成功')
      }else {
        // console.log('验证失败，给出错误提示')
        this.$notify({
          group:'user',
          title:'验证失败',
          text:'hello user'
        })

      }
    }
  },
  // 钩子函数，当组件加载完毕的时候自动执行
  // mounted() {
  //   request({
  //     url:'/index',
  //     method:"get"
  //   }).then((res)=>{
  //     console.log(res.data)
  //   })
  // },
};
</script>

<style type="text/scss" lang="scss" scoped>
  /*<!--记得引入全局变量的样式-->*/
  @import '../assets/style/_variable.scss';
  .login-container {
    height: 100%;
    @include flex($flow: column wrap);
    font-family: "KaiShu", "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    .login-head {
      @include flex;
      width: 100%;
      height: 3em;
      font-size: 2rem;
    }

    .form {
      @include flex($flow: column wrap);
      width: 400px;
      height: 250px;
      border-top: 20px solid $base;
      border-radius: 5px;
      // box-shadow: 4px 4px 5px -3px rgba(0, 0, 0, .3);
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
      .slogan {
        font-size: 1.6rem;
        margin-bottom: 1em;
        //color: $quote;
        span {
          color: $base;
        }
      }
      input {
        font: {
          size: 1rem;
          family: Dosis, Arial, sans-serif;
        }
        margin-bottom: 2em;
        width: 20em;
        height: 2.5em;
        outline-color: $base;
        border-radius: 3px;
        border: 1px solid #ccc;
      }
      button {
        color: $white;
        font: {
          size: 1.6rem;
          family: KaiShu, Arial, sans-serif;
        }
        width: 6em;
        height: 2em;
        border: none;
        background: $base;
        outline: none;
        cursor: pointer;
      }
    }

    footer {
      height: 4em;
      @include flex;
      justify-self: flex-end;
    }
  }
</style>