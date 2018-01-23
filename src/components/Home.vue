<template>
  <div class="page has-navbar" v-nav="{hideNavbar: true}">
    <div class="page-content">
      <von-header theme="positive">
        <button class="button button-icon ion-ios-information-outline" slot="right" @click="showDivide"></button>
        <span slot="title">推广员系统</span>
        <button class="button button-icon ion-navicon" @click="toggleSidebar" slot="left"></button>
      </von-header>
      <cells :items="entrances" :on-cell-click="onCellClick" row="3"></cells>
      <div class="footer"></div>
    </div>
  </div>
</template>
<style lang="scss">
  .entrance {
    height: 120px;
    padding: 35px 0;

    .icon {
      font-size: 30px;
      line-height: 30px;
      width: 30px;
      height: 30px;
      margin-bottom: 6px;
    }

    span {
      font-size: 14px;
      line-height: 14px;
    }

  }

  .avatar {
    margin-bottom: 10px;
    overflow: hidden;
    img {
      float: left;
      width: 50px;
      border-radius: 50%;
      border: 2px solid #fff;
    }
    .info {
      margin-left: 10px;
      float: left;
      .username {
        color: #4a90e2;
        font-size: 18px;
        line-height: 28px;
      }
      .card-num {
        color: #cc6e6e;
        font-size: 12px;
      }
    }
  }

  .navbar {
    border-color: #2275d7;
    background-color: #4a90e2;
    color: #fff;
  }

  .button {
    color: #fff;
  }

  .button:hover {
    color: #fff;
    text-decoration: none;
  }

  .bar .title {
    color: #fff;
  }

  .footer {
    height: 40px;
  }

  .sys-info {
    width: 100%;
    height: 20px;
    position: absolute;
    left: 0;
    bottom: -30px;
    color: #989da2;
  }
