import {axiosService} from './index';


async function axiosLogin(data, callback, errorCallback) {
  // function axiosLogin(data) {
  await axiosService.post("/api/member/login",data,{headers:{
      'Content-type': 'application/json',
    }})
  .then((res) =>{
      callback(res.data);
  })
  .catch((err) =>{
      errorCallback(err);
    }
  );
  // return axiosService
  // return axiosService.post("/api/member/login",data,{headers:{
  //       'Content-type': 'application/json',
  //     }})
}

async function getAxiosMemberInfo(token,callback, errorCallback) {
  axiosService.get("/api/member/info",{headers:{
    'Authorization': "Bearer "+token,
  }})
  .then((res) =>{
      callback(res.data);
  })

  .catch((err) =>{
      errorCallback(err);
  }
);
}

async function axiosUserRoleCheck(token,callback, errorCallback) {
  axiosService.get("/api/role/user",{headers:{
    'Authorization': "Bearer "+token,
  }})
  .then((res) =>{
      callback(res.data);
  })

  .catch((err) =>{
      errorCallback(err);
  }
);
}

async function axiosManagerRoleCheck(token, callback, errorCallback) {
  axiosService.get("/api/role/manager",{headers:{
    'Authorization': "Bearer "+token,
  }})
  .then((res) =>{
      callback(res.data);
  })

  .catch((err) =>{
      errorCallback(err);
  }
);
}
async function axiosAdminRoleCheck(token, callback, errorCallback) {
  axiosService.get("/api/role/admin",{headers:{
    'Authorization': "Bearer "+token,
  }})
  .then((res) =>{
      callback(res.data);
  })

  .catch((err) =>{
      errorCallback(err);
  });
}

async function getAxiosMemberList(token, callback, errorCallback) {
  axiosService.get("/api/member",{headers:{
    'Authorization': "Bearer "+token,
  }})
  .then((res) =>{
      callback(res.data);
  })

  .catch((err) =>{
      errorCallback(err);
  });
}

export{
  axiosLogin,
  getAxiosMemberInfo,
  axiosUserRoleCheck,
  axiosManagerRoleCheck,
  axiosAdminRoleCheck,
  getAxiosMemberList,
}