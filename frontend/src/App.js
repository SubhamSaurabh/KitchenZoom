import React, { Component} from 'react';
import './App.css';

import Login from './components/pages/Login';
import Register from './components/pages/Register';

import NavBar from './components/pages/NavBar';
import Box from './components/box/Box';



import {BrowserRouter, Route} from 'react-router-dom';
import Dashbord from './layouts/Dashbord';
import MyBill from './layouts/MyBills';
import AllMenu from './layouts/AllMenu';
import DashbordStaff from './layouts/DashbordStaff';
import {ProtectedRoute} from './protectedRoute';
import {UnProtectedRoute} from './unProtectedRoute';


import { connect } from 'react-redux';
import {setToken, logoutAction} from './actions';
import auth from './_services/userService/auth';


class App extends Component {
  
  componentDidMount(){
    try {
      const token =window.localStorage.token;
      const staff = window.localStorage.staff;
      //console.log(staff)
      if(staff){
        
        if(typeof token !== "undefined"){
          this.props.setToken(token);
          //console.log("Staff")
          auth.login(() => {
            this.props.history.push("/dashbordstaff/");
          });
        }
      }
      else {
        //console.log("Student")
        if(typeof token !== "undefined"){
          this.props.setToken(token);
          auth.login(() => {
            this.props.history.push("/dashbord/");
          });
        } 
      }  
    } catch (error) {
      //console.log(error.toString());
    }
    
  }
  
  render() {
    //console.log(this.props)
    return (
      <BrowserRouter >
          <Route path="*" component={NavBar}></Route>
          <UnProtectedRoute exact path="/" component={Login}></UnProtectedRoute>
          <UnProtectedRoute path="/login" component={Login}></UnProtectedRoute>
          <UnProtectedRoute path="/register" component={Register}></UnProtectedRoute>
          <ProtectedRoute path="/dashbord" component={Dashbord}></ProtectedRoute>
          <ProtectedRoute path="/menu" component={AllMenu}></ProtectedRoute>
          <ProtectedRoute path="/mybill" component={MyBill}></ProtectedRoute>
          <ProtectedRoute path="/dashbordstaff" component={DashbordStaff}></ProtectedRoute>
          <Box size="30px"/>
          
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({isLoggedIn, token }) => ({
  isLoggedIn,
  token
})

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token)),
  logoutAction: () => dispatch(logoutAction())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);