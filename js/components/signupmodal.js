import React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import MainStore from '../store/mainStore';


export default class SignupModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      error:{},
      signupStatus:''
   }
 }

 componentWillMount(){
   MainStore.on('user_signedup',()=>{
     console.log('user signedup success')
     this.setState({
       signupStatus:'Signup Successful, login with your credentials.'
     });
   });
 }

 componentWillUnmount(){
      this.setState({
       signupStatus:''
     });
   }


 validateEmail(email){
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\ w+)*(\.\w{2,3})+$/.test(email)){
      return true
   }
    return false
 }
 validateName(name){
   if (/^[a-zA-Z]+$/.test(name) && name.length <= 20) {
        return true
   }
     return false
  }
  validatePassword(p1,p2){
    if (p1 != p2){
     return false
   }
    else {
      return true
    }
  }
  validateContactNum(num){
    if (/^\d{8,14}$/.test(num)){
      return true
    }
    return false
  }
 validateFormData(){
   var data = {};
   var emailId=this.refs.emailId.input.value
   var fname= this.refs.firstName.input.value
   var lname= this.refs.lastName.input.value
   var passwd= this.refs.passwd.input.value
   var cnfpasswd= this.refs.cnfpasswd.input.value
   var cnum=this.refs.cnum.input.value

   if (!this.validateEmail(emailId))
   {
     alert("Invalid email address")
     return -1;
   }
   if (!this.validateName(fname)) {
     alert("Invalid First Name")
     return -1;
   }
   if (!this.validateName(lname)) {
     alert("Invalid Last Name")
     return -1;
   }
   if (!this.validatePassword(passwd,cnfpasswd))
   {
     alert('Passwords don\'t match');
     return -1;
   }
   if (!this.validateContactNum(cnum)){
      aleart('Invalid contact number');
      return -1;
   }
 }

 handleOpen(){
     this.setState({open: true});
 }

 handleClose(){
     this.setState({open: false});
}

signup()
{
   var returnVal = this.validateFormData();
   if (returnVal != -1 ){
   let data = {
      emailId:this.refs.emailId.input.value,
      firstName:this.refs.firstName.input.value,
      lastName:this.refs.lastName.input.value,
      contactNumber:this.refs.cnum.input.value,
      role:'user',
      password:this.refs.passwd.input.value,
    }
   MainStore.signup(data);
  }
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
        onClick={this.signup.bind(this)}
      />,
    ];

    return (
      <div style={{float:'right'}}>
        <FlatButton label="SignUp" style={{color:'white'}} onClick={this.handleOpen.bind(this)} />
        <Dialog
          title="SignUp"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        <TextField
          hintText="Email id"
          floatingLabelText="Email id (UserId)"
          ref = "emailId"
        />
        <div style={{color:'red'}}>
          {(this.state.error.hasOwnProperty('email'))?'invalid paramerter':''}``
        </div>
        <br />
        <TextField
          hintText="First Name"
          floatingLabelText="First Name"
          ref = "firstName"
        />
        <div>
            {(this.state.error.hasOwnProperty('fName'))?'invalid paramerter':''}
        </div>
        <br />
        <TextField
            hintText="Last Name"
            floatingLabelText="Last Name"
            ref = "lastName"
        />
        <div>
        {(this.state.error.hasOwnProperty('lName'))?'invalid paramerter':''}
        </div>
        <br />
        <TextField
          hintText="Password"
          floatingLabelText="Password"
          type="password"
          ref="passwd"
        />
        <div>
        {(this.state.error.hasOwnProperty('passwd'))?'invalid paramerter':''}
        </div>
        <TextField
          hintText="Confirm password"
          floatingLabelText="Confirm Password"
          type="password"
          ref="cnfpasswd"
        />
        <div>
        {(this.state.error.hasOwnProperty('cnfPass'))?'invalid paramerter':''}
        </div>
        <TextField
          hintText="Contact Number"
          floatingLabelText="Contact Number"
          type="number"
          ref="cnum"
        />
        {(this.state.error.hasOwnProperty('cnum'))?'invalid paramerter':''}
        <p  style={{color:'green'}}>{this.state.signupStatus}</p>
        </Dialog>
      </div>
    );
  }
}
