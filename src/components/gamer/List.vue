<template>
  <div class="page has-navbar" v-nav="{title: '查看玩家', showBackButton: true}">
    <search cancelText="搜索" v-model="keywords" placeholder="推广用户昵称" :on-search="onSearch"
            :on-cancel="onSearch"></search>
    <float-btn></float-btn>

    <scroll class="page-content"
            :on-refresh="onRefresh"
            :on-infinite="onInfinite">
      <item v-for="(item, index) in list" :key="index" :class="{'item-stable': index % 2 == 0}">
        <ul class="my-item">
          <li><span>昵称：</span><span>{{item.name}}</span></li>
          <li><span>gameid：</span><span>{{item.code}}</span></li>
          <li><span>注册时间：</span><span>{{item.time}}</span></li>
        </ul>
      </item>

      <div v-if="infiniteCount ==0" slot="infinite" class="text-center">没有更多数据</div>
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
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      getList: function (done) {
        this.$ajax.doAjaxRequest(this.$api.getuserlist, {"nickname": this.keywords}, data => {
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
        this.$ajax.doAjaxRequest(this.$api.getuserlist,
          {
            "nickname": this.keywords,
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
