<template>
  <div class="page has-navbar" v-nav="{title: '分成列表', showBackButton: true}">

    <float-btn></float-btn>

    <search v-model="keywords" cancelText="搜索" placeholder="玩家ID" :on-search="onSearch" :on-cancel="onSearch"></search>

    <scroll class="page-content"
            :on-refresh="onRefresh"
            :on-infinite="onInfinite">
      <item v-for="(item, index) in list" :key="index" :class="{'item-stable': index % 2 == 0}">
        <ul class="my-item">
          <li>
            <span>昵称：</span><span>{{item.name}}</span>
            <span id="channel" class="channel-type">{{item.channel == 0 ? 'App充值' : '群主Web充值'}}</span>
          </li>
          <li><span>gameid：</span><span>{{item.code}}</span></li>
          <li><span>充值类型：</span><span>{{item.type}}</span></li>
          <li><span>充值金额：</span><span>{{item.money}}元</span></li>
          <li><span>充值时间：</span><span>{{item.date}}</span></li>
          <li><span>我的分成：</span><span>{{item.ssmoney}}元</span></li>
        </ul>
      </item>


      <div v-if="infiniteCount == 0" slot="infinite" class="text-center">没有更多数据</div>
    </scroll>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        list: [],
        keywords: '',
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
        this.$ajax.doAjaxRequest(this.$api.getdividedinto, {"usersearch": this.keywords}, data => {
          if (data.itemcount == 0 || data.itemcount <= this.$page) {
            this.infiniteCount = 0;
          }
          this.list = data.itemlist;
          done && done();
        });
      },

      onSearch() {
        this.page = 1;
        this.getList();
      },

      onRefresh(done) {
        this.page = 1;
        this.keywords = "";
        this.getList(done);

      },

      onInfinite(done) {
        this.$ajax.doAjaxRequest(this.$api.getdividedinto,
          {
            "usersearch": this.keywords,
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

<style scoped>
  .bar {
    margin-top: 44px;
  }

  .scroll {
    margin-top: 44px;
  }

  .my-item li {
    padding: 5px 0;
  }


</style>
