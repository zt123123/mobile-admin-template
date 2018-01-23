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
          {{calculateTax}}
        </div>
      </hl-item>
      <hl-item class="item-icon-right">
        实得数额
        <div class="item-note">
          {{calculateRealCount}}
        </div>
      </hl-item>
      <hl-item class="item-icon-right">
        剩余财富
        <div class="item-note">
          {{calculateRestCount}}
        </div>
      </hl-item>

      <div class="padding">
        <md-button class="button button-assertive button-block" @click.native="cash('auto')">自动提现</md-button>
        <md-button class="button button-positive button-block" @click.native="cash('self')">手动提现</md-button>
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
        tax: 0,
        totalCount: 0
      }
    },
    computed: {
      calculateTax () {
        return this.count * (this.tax / 100);
      },
      calculateRealCount () {
        return this.count - this.calculateTax;
      },
      calculateRestCount () {
        return (this.totalCount - this.count).toFixed(2);
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
          this.tax = this.list.tax;
        });
      },

      checkCount(){
        if (this.count < 1) {
          $toast.show("提现数额不能小于1元");
          return false;
        } else if (this.count == "") {
          $toast.show("提现数额不能为空");
          return false;
        }
        return true;
      },

      cash (type) {
        let url = "";
        if (this.checkCount() == false) {
          return;
        }
        if (type == 'auto') {
          url = this.$api.withdrawals;
        } else {
          url = this.$api.manual_withdrawals;
        }
        this.$ajax.doAjaxRequest(url, {"money": this.count}, data => {

          setTimeout(function () {
            $toast.show(data.errordesc, 1500);
          }, 1000);
          setTimeout(function () {
            $router.forward("/fortune");
          }, 2000)
        });
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
        let popup = $popup.fromTemplate(`<input id="cashNum" placeholder="请输入数额" style="padding-left: 5px;border: 1px solid #d2d2d2;" type="text">`, options);

        popup.show().then((buttonIndex) => {
          if (buttonIndex == 0) {
            let dom = document.getElementById("cashNum");
            this.count = dom.value;
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
