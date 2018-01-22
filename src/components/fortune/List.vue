<template>
  <div class="page has-navbar" v-nav="{title: '财富总览', showBackButton: true}">
    <float-btn></float-btn>
    <div class="page-content" style="padding-top: 54px;">
      <!-- 华丽的分割线 -->
      <hl-item class="item-icon-right">
        总财富
        <div class="item-note">
          {{fortunelist.totalamount}}
        </div>
      </hl-item>
      <hl-item class="item-icon-right">
        已提现
        <div class="item-note">
          {{fortunelist.cashamount}}
        </div>
      </hl-item>
      <hl-item class="item-icon-right">
        未提现
        <div class="item-note">
          {{fortunelist.notamount}}
        </div>
        <span class="icon ion-ios-arrow-right"></span>
      </hl-item>
      <hl-item class="item-icon-right">
        工商纳税
        <div class="item-note">
          {{fortunelist.tax}}
        </div>
      </hl-item>

      <scroll class="page-content"
              :on-refresh="onRefresh"
              :on-infinite="onInfinite">
        <item v-for="(item, index) in cashlist" :key="index" :class="{'item-stable': index % 2 == 0}">
          <ul class="my-item">
            <li><span>提现数额：</span><span>{{item.cash}}</span></li>
            <li><span>工商纳税：</span><span>{{item.tax}}</span></li>
            <li><span>实得数额：</span><span>{{item.money}}</span></li>
            <li><span>提现方式：</span><span>{{item.type == 0 ? '自动提现' : '手动提现'}}</span></li>
            <li><span>提现时间：</span><span>{{item.time}}</span></li>
            <li><span>状态：</span>
              <span :class="classMap[item.state]" v-if="item.state==0">处理中</span>
              <span :class="classMap[item.state]" v-if="item.state==1">成功</span>
              <span :class="classMap[item.state]" v-if="item.state>1">失败</span>
            </li>
            <li v-if="item.state>1"><span>失败原因：{{item.desc}}</span></li>
          </ul>
        </item>

        <div v-if="infiniteCount == 0" slot="infinite" class="text-center">没有更多数据</div>
      </scroll>

      <div style="height: 100px"></div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        keywords: '',
        infiniteCount: 10,
        fortunelist: [],
        cashlist: [],
        page: 1,
        classMap: [],
      }
    },
    created: function () {
      this.classMap = ["state-process", "state-success", "state-fail"];
    },
    mounted() {
      this.getFortuneInfo();
      this.getCashList();
    },
    methods: {
      getFortuneInfo: function () {
        this.$ajax.doAjaxRequest(this.$api.fortune, {}, data => {
          this.fortunelist = data.item;
        }, null, false);
      },

      getCashList: function () {
        this.$ajax.doAjaxRequest(this.$api.withdrawalslist, {}, data => {
          if (data.itemcount == 0) {
            this.infiniteCount = 0;
          }

          this.infiniteCount = data.itemcount;
          this.cashlist = data.itemlist;
        });
      },

      onRefresh(done) {
        this.page = 1;
        this.$ajax.doAjaxRequest(this.$api.withdrawalslist, {}, data => {
          this.cashlist = data.itemlist;
          done();
        });
      },

      onInfinite(done) {
        this.$ajax.doAjaxRequest(this.$api.withdrawalslist,
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
              this.cashlist.push(res[i]);
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
    margin-top: 210px;
  }

  .my-item li {
    padding: 5px 0;
  }

  .my-item li span {
    white-space: normal;
  }

  .my-item .state-fail {
    color: #f00;
  }

  .my-item .state-success {
    color: #0f0;
  }

  .my-item .state-process {
    color: #00f;
  }
</style>
