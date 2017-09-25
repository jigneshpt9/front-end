import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MainStore from './../../store/mainStore';


export default class Addblog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
       blogData: true
    }
}

handlePostBlog()
{
  let data = {
    title:this.refs.blogTitle.input.value,
    content:this.refs.blogContent.input.refs.input.value,
    blogOwner :MainStore.getBlogOwnerData()
  };

   MainStore.postBlog(data);
}

componentWillMount(){
  MainStore.on('blog_posted',()=>{
    window.location.hash = '/';
  });
}

componentWillUnmount(){
  MainStore.removeAllListeners('blog_posted');
}

render(){
  return(
    <div>
    <h3>
       Blog Title
    </h3>
     <TextField
          fullWidth={true}
          ref="blogTitle"
     >
    </TextField>
    <br/>
    <h3>
        Blog Content
    </h3>
     <TextField
          rows={10}
          multiLine={true}
          fullWidth={true}
          ref="blogContent"

    >
    </TextField>
    <br/>
    <RaisedButton label="Post Blog" onClick={this.handlePostBlog.bind(this)}/>
   </div>
  )
}
}
