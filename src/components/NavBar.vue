<template>
<div>



<nav class="navbar navbar-expand-sm bg-dark navbar-dark">
  <div class="col-sm-6">
    <ul class="navbar-nav">
    <li class="nav-item active">
      <a class="nav-link" href="#">채팅 프로그램</a>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/about">About</router-link> 
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/chat/rooms">Chat</router-link>
    </li>
    
    
  </ul>
  </div>
  
  <div class="d-flex flex-row-reverse col-sm-5">
      <form class="form-inline" action="/action_page.php">
        <input class="custom-form-control mr-sm-2" type="text" placeholder="ID">
        <input class="custom-form-control mr-sm-2" type="text" placeholder="PW">
        <button class="btn btn-danger" type="submit">로그인</button>
      </form>
    </div>
</nav>
    

    
</div>
    
</template>

<script>
export default {

}
</script>

<style scoped>
.custom-form-control  {
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
       -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

</style>