import Axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import {MessageBox} from 'mint-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
isLogined:localStorage.getItem('isLogined') || 0,
userInfo:JSON.parse(localStorage.getItem('userInfo'))||{},
username:'Tom',
age:23,
sex:true,

  },
  mutations: {
    login_mutations(state,payload){
      state.isLogined=1;
      state.userInfo=payload;
    },
    logout_mutations(state){
      state.isLogined=0;
      state.userInfo={};
    }
  },
  actions: {
    login_actions(context,payload){
      //console.log('发送请求，实现用户的登录操作');
      axios.post('/login',payload).then(res=>{
        if(res.data.code == 1){
          context.commit('login_mutations',res.data.userInfo);
          localStorage.setItem('isLogined',1);
          localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo));
          router.push('/');
        }else{
          MessageBox('登录提示','用户名或密码错误')
        }
         
        
      });
    }
  },
  modules: {
  }
})
