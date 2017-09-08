import React from "react";
import Paper from 'material-ui/Paper';

export default class ListComponent extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    const style = {
      paper:{
        height: 200,
        width: 400,
        margin: 20,
        float:"left",
        wordWrap: "break-word",
        display:"inline-block"
      }
    };
    return(
      <Paper onClick={this.props.onClick} style={style.paper} zDepth={2}>
        <h3>{this.props.heading}</h3>
        <p>{this.props.content.substring(0,100)+"..."}</p>
      </Paper>
    )
  }
}
