<template>
  <div>
  
    <div>
      <RoomList />
      방 만들기<input type="text" v-model="roomName">
      <br>
      <button v-on:click="makeRoom">방만들기 만들기</button>
    </div>
  </div>
</template>

<script>
import {createAxiosRoom} from '@/api/chat'
import RoomList from '@/components/chat/RoomList.vue'
export default {
  data(){
    return{
      roomName:"",
    }
  },
  methods:{
    makeRoom(){
      console.log("make room");
      createAxiosRoom(
        {
          roomName:this.roomName
        },
        (res)=>{
          console.log(res);
          this.$router.go(this.$router.currentRoute);
        },
        (err) => {
          console.log(err,"failed");
        }
      )
    }
  },
  components:{
    RoomList,
  },

}
</script>

<style>

</style>