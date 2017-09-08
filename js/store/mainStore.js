import { EventEmitter } from 'events';
import AJAX from './../ajax/ajax';

class MainStore extends EventEmitter{
  constructor(){
    super();
    this.blogs = []
    this.login = []
  }
  fetchBlogs(){
      AJAX('GET','',{}).then((response)=>{
        this.blogs = response.data;
        this.emit('blogs_fetched')
      })
      }
  getBlogs(){
    return this.blogs;
  }

 login(){
   AJAX('GET','',{}).then((response)=>{
     this.login = response.status;
     if ( this.login === 'OK')
     {
        this.emit('login_done')
     }
     else {
       this.emit('login_failed')
     }
   })
  }

}

export default new MainStore();
