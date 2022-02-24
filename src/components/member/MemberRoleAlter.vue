<template>
  <div>
    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon3">email</span>
      </div>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="memberInfo.email" readonly>
    </div>

    <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon3">name</span>
      </div>
      <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" v-model="memberInfo.name" readonly>
    </div>

    <div class="input-group mb-3">
      <label class="input-group-text" for="inputGroupSelect01">Role</label>
      <select class="form-select" aria-label="Default select example" v-model="role">
        <option value="ROLE_ADMIN">ADMIN</option>
        <option value="ROLE_MANAGER">MANAGER</option>
        <option value="ROLE_USER">USER</option>
      </select>
    </div>
    <button class="btn btn-primary" v-on:click="alterRole">변경</button>
  </div>
</template>

<script>
import router from '@/router/index';
import {
  getAxiosMemberEmailInfo,
  axiosMemberRoleAlter,  
  } from '@/api/member'
import { mapGetters } from 'vuex'
export default {
  computed:{
    ...mapGetters([
      'getToken',
    ]),
    
  },
  data(){
    return{
      email:"",
      memberInfo:{},
      role:"",
      alterInfo:{}
    }
  },
  created(){
    this.email = this.$route.params.email;
    getAxiosMemberEmailInfo(
      this.email,
      this.getToken,
      (res)=>{
        console.log(res);
        this.memberInfo = res
      },
      (err) => {
        console.log(err,"failed");
        this.setLoginCheck(false);
      }
    )
  },
  methods:{
    alterRole(){
      this.alterInfo.email=this.memberInfo.email
      this.alterInfo.role=this.role
      axiosMemberRoleAlter(
        this.alterInfo,
        this.getToken,
        (res)=>{
          console.log(res);
          this.memberInfo = res
          router.push("/admin/roleList")
        },
        (err) => {
          console.log(err,"failed");
          this.setLoginCheck(false);
        }
      )
    }
  }
}
</script>

<style>

</style>