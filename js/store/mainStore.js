import { EventEmitter } from 'events';
import AJAX from './../ajax/ajax';

class MainStore extends EventEmitter{
  constructor(){
    super();
    this.blogs = []
    this.login = []
  }
  fetchBlogs(){
      AJAX('GET','/blog',{}).then((response)=>{
        this.blogs = response.data;
        this.emit('blogs_fetched')
      })
      }
  getBlogs(){
    return this.blogs;
  }

  postBlog(data)
  {
         AJAX('POST','/blog',data).then((response)=>{
             this.emit('blog_posted')
         })
  }
  searchBlog(keyWord)
  {
         AJAX('GET','/blog/'+keyWord,{}).then((response)=>{
             this.blogs = response.data;
             console.log(this.blogs);
             this.emit('blogs_fetched')
         })
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
