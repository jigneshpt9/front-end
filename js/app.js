import React from 'react';
import { HashRouter as Router, Route, Switch, Link } from  'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import LoginModal from './components/loginModal'
import SignupModal from './components/signupmodal'
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
//route components
import Home from './components/home/home';
import MainStore from './store/mainStore';
import ErrorStore from './store/errorStore';
import Addblog from './components/blog/addblog'
import RaisedButton from 'material-ui/RaisedButton';




class Logout extends React.Component{

handleLogout(){
  MainStore.logoutUser();
  window.location.pathname='/bloggerworld'
}
  render(){
  return(
    <div style={{float:'right'}}>
      <FlatButton label="Logout" style={{color:'white'}} onClick={this.handleLogout.bind(this)} />
    </div>
  );
}
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    injectTapEventPlugin();
    this.state = {
      login:false
    }
  }
  log(){
    console.log("left button was clicked");
  }


  componentWillMount(){
    MainStore.on('login_done',()=>{
      this.setState({
        login:true
      });
    });
  }

  setRightIcon(){
    var addButtonStyle = {float: 'right',color:'white'};
    if(this.state.login == false){
      return(
        <div>
          <LoginModal />
          <SignupModal />
        </div>
      );
    }
    else{
      return(
        <div>
        <a href="#addblog"><FlatButton style={addButtonStyle} label="Add Blog"/></a>
        <Logout/>
        </div>
      )
    }
  }

   render(){
     const style = {
      height: 200,
      width: "98%",
      margin: 20,
      display: 'inline-block',
    };
    const headingStyle={
      marginLeft: 10
    };
     return (
      <MuiThemeProvider>
        <div>
          <AppBar
          title="Blogger's World"
          onLeftIconButtonTouchTap={this.log}
          iconElementRight={this.setRightIcon()}

          />
            <Router>
             <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/addblog" component={Addblog}/>

              </Switch>
            </Router>

        </div>
      </MuiThemeProvider>
    );
  }
}
