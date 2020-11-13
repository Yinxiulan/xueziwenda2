<template>
  <div>
    <mt-navbar v-model="active">
      <mt-tab-item id="1">新闻</mt-tab-item>
      <mt-tab-item id="2">新闻</mt-tab-item>
      <mt-tab-item id="3">新闻</mt-tab-item>
    </mt-navbar>
    <div class="main">
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="1">
          <p v-for="(v, k) of 100" :key="k">aaaa--{{ v }}</p>
        </mt-tab-container-item>
        <mt-tab-container-item id="2"> 222</mt-tab-container-item>
        <mt-tab-container-item id="3">333 </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="index"
        >首页
        <img src="" alt="" slot="icon" v-if="selected == 'index'" />
        <img src="" alt="" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="cart"
        >购物车
        <img src="" alt="" slot="icon" v-if="selected == 'cart'" />
        <img src="" alt="" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="me"
        >我的
        <img src="" alt="" slot="icon" v-if="selected == 'me'" />
        <img src="" alt="" slot="icon" v-else />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style scoped>
.main {
  margin-bottom: 60px;
}
</style>
<script>
export default {
  data() {
    return {
      active: "1",
      selected: "cart",
    };
  },
  watch:{
      selected(newValue){
          if(newValue=='index'){
              this.$router.push('/');
          }else if(newValue=='cart'){
this.router.push('cart');
          }else{
              this.$router.push('/me');
          }
      }
  }
};
</script>