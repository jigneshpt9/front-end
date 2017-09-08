import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';


export default class LoginModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
   }
 }

  login()
  {
    let data = {
      username:this.refs.username.input.value,
      password:this.refs.password.input.value
    };
    MainStore.login(data);
  }

  handleOpen(){
    this.setState({open: true});
  }

  handleClose(){
    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.login.bind(this)}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Login" onClick={this.handleOpen.bind(this)} />
        <Dialog
          title="Login"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        <TextField
          hintText="User Name"
          floatingLabelText="User Name"
          ref = "username"
        /><br />
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          ref="password"
        />
        </Dialog>
      </div>
    );
  }
}