</style>
<script>

  let localObj = JSON.parse(localStorage.getItem("_ifo")) || {};
  let gameid = localObj.gameid || "";

  document.addEventListener("DOMContentLoaded", function () {

    //加密gameid
    function encryptGameId(url) {
      let gameid = localStorage.getItem("gameid") || "";

      $vue.$ajax.doAjaxRequest(
        "http://wx.imi78.com/get_game_id_encrypt",
        {
          "gameid": gameid
        },
        data => {
          window.location.href = url + (data.gameid);
        });
    }

    function getSellCardConfig() {
      $vue.$ajax.doAjaxRequest(
        $vue.$api.get_sell_card_config,
        {
          "gameid": gameid
        },
        data => {
          console.log(data);
        });
    }

    function sharePlayer() {
      window.location.href = "http://wx.imi78.com/wx_game_register?gameid=" + gameid + "&from=0";
    }

    function shareSale() {
      encryptGameId("http://wx.imi78.com/pay/agent?gameid=");
    }

    function saleSetting() {
      getSellCardConfig();
    }

    function makeMaterial() {
      encryptGameId("http://wx.imi78.com/spread_get_materiel?gameid=");
    }

    function exit() {
      $storage.clear();
      $router.forward("/login");
    }

    window.eventPool = {
      sharePlayer,
      shareSale,
      saleSetting,
      makeMaterial,
      exit
    };
  });

  import axios from 'axios';

  export default {
    data() {
      return {
        //userinfo
        acer: null,
        acerdividedtnto: null,
        gameid: null,
        memberdividedtnto: null,
        privateticketdividedtnto: null,
        username: null,
        userright: null,

        sidebar: undefined,
        sidebarRight: undefined,
        entrances: [
          '<div class="entrance assertive"><i class="icon ion-document-text"></i><br><span>合作条款</span></div>',
          '<div class="entrance positive"><i class="icon ion-person"></i><br><span>个人资料</span></div>',
          '<div class="entrance balanced"><i class="icon ion-android-contacts"></i><br><span>查看玩家</span></div>',
          '<div class="entrance calm"><i class="icon ion-calculator"></i><br><span>分成列表</span></div>',
          '<div class="entrance energized"><i class="icon ion-social-usd"></i><br><span>财富总览</span></div>',
          '<div class="entrance assertive"><i class="icon ion-card"></i><br><span>申请提现</span></div>',
          '<div class="entrance positive"><i class="icon ion-ios-cart"></i><br><span>卖货</span></div>',
          '<div class="entrance assertive"><i class="icon ion-ios-time"></i><br><span>卖货记录</span></div>',
          '<div class="entrance positive"><i class="icon ion-android-exit"></i><br><span>退出系统</span></div>'
        ],
        routes: {
          0: "/home",
          1: "/personal",
          2: "/gamer",
          3: "/divide",
          4: "/fortune",
          5: "/cash",
          6: "/sale",
          7: "/record",
          8: "/login"
        }
      }
    },
    created(){
//      axios.post('/api/getuser')
//        .then(function (response) {
//          console.log(response.data);
//        })
//        .catch(function (error) {
//          console.log(error);
//        });

      window.$vue = this;
      this.getUserInfo();
    },
    mounted() {
    },

    destroyed() {
      $sidebar.destroy()
    },

    methods: {
      getUserInfo(){
        this.$ajax.doAjaxRequest(this.$api.getuser, {}, data => {
          this.renderTemplate(data.username, data.acer);
          setTimeout(() => {
            this.showWelcome(data);
          }, 500);
        });
      },
      showWelcome(data){

        if ($storage.get("_ifo")) {
          return;
        }
        $toast.show(`欢迎回来，${data.username}`, 1000);

        let storeInfo = ({
          "welcomeTip": true,
          "acer": data.acer,
          "gameid": data.gameid
        });

        $storage.set("_ifo", storeInfo);
      },

      renderTemplate(username = "", acer = 0){
        let template = `
        <div id="sidebar">
          <div class="avatar">
            <img src="http://m.imi78.com/img/ddz_icon100.png" alt="" />
            <div class="info">
              <div class="username">${username}</div>
              <div class="card-num">库存房卡:${acer}</div>
            </div>
          </div>
          <item onclick='eventPool.sharePlayer()' class="item-icon-left">
            分享玩家
            <i class="assertive icon ion-android-share-alt"></i>
          </item>
          <item onclick='eventPool.shareSale()' class="item-icon-left">
            分享卖卡
            <i class="positive icon ion-ios-cart"></i>
          </item>
          <item onclick='eventPool.saleSetting()' class="item-icon-left">
            卖卡配置
            <i class="balanced icon ion-settings"></i>
          </item>
          <item onclick='eventPool.makeMaterial()' class="item-icon-left">
            物料制作
            <i class="energized icon ion-android-person-add"></i>
          </item>
          <item onclick='eventPool.exit()' class="item-icon-left">
            退出系统
            <i class="calm icon ion-android-exit"></i>
          </item>
          <div class="sys-info">
            推广员系统 V2.0
          </div>
        </div>
      `;

        this.sidebar = $sidebar.fromTemplate(template, {position: 'left'})
      },
      showAlert(){
        alert(111);
      },
      onCellClick(cellIndex) {
        if (cellIndex === 0) {
          $dialog.alert({
            theme: 'ios',
            title: '条款规则',
            content: '一米棋牌与客户本着公平公正原则，以实现双方共同获利进行合作。双方运用各自的资源进行整合，共同合作。',
            okText: '好'
          }).then(() => {
            console.log('alert hide.')
          });
          return false;
        }
        if (cellIndex === 8) {
          $storage.clear();
          $router.forward("/login");
          return false;
        }
        $router.forward(this.routes[cellIndex])
      },
      toggleSidebar() {
        this.sidebar.toggle();
      },
      showDivide(theme){
        $actionSheet.show({
          theme: theme || '',
          title: '标题',
          buttons: {
            '操作一': () => {
              $toast.show("你点击了操作一", 1000);
            },

            '操作二': () => {
              $toast.show("你点击了操作二", 1000);
            }
          }
        })
      }
    }
  }
</script>
