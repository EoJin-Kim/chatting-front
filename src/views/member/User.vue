<template>
  <div>
    User 페이지
  </div>
</template>

<script>
import {axiosUserRoleCheck} from '@/api/member'
import { mapGetters } from 'vuex'
export default {
  created(){
    axiosUserRoleCheck(
      this.getToken,
      (res)=>{
        console.log(res);
        this.setToken(res.token)
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