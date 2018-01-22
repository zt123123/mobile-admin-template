<template>
  <div class="page" v-nav="{title: '注册',showBackButton: true}">

    <div class="page-content padding-top">
      <von-input type="text" v-model="phone" placeholder="手机号"
                 label="用户名"></von-input>
      <von-input type="text" v-model="nickname" placeholder="昵称"
                 label="昵称"></von-input>
      <von-input type="text" maxlength="4" v-model="code" placeholder="短信验证码"
                 label="短信验证码"></von-input>
      <von-input type="password" v-model="password" placeholder="8-18位字母或数字密码"
                 label="密码"></von-input>

      <div class="padding">
        <button @click="login" class="button button-assertive button-block button-outline">注册</button>
      </div>
    </div>
  </div>
</template>
<script>
  import util from "../../util";
  import md5 from "blueimp-md5";
  export default{
    data() {
      return {
        optCheck: false,
        codeSrc: './static/img/code.gif',
        optCode: '',
        checkDataUrl: this.$api.checkdata,
        getWebCodeUrl: this.$api.getwebcode,
        getMobileCodeUrl: this.$api.getmobilecode,
        registerSbUrl: this.$api.registerss,
        timer: false,
        seconds: 60,
        phonePass: false,
        nickPass: false,
        codePass: false,
        pwdPass: false,
        phone: '',
        nickname: '',
        code: '',
        password: ''
      }
    },
    methods: {
      setPassword: function (password) {
        computedPass = false;
        this.password = password;
      },
      checkInput: function (type) {
        console.log(type);
      },
      getNick: function () {
        this.nickPass = true;
        this.nickname = imi.genChineseName();
      },

      //检查手机号是否注册过
      getCode: function () {
        if (this.phone === "" || util.checkPhone(this.phone) === false) {
          showToast("请输入有效的手机号");
          return false;
        } else {
          this.$ajax.doAjaxRequest(
            this.checkDataUrl,
            {
              "data": this.phone,
              "action": 0
            },
            this.checkPhoneCallback
          );
        }
      },

      //发送验证码
      checkPhoneCallback: function (data) {
        if (data.errorcode !== 0) {
          showToast(data.errordesc);
        } else {
          this.$ajax.doAjaxRequest(
            this.getMobileCodeUrl,
            {
              "mobile": this.phone,
            },
            this.sendCodeCallback,
            function () {
            },
            false
          );
        }
      },
      sendCodeCallback: function (data) {
        if (data.errorcode == 999999) {
          //操作频繁出现验证码对话框
          this.optCheck = true;
          this.changeCode();
          return false;
        }
        if (data.errorcode != 0) {
          showModal(data.errordesc);
          return false;
        }

        this.timer = true;
        this.timerCount();
      },

      //验证码倒计时
      timerCount: function () {
        let timer = null;
        timer = setInterval(() => {
          this.seconds--;
          if (this.seconds === 0) {
            this.timer = false;
            this.seconds = 60;
            clearInterval(timer);
          }
        }, 1000);
      },

      //操作频繁切换验证码
      changeCode: function () {
        this.$ajax.doAjaxRequest(
          this.getWebCodeUrl,
          {
            "mobile": this.phone
          },
          data => {
            this.codeSrc = data.imagebase64;
          }
        );
      },
      //关闭操作对话框
      closeDialog: function () {
        this.optCheck = false;
      },
      //提交输入的频繁操作码
      subCode: function () {

        if (this.optCode == "") {
          showToast("验证码不能为空");
          return false;
        } else {
          this.$ajax.doAjaxRequest(
            this.getMobileCodeUrl,
            {
              "mobile": this.phone,
              "webcode": this.optCode
            },
            data => {
              if (data.errorcode == 0) {
                this.optCheck = false;
                this.timer = true;
                this.timerCount();
              } else {
                showToast(data.errordesc);
              }
            }
          )
        }
      },
      checkForm: function () {

        // //校验手机号
        if (this.phone === "" || util.checkPhone(this.phone) === false) {
          util.showModal("错误", "手机号码不合法");
          return false;
        }

        // //校验昵称
        if (this.nickname === "") {
          util.showModal("错误", "昵称不能为空");
          return false;
        }
        // //校验短信验证码
        if (this.code === "") {
          util.showModal("错误", "短信验证码不能为空");
          return false;
        }
        // //校验密码
        if (this.password === "") {
          util.showModal("错误", "密码不能为空");
          return false;
        }
        if (!(this.password.length >= 8 && this.password.length <= 18)) {
          util.showModal("错误", "密码长度不对");
          return false;
        }

        return true;
      },


      login: function () {
        //校验输入
        if (this.checkForm() === false) return;

        //提交请求
        this.$ajax.doAjaxRequest(
          this.registerSbUrl,
          {
            "mobile": this.phone,
            "nickname": this.nickname,
            "mobilecode": this.code,
            "pwd": md5(this.password).toUpperCase()
          },
          this.doRegSuccess
        );
      },

      doRegSuccess: function (data) {
        if (data.errorcode != 0) {
          showModal(data.errordesc);
          return false;
        } else {
          util.showModal(data.errordesc, data.errordesc, () => {
            $router.forward("login");
          });
        }
      }
    }
  }
</script>
