<template>
  <div class="page" v-nav="{title: '登录'}">
    <div class="page-content padding-top">
      <von-input type="text" v-model="username" placeholder="用户名" label="用户名"></von-input>
      <von-input @keyup.enter.native="login" type="password" v-model="password" placeholder="密码" label="密码"
                 style="margin-bottom: 5px;"></von-input>

      <div class="padding">
        <button class="button button-positive button-block" @click="login">登录</button>
        <button @click="toRegPage" class="button button-assertive button-block button-outline">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
  import md5 from "blueimp-md5";
  export default{
    data() {
      return {
        username: '',
        password: '',
        error: {
          name: "用户名不能为空",
          password: "密码不能为空"
        }
      }
    },
    methods: {
      login(){
        if (this.checkForm() == false) {
          return;
        }

        let md5Pass = (md5(this.password)).toUpperCase();

        this.$ajax.doAjaxRequest(
          this.$api.login,
          {username: this.username, pwd: md5Pass},
          data => {
            $storage.set("token", data.access_token);
            $router.forward("/");
          }
        );
      },

      checkForm(){

        if (this.username == "") {
          $toast.show(this.error.name, 1000);
          return false;
        }
        if (this.password == "") {
          $toast.show(this.error.password, 1000);
          return false;
        }

        return true;
      },
      toRegPage(){
        $router.forward("/register");
      }
    }
  }
</script>
