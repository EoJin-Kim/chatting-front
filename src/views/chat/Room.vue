<template>
  <div class="m-2">
    <div v-html="msgArea"></div>
    <textarea name="" id="" cols="100" rows="4"  v-model="message"></textarea>
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
    document.addEventListener('beforeunload', this.unLoadEvent)
    console.log(this.$route.params.roomId);
    this.roomId=this.$route.params.roomId;
    if(this.roomId===undefined) this.$router.push("rooms")
    this.connect()
  },
  beforeDestroy(){
    let message = `${this.username}님이 나가셨습니다`
    this.stomp.send(messageUrl,  JSON.stringify({roomId: this.roomId, message: message, writer: this.username}));
                
    this.stomp.disconnect();

  },

  methods:{
      unLoadEvent(){
        this.alertMsg();
      },
      alertMsg(){
        alert(123);
      },
      connect() {
      console.log(serverWsURL);

      let socket = new SockJS(serverWsURL);
      this.stomp = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverWsURL}`)
      console.log(this.stomp)
        //2. connection이 맺어지면 실행
        this.stomp.connect({}, () =>{
            console.log("STOMP Connection")

            //4. subscribe(path, callback)으로 메세지를 받을 수 있음
            this.stomp.subscribe(messageReciveUrl + this.roomId,  chat => {
                var content = JSON.parse(chat.body);
                var writer = content.writer;
                var str = '';
                var message = content.message;
                if(writer === this.username){
                    str = this.myChat(writer,message)
                    this.msgArea+=str;
                }
                else{
                    str = this.otherChat(writer,message)
                    this.msgArea+=str;
                }
            });
            this.stomp.send(enterUrl, JSON.stringify({roomId: this.roomId, writer: this.username}))
        });
    },
    msgSend(){
      console.log(this.stomp);
      this.stomp.send(messageUrl,  JSON.stringify({roomId: this.roomId, message: this.message, writer: this.username}));
      this.message = '';
    },
    myChat(writer,message){
      let str = "<div class='col-6'>";
      str += "<div class='alert bg-warning'>";
      str += "<b>" + writer + " : " + message + "</b>";
      str += "</div></div>";
      return str;
    },
    otherChat(writer,message){
      let str = "<div class='col-6'>";
      str += "<div class='alert bg-primary'>";
      str += "<b>" + writer + " : " + message + "</b>";
      str += "</div></div>";
      return str;
    }
  }
}
</script>

<style>

</style>