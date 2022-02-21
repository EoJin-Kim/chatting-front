<template>
  <div>
    <div v-html="msgArea"></div>
    <textarea name="" id="" cols="30" rows="10"  v-model="message"></textarea>
    <br>
    <button v-on:click="msgSend">메세지 전송</button>
  </div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import {serverWsURL,enterUrl,messageUrl,messageReciveUrl} from '@/util/WsUtil'
export default {
  data(){ 
    return{
      roomId:"",
      msgArea:"",
      message:"",
      stomp:{},
      username: "eojin"
    }
  },
  created(){
    
    console.log(this.$route.params.roomId);
    this.roomId=this.$route.params.roomId;
    if(this.roomId===undefined) this.$router.push("rooms")
    this.connect()
  },
  methods:{
      connect() {
      console.log(serverWsURL);

      var username = "eojin"
      let socket = new SockJS(serverWsURL);
      this.stomp = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverWsURL}`)
      console.log(this.stomp)
        //2. connection이 맺어지면 실행
        this.stomp.connect({}, () =>{
            console.log("STOMP Connection")
            // console.log(t.roomId)

            //4. subscribe(path, callback)으로 메세지를 받을 수 있음
            this.stomp.subscribe(messageReciveUrl + this.roomId,  chat => {
                var content = JSON.parse(chat.body);
                console.log(content)
                var writer = content.writer;
                var str = '';
                var message = content.message;
                if(writer === username){
                    str = "<div class='col-6'>";
                    str += "<div class='alert alert-secondary'>";
                    str += "<b>" + writer + " : " + message + "</b>";
                    str += "</div></div>";
                    this.msgArea+=str;
                }
                else{
                    str = "<div class='col-6'>";
                    str += "<div class='alert alert-warning'>";
                    str += "<b>" + writer + " : " + message + "</b>";
                    str += "</div></div>";
                    this.msgArea+=str;
                }
            });
            this.stomp.send(enterUrl, JSON.stringify({roomId: this.roomId, writer: username}))
        });
    },
    msgSend(){
      console.log(this.stomp);
      this.stomp.send(messageUrl,  JSON.stringify({roomId: this.roomId, message: this.message, writer: this.username}));
      this.message = '';
    }
  }
}
</script>

<style>

</style>