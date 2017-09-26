import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MainStore from './../../store/mainStore';


export default class Addblog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
       error:''
    }
}

handlePostBlog()
{
  let data = {
    title:this.refs.blogTitle.input.value,
    content:this.refs.blogContent.input.refs.input.value,
    lastUpdated: new Date(),
    blogOwner :MainStore.getBlogOwnerData(),
    comments:[]
  };
 console.log(data.lastUpdated);
   MainStore.postBlog(data);
}

componentWillMount(){
  MainStore.on('blog_posted',()=>{
    window.location.hash = '/';
  });
  MainStore.on('blog_post_empty',()=>{
    this.setState({
        error:'Provide title/content'
    });
  });
  MainStore.on('blog_post_data_length_invalid',()=>{
    this.setState({
        error:'Title should be mininum 10 chars and Content should be minimum 100 chars'
    });
  });
}

componentWillUnmount(){
  MainStore.removeAllListeners('blog_posted');
}

render(){
  return(
    <div>
    <br />
    <p style={{color:'red', fontSize: '200%'}}>{this.state.error}</p>
    <br />
    <h3>
       Blog Title(Minimum 10 chars)
    </h3>
     <TextField
          fullWidth={false}
          ref="blogTitle"
     >
    </TextField>
    <br/>
    <h3>
        Blog Content(Minimum 100 chars)
    </h3>
     <TextField
          rows={10}
          multiLine={true}
          fullWidth={false}
          ref="blogContent"

    >
    </TextField>
    <br/>
    <RaisedButton label="Post Blog" onClick={this.handlePostBlog.bind(this)}/>
   </div>
  )
}
}
