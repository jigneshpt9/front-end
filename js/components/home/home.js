import React from 'react';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import ListComponent from './listComponent';
import MainStore from './../../store/mainStore';
import { Link } from  'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import SearchBar from 'material-ui-search-bar';

import { Form, Text} from 'react-form';
import ReactForm from 'react-forms-component';
import ReactFormValidations from 'react-forms-component/validations';

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
    if(this.state.list == null){
      return (<div><h3>No Blogs found</h3></div>)
    }
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
      if(this.state.list == null){
        return (<div><h3>No Blogs found</h3></div>)
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
          <h4>Comment on this Blog</h4>

  <Form
    onSubmit={(values) => {
      console.log('Success!', values)
    }}
    validate={({ name }) => {
      return {
        name: !name ? 'A name is required' : undefined
      }
    }}
  >
    {({submitForm}) => {
      return (
        <form onSubmit={submitForm}>
          <Text field='name' />
          <br/>
          <button type='submit'>Submit</button>
        </form>
      )
    }}
  </Form>


        </div>

    );
    }
   }
  }


  handleClick(){
  	var keyWord;
    console.log(this.refs);
  	keyWord = this.refs.search.value.trim();

  }

  render(){
    var addButtonStyle = {float: 'right'};
    return(
      <div>

      <SearchBar
      hintText="Search Blogs"
      onChange={(value) => {
        console.log(value);
        MainStore.searchBlog(value)
      }}
      onRequestSearch={() => console.log('onRequestSearch')}
      style={{
        margin: '0',
        maxWidth: 700
      }}
      />

      <Link style={addButtonStyle} to="/bloggerworld/addblog"> <RaisedButton label="Add Blog"/> </Link>

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
