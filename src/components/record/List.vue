<template>
  <div class="page has-navbar" v-nav="{title: '卖货记录', showBackButton: true}">
    <float-btn></float-btn>
    <scroll class="page-content"
            :on-refresh="onRefresh"
            :on-infinite="onInfinite">
      <item v-for="(item, index) in list" :key="index"
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

      <div v-if="infiniteCount == 0" slot="infinite" class="text-center">没有更多数据</div>
    </scroll>
  </div>

</template>

<style scoped>
  .my-item li {
    padding: 5px 0;
  }
</style>

<script>
  export default {
    data () {
      return {
        list: [],
        items: [],
        infiniteCount: 10,
        page: 1
      }
    },

    mounted() {

      this.getList();

    },

    methods: {
      getList: function (done) {
        this.$ajax.doAjaxRequest(this.$api.sellerslist, {}, data => {
          this.list = data.itemlist;
          done && done();
        }, null);
      },

      onRefresh(done) {
        this.getList(done);
      },

      onInfinite(done) {
        this.$ajax.doAjaxRequest(this.$api.sellerslist,
          {
            "page": ++this.page
          },
          data => {
            if (data.itemcount == 0) {
              this.infiniteCount = 0;
              return;
            }
            let res = data.itemlist;
            for (let i in res) {
              this.list.push(res[i]);
            }

            this.infiniteCount++;
            done();
          });
      }
    }

  }
</script>
