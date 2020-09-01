import React, { Component } from 'react';
import { MDBIcon } from "mdbreact";
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, CustomInput } from 'reactstrap';
import Spin from './../spinner/Spin';
import auth from './../../_services/userService/auth';
import userService from './../../_services/userService/user';
import Toast from './../toast/Toast';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import {setToken} from './../../actions';

class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      password: '',
      email: '',
      name:'',
      isVeg:false,
      phone:'',
      reg_id:'',
      sic_id:'',
      role:'',
      student:true,
      submitted: false,
      error: '',
      loading: false,
      isSuccess: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleVeg = this.handleVeg.bind(this);
    this.handleStudent = this.handleStudent.bind(this);
    
    
  }

  handleStudent(e){
    
    this.setState({student:!this.state.student});
    console.log("student changed: ", this.state.student);
  }

  handleVeg(e){
    
    this.setState({isVeg:!this.state.isVeg});
    console.log("veg changed: ", this.state.isVeg);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, ()=>{
      this.setState({
        sic_id: this.state.sic_id.toLocaleUpperCase()
      })
    });
    
  }


  handleRegister(e) {
    e.preventDefault();
    console.log(this.state)
    const { name, username, password, isVeg, reg_id, sic_id, student } = this.state;
    if (!(username && password)) {
        return;
    }

    var role;
    if(student === true){
      role = "student"
    }
    else{
      role = "maintainer"
    }

    console.log(name, username, password, isVeg, role, reg_id, sic_id);

    var data = {
      'name': name,
      'email': username,
      'isVeg': isVeg,
      'reg_id': reg_id,
      'sic_id': sic_id,
      'role': role,
      'password': password

    }
    this.setState({ loading: true });
    userService.register(data)
      .then(
        user => {
            if(user.status === 'fail')
                this.setState({ error: user.message, loading: false, isSuccess:false });
            else{
                this.setState({isSuccess:true});
                this.props.history.push("/login/");
            }
        },
    );
    
    console.log(this.state.error);
    this.setState({isSuccess:true})
  }
  render() {
    const { username, password, submitted, loading, error } = this.state;
    return (
      <div style={{minHeight: "1vh", height:"100%"}}>
      <div className="app flex-row align-items-center align-middle justify-content-center">
        <Container className="justify-content-center">
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Register</h1>
                      <p className="text-muted">Please input valid credentials.</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="user-alt" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="fullname" name="name" value={this.state.name} onChange={this.handleChange}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="envelope" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Email" autoComplete="username" name="username" value={username} onChange={this.handleChange}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="registered" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Registration No." autoComplete="registration_id" name="reg_id" value={this.state.reg_id} onChange={this.handleChange}/>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="database" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="SIC" autoComplete="SIC_id" name="sic_id" value={this.state.sic_id} onChange={this.handleChange}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <MDBIcon icon="key" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password" value={password} onChange={this.handleChange}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <InputGroup className="mb-4">
                            <CustomInput className="text-success" type="radio" checked={this.state.isVeg} id="isVeg" name="isVeg" value={this.state.isVeg} onChange={this.handleVeg}/>
                                Veg
                          </InputGroup>
                        </Col>
                        <Col xs="6">
                          <InputGroup className="mb-4">
                            <CustomInput  type="radio" checked={!this.state.isVeg} id="isNonVeg" name="isVeg" value={this.state.isVeg} onChange={this.handleVeg}/>
                                Non-Veg
                          </InputGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs="6">
                          <InputGroup className="mb-4">
                            <CustomInput type="radio" checked={this.state.student} id="isStudent" name="isStudent" value={this.state.student} onChange={this.handleStudent}/>
                                Student
                          </InputGroup>
                        </Col>
                        <Col xs="6">
                          <InputGroup className="mb-4">
                            <CustomInput type="radio" checked={!this.state.student} id="isNotStudent" name="isNotStudent" value={this.state.student} onChange={this.handleStudent}/>
                                Supervisor
                          </InputGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col xs="6">
                          <Button className="px-4 grey darken-3" disabled={loading} onClick={this.handleRegister}>
                            
                            {loading ?
                              <Spin size="sm" />
                              :
                              "Register"
                            }
                            
                          
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white grey darken-3 py-5 d-md-down-none">
                  <CardBody className="text-center">
                    <div>
                      <h2 style={{fontWeight:"bold"}}>Welcome to KitchenZoom</h2>
                      <p>Already have an account? <Link to="/login">&nbsp;Login</Link></p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        {
          this.state.isSuccess===true?<div></div>:
          <Toast msg={error}/>
        }
        
      </div>
      </div>
    );
  }
}


const mapStateToProps = ({isLoggedIn, token }) => ({
  isLoggedIn,
  token
})

const mapDispatchToProps = (dispatch) => ({
  setToken: (token) => dispatch(setToken(token))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);