<template>
  <div v-if="showBackBtn" @click="backTop" class="ion ion-ios-arrow-up back-top">
    <span>{{tip || "回到顶部"}}</span>
  </div>
</template>

<script>
  export default {
    name: 'float-btn',
    props: ['tip'],
    data () {
      return {
        scrollView: null,
        showBackBtn: false,
        docH: 0
      }
    },
    mounted(){

      this.docH = document.documentElement.offsetHeight;
      this.scrollView = document.getElementsByClassName("scroll")[0];
      this.scrollView.addEventListener("scroll", () => {
        if (this.scrollView.scrollTop >= (this.docH - 44)) {
          this.showBackBtn = true;
        } else {
          this.showBackBtn = false;
        }
      });
    },
    methods: {
      backTop(){
        let timer = null;
        clearInterval(timer);
        timer = setInterval(() => {
          let speed = this.scrollView.scrollTop / 15;
          if (this.scrollView.scrollTop === 0) {
            this.scrollView.scrollTop = 0;
            this.showBackBtn = false;
            clearInterval(timer);
            return;
          }
          this.scrollView.scrollTop -= speed;
        }, 20);

        this.$emit("backTop");
      }
    }
  }
</script>


<style scoped>
  .back-top {
    text-align: center;
    position: fixed;
    bottom: 100px;
    right: 20px;
    z-index: 99999;
    width: 55px;
    height: 55px;
    color: #fff;
    /*line-height: 50px;*/
    font-size: 30px;
    border-radius: 50%;
    background-color: rgba(74, 144, 266, 0.5);
  }

  .back-top span {
    position: absolute;
    left: 3px;
    top: 25px;
    font-size: 12px;
  }
</style>
