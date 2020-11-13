<template>
  <div>
    <mt-header title="学前端，到学问">
      <div slot="right" class="shortcut" v-if="this.$store.state.isLogined==1">
      <span>您好，{{this.$store.state.userInfo.username}}</span>
      
      <mt-button @click="logout">注销</mt-button></div>
      <div slot="right" class="shortcut" v-else>
        <router-link to="/register">注册</router-link>
        <router-link to="/login">登录</router-link>
      </div>


    </mt-header>

    <mt-navbar v-model="active">
      <mt-tab-item
        v-for="(item, index) of category"
        :key="index"
        :id="item.id.toString()"
      >
        {{ item.category_name }}
      </mt-tab-item>
    </mt-navbar>

    <div
      class="main"
      infinite-scroll-distance="20"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      :infinite-scroll-immediate-check="true"
    >
      <mt-tab-container>
        <mt-tab-container-item>
          <div
            class="articleItem"
            v-for="(article, index) of articles"
            :key="index"
          >
            <router-link :to="`/article/${article.id}`">
              <div class="articleItem-header">
                {{ article.subject }}{{ article.id }}
              </div>

              <div class="articleItem-wrapper">
                <div class="articleImg" v-if="article.image != null">
                  <img v-lazy="article.image" />
                </div>

                <div class="articleDes">
                  {{ article.description }}
                </div>
                <!-- 文章简介结束 -->
              </div>
              <!-- 文章图文信息结束 -->
            </router-link>
          </div>
          <!-- 单一文章信息结束 -->
        </mt-tab-container-item>
        <!-- <mt-tab-container-item id="2">2</mt-tab-container-item> -->
        <!-- <mt-tab-container-item id="3">3</mt-tab-container-item> -->
        <!-- <mt-tab-container-item id="4">4</mt-tab-container-item> -->
      </mt-tab-container>
    </div>
    <mt-tabbar v-model="selectedTab" fixed>
      <mt-tab-item id="index">
        首页
        <img src="" alt="" slot="icon" v-if="selectedTab == 'index'" />
        <img src="" alt="" slot="icon" v-else />
      </mt-tab-item>
      <mt-tab-item id="me"
        >我的
        <img src="" alt="" slot="icon" v-if="selectedTab == 'me'" />
        <img src="" alt="" slot="icon" v-else />
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<style scoped>
.shortcut a {
  color: #fff;
  padding-left: 20px;
}
.main {
  margin-bottom: 55px;
}
.articleItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
}
.articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.articleImg {
  margin-right: 15px;
}
.articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
</style>
<script>
export default {
  data() {
    return {
      active: "1",
      selectedTab: "index",
      category: [],
      articles: [],
      busy: false,
      page: 1,
    };
  },
  methods: {
    logout(){
this.$store.commit('logout_mutations');
localStorage.clear();
    },
    loadData(cid, page) {
      this.$indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle",
      });
      this.busy = true;
      this.axios.get("/articles?cid=" + cid + "&page=" + page).then((res) => {
        let data = res.data.results;
         this.pagecount = res.data.pagecount;
        data.forEach((item) => {
          if (item.image != null) {
            item.image = require("../assets/images/articles/" + item.image);
          }
          this.articles.push(item);
        });
        this.$indicator.close();
        this.busy = false;
      });
    },
    loadMore() {
      // this.$indicator.open("加载中...");
      //this.busy = true;
      this.page++;
      if (this.page <= this.pagecount) {
        this.loadData(this.active, this.page);
      }
      // this.axios
      //.get("/articles?cid=" + this.active + "&page=" + this.page)
      // .then(res => {
      //   console.log(this.page);
      //  this.$indicator.close();
      //   this.busy = false;
      //let data = res.data.results;
    },
  },

  watch: {
    active(value) {
      this.articles = [];
      this.page = 1;
      this.loadData(this.active, this.page);
      //this.axios.get("/article?cid=" + value + "&page=1").then((res) => {
      //let data = res.data.results;
      // this.articles=res.data.results;
      // data.forEach((item) => {
      // if (item.image != null) {
      //   item.image = require("../assets/images/articles/" + item.image);
      //  }
      //  this.articles.push(item);
      // });
      // });
    },
  },
  mounted() {
    this.axios.get("/category").then((res) => {
      this.category = res.data.results;
    });
    this.loadData(this.active, this.page);
    //this.axios.get("/article?cid=" + this.active + "&page=1").then((res) => {
    // let data = res.data.results;
    // data.forEach((item) => {
    //   if (item.image != null) {
    //    item.image = require("../assets/images/articles/" + item.image);
    //  }
    //  this.articles.push(item);
    // });

    // this.articles=res.data.results;
    //});
  },
};
</script>
