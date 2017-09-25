import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MainStore from '../store/mainStore';


export class Dialogbox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loginStatus: true,
      open:false
    }
  }

  componentWillMount(){
     MainStore.on('login_failed',function(){
         this.setState({
          loginStatus:false
         });
         this.setState({
          open:true
         });
     }.bind(this));
   }

  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose.bind(this)}
      />
    ];
      if ( this.state.loginStatus == false )
      {
       return (
        <div>
          <Dialog
             title="Login Failure"
             actions={actions}
             modal={false}
             open={this.state.open}
             onRequestClose={this.handleClose}
           >
            Invalid Login, try again.
          </Dialog>
       </div>
      )
    }
    else {
      return(
      <div>
      </div>
     );
   }
 }
}

export default class LoginModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      error:''
   }
 }

 componentWillMount(){
   MainStore.on('login_failed',()=>{
     console.log("login failed event");
     this.setState({
       error:'Invalid username/password'
     });
   });
 }

  login()
  {
    let data = {
      emailId:this.refs.username.input.value,
      password:this.refs.password.input.value
    };
    MainStore.loginUser(data);
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
      <div style={{float:'right'}}>
        <FlatButton label="Login" style={{color:'white'}} onClick={this.handleOpen.bind(this)} />
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
        <p  style={{color:'red'}}>{this.state.error}</p>
        </Dialog>

      </div>
    );
  }
}
