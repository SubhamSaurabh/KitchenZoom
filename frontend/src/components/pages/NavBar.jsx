import React, { Component } from 'react';
import { MDBIcon } from "mdbreact";
import {Dropdown} from 'reactstrap';
import auth from './../../_services/userService/auth';
import Spin from './../spinner/Spin';
import userService from './../../_services/userService/user';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';
import {Link} from 'react-router-dom';


import { connect } from 'react-redux';
import {setToken, logoutAction} from './../../actions';

class NavBar extends Component{
  constructor(props){
    super(props)
    this.state = {
      isOpen: false,
      btnDropleft: false,
      isOpenProfile: false,
      loading: false,
      logout: false,
      devices: [],
      email: window.localStorage.email,
      staff: window.localStorage.staff
    }
    this.toggle = this.toggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  
  
  

  handleLogout(e){
    e.preventDefault()
    userService.logout();
    this.props.logoutAction();
    auth.logout(()=>{
      //this.context.history.push('/')
      this.setState({logout:true, devices:[]})
      this.props.history.push("/");
    })
    
    // console.log("Logout ", this.state.logout)
    // console.log("isAuth ", auth.isAuthenticated())
  }
  toggle(){
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  render(){
    const isOpen = this.state.isOpen;
    const isOpenProfile = this.state.btnDropleft;
    const loading = this.state.loading;
    
    return (
      <div>
        <Navbar className="grey darken-3" light expand="md" style={{marginBottom: "50px"}}>
        <Link to="/"><NavbarBrand href="/" className="text-white">KitchenZoom</NavbarBrand></Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar className="text-white">
            <Nav className="mr-auto" navbar>
              {
                this.state.staff==="true"?
                  <NavItem>
                    <Link to="/dashbordstaff"><NavLink className="text-white">Dashboard</NavLink></Link>
                  </NavItem>
                :
                  <NavItem>
                    <Link to="/dashbord"><NavLink className="text-white">Dashboard</NavLink></Link>
                  </NavItem>
              }
              
              <NavItem>
              <Link to="/menu"><NavLink className="text-white">Daily Menu</NavLink></Link>
              </NavItem>
              <NavItem>
              <Link to="/mybill"><NavLink className="text-white">History</NavLink></Link>
              </NavItem>
              
              
            </Nav>
            <NavbarText>
              {
                auth.isAuthenticated()?
                    <Dropdown direction="left" isOpen={isOpenProfile} toggle={() => { this.setState({ btnDropleft: !this.state.btnDropleft }); }}>
                    <DropdownToggle color="light" caret>
                      <MDBIcon icon="user-alt" />
                    </DropdownToggle>
                    <DropdownMenu style={{fontSize:"14px"}}>
                      <DropdownItem >Hi,<span style={{ paddingLeft:"2px"}}>{this.state.email}!</span></DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem ><Link to="/profile"><span className="text-gray" style={{color:"#bfbfbf"}}>View Profile</span></Link></DropdownItem>
                      <DropdownItem>
                        <Button to="/" className="px-4 grey darken-3" disabled={loading} onClick={this.handleLogout}> 
                          {loading ?
                            <Spin size="sm" />
                            :
                            <span className="text-white">Logout</span>
                          }
                        </Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown> :
                  <p></p>

              }
              
              
            </NavbarText>
          </Collapse>
        </Navbar>
      </div>
    );
    }
}

const mapStateToProps = ({isLoggedIn, token, devices }) => ({
  isLoggedIn,
  token,
  devices,
})

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token)),
  logoutAction: () => dispatch(logoutAction())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);