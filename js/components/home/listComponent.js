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
        <h4>{this.props.heading.substring(0,25)+"..."}</h4>
        <p>{(this.props.content!==null)?this.props.content.substring(0,100):''+"..."}</p>
      </Paper>
    )
  }
}
