<template>
  <div class="row">
    
    <div class="col-sm-3">
      
    </div>
    
    <div class="col-sm-6">
      
      <div v-for="memberInfo in memberInfoList" v-bind:key="memberInfo.id" class="bg-warning alert">
        <p>email: {{memberInfo.email}}</p>
        <p>name: {{memberInfo.name}}</p>
        <b>권한: {{memberInfo.role}}</b>
        <br>
        <button class="btn btn-primary mt-2"><router-link :to="{name:'alterRole', params:{email:`${memberInfo.email}`}}" class="text-light">권한 수정</router-link></button>
      </div>
    </div>
    <div class="col-sm-3">
    </div>
  </div>
</template>

<script>
import {axiosAdminRoleCheck,getAxiosMemberList} from '@/api/member'
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      memberInfoList:[],
    }
  },
  created(){
    axiosAdminRoleCheck(
      this.getToken,
      (res)=>{
        console.log(res);
        this.setToken(res.token)
      },
      (err) => {
        console.log(err,"failed");
      }
    );
    console.log("memberInfo");
    getAxiosMemberList(
      this.getToken,
      (res)=>{
        console.log(res);
        this.memberInfoList= res;
      },
      (err) => {
        console.log(err,"failed");
      }
    );
  },
  
  computed:{
    ...mapGetters([
      'getToken'
    ]),
  },
}
</script>

<style>

</style>