import React from 'react';
import { BrowserRouter as Router, Route } from  'react-router-dom';
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
//route components
import Home from './components/home/home';
import MainStore from './store/mainStore';
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
    if(this.state.login == false){
      return(
        <div>
          <LoginModal />
        </div>
      );
    }
    else{
      return(
        <div>

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
        //  iconElementRight={<FlatButton label="Login"/>}
          />

            <Router>
              <Route path="/" component={Home}/>
            </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}
