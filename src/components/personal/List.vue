<template>
  <div class="page has-navbar" v-nav="{title: '推广员资料', showBackButton: true}">
    <div class="page-content">
      <!-- 华丽的分割线 -->
      <div class="my-divider">
        推广员资料
      </div>

      <hl-item class="item-icon-right">
        推广码
        <div class="item-note">
          {{list.code}}
        </div>
      </hl-item>
      <hl-item class="item-icon-right">
        合作码
        <div class="item-note">
          {{list.cooperativecode}}
        </div>
      </hl-item>

      <!-- 华丽的分割线 -->
      <div class="my-divider">
        合作推广员
      </div>

      <hl-item class="item-icon-right">
        服务商
        <div class="item-note">
          {{list.spname}}
        </div>
      </hl-item>
      <hl-item class="item-icon-right">
        合作分成
        <div class="item-note">
          {{list.dividedinto}}%
        </div>
      </hl-item>

      <hl-item class="item-icon-right">
        实际分成
        <div class="item-note">
          {{list.actualdividedinto}}%
        </div>
      </hl-item>

      <hl-item class="item-icon-right">
        工商税点
        <div class="item-note">
          {{list.tax}}%
        </div>
      </hl-item>
      <hl-item @click.native="$router.forward('/clause')" class="item-icon-right">
        推广合同
        <div class="item-note">
          <span class="auto-pay">使用本分成协议进行返现</span>
        </div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>

      <!-- 华丽的分割线 -->

      <div class="my-divider">实名信息</div>

      <hl-item @click.native="update('姓名')" class="item-icon-right">
        姓名
        <div class="item-note">{{list.cardname}}</div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>

      <hl-item @click.native="update('身份证')" class="item-icon-right">
        身份证
        <div class="item-note">{{list.cardid}}</div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>

      <hl-item @click.native="update('联系电话')" class="item-icon-right">
        联系电话
        <div class="item-note">{{list.phone}}</div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>

      <hl-item @click.native="update('联系地址')" class="item-icon-right">
        联系地址
        <div class="item-note">{{list.address}}</div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>


      <!-- 华丽的分割线 -->
      <div class="my-divider">
        账户信息-微信<span class="auto-pay">(仅限手动打款使用)</span>
      </div>
      <hl-item @click.native="update('微信账号')" class="item-icon-right">
        微信账号
        <div class="item-note">
          {{list.wxid}}
        </div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>
      <hl-item @click.native="update('微信收款人')" class="item-icon-right">
        收款人姓名
        <div class="item-note">
          {{list.wxname}}
        </div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>

      <!-- 华丽的分割线 -->
      <div class="my-divider">
        账户信息-支付宝<span class="auto-pay">(仅限手动打款使用)</span>
      </div>
      <hl-item @click.native="update('支付宝账号')" class="item-icon-right">
        支付宝账号
        <div class="item-note">
          {{list.zfbid}}
        </div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>
      <hl-item @click.native="update('支付宝收款人')" class="item-icon-right">
        收款人姓名
        <div class="item-note">
          {{list.zfbname}}
        </div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>

      <div style="height: 10px"></div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        list: {},
        id: 0
      }
    },
    mounted(){

      this.getInfo();
    },
    methods: {
      getInfo(){
        this.$ajax.doAjaxRequest(this.$api.getssinfo, {}, data => {
          this.list = data.itemlist;
          this.id = this.list.id;
        }, null, false)
      },
      update(type){
        let field = encodeURIComponent(type);
        let id = encodeURIComponent(this.id);

        $router.forward({path: 'update', query: {field: field, id: id}})
      }
    },

  }
</script>

<style scoped>
  .my-divider {
    padding: 10px;
  }

  .auto-pay {
    color: red;
  }
</style>
