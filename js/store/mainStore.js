import { EventEmitter } from 'events';
import AJAX from './../ajax/ajax';
import ErrorStore from './errorStore'

class MainStore extends EventEmitter{
  constructor(){
    super();
    this.blogs = []
    this.login = [];
    this.token;
    this.userData;
  }

  getBlogOwnerData(){
    return this.userData;
  }
  getHeader(){
    var header = {"Authorization":this.token};
    return header;
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
      if (data.title == '' || data.content == '')
      {
          this.emit('blog_post_empty')
      }
      else if (data.title.length <= 10 || data.content.length <= 100){
         this.emit('blog_post_data_length_invalid')
      }
      else {
         AJAX('POST','/blog',data,this.getHeader()).then((response)=>{
             this.emit('blog_posted')
         })
       }
  }
  searchBlog(keyWord)
  {
         AJAX('GET','/blog/'+keyWord,{},'').then((response)=>{
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
  addComment(blogId,data){
    console.log(this.token)
    if (typeof this.token == 'undefined'){
      this.emit('comment_login_required')
    }
    else if (data.text == ''){
        this.emit('comment_blank')
    }
    else {
    AJAX('POST','/blog/comment/'+blogId,data,this.getHeader()).then((response)=>{
        this.emit('comment_posted')
    })
  }
  }

 loginUser(data){
   AJAX('GET', '/user/'+data.emailId+'/login/'+data.password,{},'').then((response)=>{
    var header = response.headers;
    this.token = header.authorization;
    this.userData = response.data;
    console.log(this.token);
        console.log("login success")
        this.emit('login_done')
   }).catch((err)=>{
     console.log('login failed')
        this.emit('login_failed')
    });
}

logoutUser(){
  this.token='';
}

}

export default new MainStore();
