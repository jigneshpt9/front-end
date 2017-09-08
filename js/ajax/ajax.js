import axios from 'axios';

export default function (method,url,data){
  const baseUrl = "/bloggerworld/blogger/blog";
  return axios({
    headers:{
     'Content-Type':'application/json'
    },
    method:method,
    url:baseUrl+url,
    data:data
  });
}
