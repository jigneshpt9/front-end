import React from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import ListComponent from './listComponent';
import MainStore from './../../store/mainStore';
import { Link } from  'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';


export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      list : [],
      listCol: 12,
      selectedBlog:null
    }
    MainStore.fetchBlogs();
  }

  componentWillMount(){
    MainStore.on('blogs_fetched',()=>{
      this.setState({
        list:MainStore.getBlogs()
      });
    });
  }

  componentWillUnmount(){
    MainStore.removeAllListeners('blogs_fetched');
  }

  blogSelected(index){
    this.setState({
      selectedBlog:index,
      listCol:6
    });
  }

  renderList(){
    const list = this.state.list.map((item,index)=>
      <ListComponent key={index} onClick={this.blogSelected.bind(this,index)} heading={item.title} content={item.content} />
    );
    return list;
  }

  renderBlog(){
    if(this.state.listCol == 12){
      return (<div></div>);
    }
    else{
      return (
        <div>
          <h1>
            {this.state.list[this.state.selectedBlog].title}
          </h1>
          <p>
          {this.state.list[this.state.selectedBlog].content}
          </p>
        </div>
      );
    }
  }

  render(){
    var addButtonStyle = {float: 'right'};
    return(
      <div>
      <Link style={addButtonStyle} to="/bloggerworld/addblog"> <RaisedButton label="Add Blog"/> </Link>
      <Link style={addButtonStyle} to="/bloggerworld/searchblog"> <RaisedButton label="Search Blog"/> </Link>
      <Grid>
      <Cell col={12-this.state.listCol}>
        {this.renderBlog()}
      </Cell>
      <Cell col={this.state.listCol}>
        {this.renderList()}
      </Cell>
      </Grid>

      </div>
    )
  }
}
