<template>
  <div class="page has-navbar" v-nav="{title: '申请提现', showBackButton: true}">
    <div class="page-content" style="padding-top: 54px;">
      <!-- 华丽的分割线 -->
      <hl-item class="item-icon-right">
        可提现财富
        <div class="item-note">
          {{totalCount}}
        </div>
      </hl-item>
      <hl-item @click.native="enterNum" class="item-icon-right">
        提现数额
        <div class="item-note">
          {{count}}
        </div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>
      <hl-item class="item-icon-right">
        税款
        <div class="item-note">
          {{tax}}
        </div>
      </hl-item>
      <hl-item class="item-icon-right">
        实得数额
        <div class="item-note">
          {{getCount}}
        </div>
      </hl-item>
      <hl-item class="item-icon-right">
        剩余财富
        <div class="item-note">
          {{restCount}}
        </div>
      </hl-item>

      <div class="padding">
        <md-button class="button button-assertive button-block" @click.native="onButtonClicked()">自动提现</md-button>
        <md-button class="button button-positive button-block">手动提现</md-button>
      </div>

      <div style="height: 100px"></div>
    </div>
  </div>
</template>

<script>
  let count = 10 || 0;
  export default{
    data(){
      return {
        list: {},
        count: 0,
        totalCount: 0,
        tax: 0,
        getCount: "0",
        restCount: "0",
        min: 0,
        max: 10000,
        num: 0
      }
    },
    mounted() {
      this.getCashInfo();
    },
    methods: {
      getCashInfo(){
        this.$ajax.doAjaxRequest(this.$api.askcash, {}, data => {
          this.list = data;
          //初始化
          this.totalCount = this.list.totalamount;
          this.getCount = this.calculateRealCount();
          this.tax = this.calculateTax();
          this.restCount = this.calculateRestCount();

        }, null, false);
      },
      calculateTax: function () {
        return count * (this.list.tax / 100);
      },
      calculateRealCount: function () {
        return count - this.calculateTax();
      },
      calculateRestCount: function () {
        return (this.totalCount - count).toFixed(2);
      },
      enterNum(){

        let options = {
          effect: 'scale',
          title: '请输入数额',
          buttons: [
            {text: '确定'},
            {text: '取消'},
          ]
        };
//      <von-input
//        type="text"
//        v-model="username"
//        placeholder="用户名/手机/邮箱"
//        label="用户名">
//          </von-input>
        let popup = $popup.fromTemplate(`<input placeholder="请输入数额" style="padding-left: 5px;border: 1px solid #d2d2d2;" type="text">`, options);

        popup.show().then((buttonIndex) => {
          if(buttonIndex==0){
            console.log();
          }
        })
      }
    }
  }
</script>

<style scoped>
  .bar {
    margin-top: 44px;
  }

  .input {
    background-color: #f00 !important;
    border: 1px solid #000 !important;
  }
</style>
