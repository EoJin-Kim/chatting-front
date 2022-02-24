import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:"",
    loginCheck:false,
    memberInfo:{},

  },
  mutations: {
    setToken:(state,payload) =>{
      state.token = payload;
    },
    setLoginCheck:(state,payload) =>{
      state.loginCheck = payload
    },
    setMemberInfo:(state,payload)=>{
      state.memberInfo = payload
    }
  },
  actions: {
    logoutAction: (context) => {
      context.commit('setToken',"");
    }
  },
  getters:{
    getToken: state =>{
      return state.token;
    },
    loginCheck: state =>{
      return state.loginCheck
    },
    getMemberInfo: state =>{
      return state.memberInfo
    }
  },
  modules: {
  },
  plugins: [createPersistedState({ paths: ["token","loginCheck","memberInfo"] })]
})
