<template>
<div>



<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="col-sm-6">
    <ul class="navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" href="#">채팅 프로그램</a>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/about">About</router-link> 
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/chat/rooms">Chat</router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" to="/user">일반사용자</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/manager">매니저</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/admin">관리자</router-link>
    </li>
    
    
  </ul>
  </div>
  
  <div class="d-flex flex-row-reverse col-sm-5">
      <div class="form-inline">
        <div v-if="loginCheck">
          <p class=" mr-sm-2">{{getMemberInfo.name}}  </p>
          <button class="btn btn-danger" v-on:click="logout">로그아웃</button>
          
        </div>
        <div v-else>
          <input class="custom-form-control mr-sm-2" type="text" placeholder="ID" v-model="email">
          <input class="custom-form-control mr-sm-2" type="text" placeholder="PW" v-model="password">
          <button class="btn btn-danger" v-on:click="login">로그인</button>
        </div>
      </div>
    </div>
</nav>
    

    
</div>
    
</template>

<script>
import router from '@/router/index';
import {
  axiosLogin,
  getAxiosLoginMemberInfo,  
  } from '@/api/member'
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
import {mapActions} from 'vuex';
export default {
  computed:{
    ...mapGetters([
      'getToken',
      'loginCheck',
      'getMemberInfo'
    ]),
  },
  data(){
    return{
      email:"admin@admin.com",
      password:"admin",
      
      
    }
  },
  methods:{
    async login(){
      await axiosLogin(
        {
          email:this.email,
          password:this.password,
        },
        (res)=>{
          console.log(res);
          console.log(this);
          this.setLoginCheck(true);
          this.setToken(res.token)
          router.push("/about")
        },
        (err) => {
          console.log(err,"failed");
          this.setLoginCheck(false);
        }
      )
      // await axiosLogin(
      // {
      //   email:this.email,
      //   password:this.password,
      // })
      // .then(res=>{
      //   this.loginCheck=true;
      //   console.log(res)
      // })
      // .catch((err) => {
      //   console.log(err,"failed");
      // })
      console.log(this.loginCheck);
      if(this.loginCheck){
        getAxiosLoginMemberInfo(
          this.getToken,
          (res)=>{
            console.log(res);
            this.setMemberInfo(res)
          },
          (err) => {
            console.log(err,"failed");
            this.setLoginCheck(false);
          }
        )
      }
    },
    logout(){
      this.setLoginCheck(false);
      this.setToken("")
    },
    ...mapActions([
      'logoutAction',
    ]),
    ...mapMutations([
      'setToken',
      'setMemberInfo',
      'setLoginCheck',
      'setMemberInfo',
    ])

  }
}
</script>

<style scoped>
.custom-form-control  {
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
       -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}
li{
   list-style:none;
}
p{
  color: white;
  display: inline;
}
</style>