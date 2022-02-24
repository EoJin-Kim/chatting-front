import axios from 'axios';
import { setInterceptors } from '@/api/util/interceptors';
var chatBackURL = "http://10.10.1.82:8080"

function createAxios() {
    
    let axiosService = axios.create({
      baseURL: chatBackURL,
    });
    return setInterceptors(axiosService)
  }
export const axiosService = createAxios();