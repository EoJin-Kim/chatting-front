import axios from 'axios';

var chatBackURL = "http://10.10.1.82:8080"
function createAxios() {
    return axios.create({
      baseURL: chatBackURL,
      // headers: {
      //   'Content-type': 'application/json',
      // },
    });
  }
export const axiosService = createAxios();