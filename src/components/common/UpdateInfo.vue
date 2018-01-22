<template>
  <div class="page">
    <div class="page-content padding-top">
      <von-input type="text" v-model="info" :placeholder="placeholder" :label="label"></von-input>
      <div class="padding">
        <button @click="updateInfo" class="button button-assertive button-block button-outline">确认修改
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'updateInfo',
    data () {
      return {
        info: "",
        msg: '111111',
        title: "",
        placeholder: "",
        label: "",
        id: 0,
        field: "",
        infoMap: {
          "姓名": "cardname",
          "身份证": "cardid",
          "联系电话": "phone",
          "联系地址": "address",
          "微信账号": "wxid",
          "微信收款人": "wxname",
          "支付宝账号": "zfbid",
          "支付宝收款人": "zfbname",
        },
      }
    },
    mounted(){
      this.setInfo();
    },
    methods: {
      setInfo(){
        let queryObj = ($router.history.current.query);

        this.field = decodeURIComponent(queryObj.field);
        this.id = decodeURIComponent(queryObj.id);

        $app.setTitle(this.field);
        this.placeholder = this.field;
        this.label = this.field;

      },
      updateInfo(){

        let ajaxData = {
          "id": this.id,
          [this.infoMap[this.field]]: this.info
        };

        this.$ajax.doAjaxRequest(this.$api.setssassets, ajaxData, data => {
          setTimeout(() => {
            $toast.show(data.errordesc, 1000);
          }, 500)
        })
      }
    }
  }
</script>


<style scoped>

</style>
