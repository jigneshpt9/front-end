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
             this.emit('blogs_fetched')
         })
  }
  signup(data)
  {
    AJAX('POST','/user',data).then((response)=>{
        this.emit('user_signedup')
    })
  }

 loginUser(data){
   AJAX('GET', '/'+data.emailId+'/login/'+data.password,{}).then((response)=>{
        console.log("login success")
        this.emit('login_done')
   })
  }

}

export default new MainStore();
