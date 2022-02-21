<template>
<div>
  <div v-for="room in roomList" v-bind:key="room.id">
    <ul>
      <router-link :to="{name:'room', params:{roomId:`${room.roomId}`}}">{{room.name}}</router-link>
    </ul>
  </div>
</div>
</template>

<script>
import {getAxiosRooms} from '@/api/chat'
export default {
  data(){
    return{
      roomList:[]
    }
  },
  created(){
    console.log(1);
    getAxiosRooms(
      {},
      (res)=>{
        console.log(res);
        this.roomList = res;
      },
      (err) => {
        console.log(err,"failed");
      }
    )
  }
}
</script>

<style>

</style>