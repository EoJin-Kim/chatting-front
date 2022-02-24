<template>
  <div>
    Manager 페이지
  </div>
</template>

<script>
import {axiosManagerRoleCheck} from '@/api/member'
import { mapGetters } from 'vuex'
export default {
  created(){
    axiosManagerRoleCheck(
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