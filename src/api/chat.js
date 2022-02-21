import {axiosService} from './index';


async function getAxiosRooms(data, callback, errorCallback) {
    axiosService.get("/chat/rooms",data)
    .then((res) =>{
        callback(res.data);
    })

    .catch((err) =>{
        errorCallback(err);
    }
  );
}
async function createAxiosRoom(data, callback, errorCallback) {
  axiosService.post("/chat/room",data,{headers:{
      'Content-type': 'application/json',
    }})
  .then((res) =>{
      callback(res.data);
  })

  .catch((err) =>{
      errorCallback(err);
    }
  );
}

export{
  getAxiosRooms,
  createAxiosRoom,
}