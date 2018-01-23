<template>
  <div class="page has-navbar" v-nav="{title: '卖货', showBackButton: true}">
    <div style="margin-top: 44px;">
      <hl-item class="item-icon-right">
        库存房卡
        <div class="item-note">
          {{acer}}
        </div>
      </hl-item>
      <von-input type="text" v-model="nickname" placeholder="昵称或ID" label="昵称或ID"></von-input>
      <von-input type="text" v-model="cardnum" placeholder="房卡数量" label="房卡数量" style="margin-bottom: 5px;"></von-input>
      <div class="padding z-index">
        <button class="button button-positive button-block">确认</button>
      </div>
    </div>

    <div>
      <scroll class="page-content"
              :on-refresh="onRefresh">
        <item v-for="(item, index) in list" :key="index" @click.native="onItemClick(index)"
              :class="{'item-stable': index % 2 == 0}">
          <ul class="my-item">
            <li>
              <span>游戏ID：</span><span>{{item.code}}</span>
              <span id="channel" class="channel-type">{{item.channel == 0 ? '线下卖卡' : '群主Web充值'}}</span>
            </li>
            <li><span>房卡数量：</span><span>{{item.num}}</span></li>
            <li v-if="item.channel==1"><span>单卡价格：</span><span>{{item.price}}元</span></li>
            <li><span>卖货时间：</span><span>{{item.time}}</span></li>
          </ul>
        </item>

        <div v-if="infiniteCount >= 2" slot="infinite" class="text-center">没有更多数据</div>
      </scroll>
    </div>

  </div>

</template>
<script>
  export default {
    data () {
      return {
        nickname: "",
        cardnum: "",
        list: [],
        username: "",
        password: "",
        recordList: [],
        searchTip: false,
        flag: false,
        flag2: false,
        isDisable: false,
        searchList: [],
        acer: $storage.get("_ifo").acer || 0,
        code: "",
        num: "",
        selfPage: false,
        infiniteCount: 10
      }
    },

    mounted() {
      this.getList();
    },

    methods: {
      getList: function (done) {
        this.$ajax.doAjaxRequest(this.$api.sellerslist, {"pagesize": "15"}, data => {
          if (data.itemcount == 0 || data.itemcount <= this.$page) {
            this.infiniteCount = 0;
          }
          this.list = data.itemlist;
          done && done();
        });
      },
      onRefresh(done) {
        this.getList(done);
      },
      onItemClick(index){
        console.log(index);
      }
    }
  };

</script>
<style scoped>
  .page-content {
    top: 210px !important;
  }

  .my-item li {
    padding: 5px 0;
  }

  .z-index {
    background-color: #f5f5f5;
    position: relative;
    z-index: 11;
  }

  .button.button-block, .button.button-full {
    margin-bottom: 0;
  }
</style>
