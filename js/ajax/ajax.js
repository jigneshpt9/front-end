import axios from 'axios';

export default function (method,url,data,header){
  const baseUrl = "/bloggerworld/blogger";
  return axios({
    headers:(typeof header == 'undefined')?{
     'Content-Type':'application/json'
    }:header,
    method:method,
    url:baseUrl+url,
    data:data
  })
  .catch(function (error) {
    console.log(error);
  });
}
