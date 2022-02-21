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
    this.connect()
  },
  methods:{
      connect() {
      const serverURL = "http://10.10.1.82:8080/stomp/chat"
      var username = "eojin"
      let socket = new SockJS(serverURL);
      this.stomp = Stomp.over(socket);
      console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`)
      console.log(this.roomId)
      var t = this;
        //2. connection이 맺어지면 실행
        this.stomp.connect({}, function (){
            console.log("STOMP Connection")
            // console.log(t.roomId)

            //4. subscribe(path, callback)으로 메세지를 받을 수 있음
            t.stomp.subscribe("/sub/chat/room/" + t.roomId, function (chat) {
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
                    // $("#msgArea").append(str);
                    t.msgArea+=str;
                }
                else{
                    str = "<div class='col-6'>";
                    str += "<div class='alert alert-warning'>";
                    str += "<b>" + writer + " : " + message + "</b>";
                    str += "</div></div>";
                    this.msgArea+=str;
                    // $("#msgArea").append(str);
                }
            });
            console.log(1111);
            console.log(t.stomp);
            console.log(1111);
            // console.log(JSON.stringify({roomId: t.roomId, writer: username}));
            //3. send(path, header, message)로 메세지를 보낼 수 있음
            t.stomp.send('/pub/chat/enter', JSON.stringify({roomId: t.roomId, writer: username}))
        });
    },
    msgSend(){
      console.log(this.stomp);
      this.stomp.send('/pub/chat/message',  JSON.stringify({roomId: this.roomId, message: this.message, writer: this.username}));
      this.message = '';
    }
  }
}
</script>

<style>

</style>