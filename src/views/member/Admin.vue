<template>
  <div>
    Admin 페이지
  </div>
</template>

<script>
import {axiosAdminRoleCheck} from '@/api/member'
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      
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
    this.getMemberList();
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