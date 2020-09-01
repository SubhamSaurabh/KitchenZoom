import React, { Component } from 'react';

import { connect } from 'react-redux';
import {setToken, logoutAction, setMenu} from './../actions';
import {Row, Col, Button, CustomInput} from 'reactstrap'
import MenuCard from './../components/card/MenuCard';
import MenuListCount from './../components/card/MenuListCount';
import Box from './../components/box/Box';
import Spin from './../components/spinner/Spin';
import avail from './../_services/userService/avail';
import Toast from './../components/toast/Toast';


import getTomorrowsCount from './../_services/dataService/staffService';

class DashbordStaff extends Component {
    constructor(props){
        super(props)
        //const menu = getMenu();
        this.state = {
            loading:true,
            veg:this.props.veg,
            err:false,
            err_msg:'',
            gen_food:[],
            meals:[],
            status:true,
            label:"Veg",
            Buttonloading:false,
            submitted:false,
            loading_err:false,
        }
        this.toggle = this.toggle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(NextProps){
        //console.log(this.props.Mydata);
        this.setState({veg:NextProps.veg})
        this.setState({loading:true}, ()=>{
            if(NextProps.veg){
                this.setState({
                    gen_food:this.props.menu.general_veg_menu,
                    meals:this.props.menu.veg_meals
                }, 
                ()=>{
                    this.setState({loading:false})
                }) 
            }
            else{
                this.setState({
                    gen_food:this.props.menu.general_non_veg_menu,
                    meals:this.props.menu.non_veg_meals
                }, 
                ()=>{
                    this.setState({loading:false})
                })
            }
        })
        //console.log("recieved the props: ", NextProps.veg);
    }

    toggle(e){
        e.preventDefault()
        this.setState({
            loading:true,
            submitted:false,
        }, () => {
            //console.log('BEFORE ',this.state.status);
            let l = this.state.status ? "Non-Veg": "Veg";
            this.setState({
                status: !this.state.status,
                label: l
            }, () => {
                //console.log('AFTER ', this.state.status);
                if(this.state.status){
                    this.setState({
                        gen_food:this.props.menu.general_veg_menu,
                        meals:this.props.menu.veg_meals,
                    }, 
                    ()=>{
                        this.setState({loading:false})
                    })
                }
                else{
                    this.setState({
                        gen_food:this.props.menu.general_non_veg_menu,
                        meals:this.props.menu.non_veg_meals
                    }, 
                    ()=>{
                        this.setState({loading:false})
                    })
                }
                this.setState({
                    loading:false
                })
            })
        })   
    }
    
    componentDidMount(){
        //console.log('Mounted submitted is ', this.state.submitted);
        
        this.setState({loading:true}, ()=>{
            const token = this.props.token;
            getTomorrowsCount(token).then(res => {
                // console.log(res);
                if(res.status){
                    //console.log("True that setting the menus");
                    this.props.setMenu(res)
                }
                else{
                    this.setState({loading_err:true, err_msg:res.msg});
                }
                
            }).then(r=>{

                if(this.state.status){      //if veg
                    this.setState({
                        gen_food:this.props.menu.general_veg_menu,
                        meals:this.props.menu.veg_meals
                    }, 
                    ()=>{
                        this.setState({loading:false})
                    })
                }
                else{                       //if non-veg
                    this.setState({
                        gen_food:this.props.menu.general_non_veg_menu,
                        meals:this.props.menu.non_veg_meals
                    }, 
                    ()=>{
                        this.setState({loading:false})
                    })
                }
                    
            })    
        })
        

    }

    handleSubmit(e){
        e.preventDefault()
        const meal_arr = this.props.meals
        if(meal_arr.length ===0){
            return;
        }
        else{
            //Network call here
            this.setState({Buttonloading:true}, ()=>{
                avail(this.props.token, meal_arr).then(res=>{
                    this.setState({submitted:true, err_msg:res.message}, ()=>{
                        this.setState({Buttonloading:false})
                    })
                });
            })
            
        }
        this.setState({submitted:false})
        
    }
    componentWillMount(){
        this.setState({submitted:false})
    }
    componentWillUnmount(){
        this.setState({submitted:false})
    }

    render() {
        
        //console.log(this.state.breakfast.avail);
        if(this.state.loading){
            return (
                <div className="text-center">
                    <Box size="50px"/>
                    <Spin size="lg"/>
                    Loading ...
                </div>
            )
        }
        else if(this.state.loading_err){
            return(
                <h3 className="text-center">Loading err, {this.state.err_msg}</h3>
            )
        }
        else{
            //console.log(this.props.menu.veg_meals)
            const gen_food = this.state.gen_food;
            const meals = this.state.meals;
            //console.log(gen_food, meals)
            return (
                <div style={{marginTop:"-30px"}}>
                    <Row className="container">
                        
                        <Col className="" xs="5">
                            {
                                this.state.status?
                                <CustomInput 
                                    color="dark" 
                                    checked={this.state.status} 
                                    type="switch" 
                                    id="veg_toggle" 
                                    name="customSwitch" 
                                    label={this.state.label} 
                                    onChange={this.toggle}
                                    valid
                                />
                                :
                                <CustomInput 
                                    color="dark" 
                                    checked={this.state.status} 
                                    type="switch" 
                                    id="veg_toggle" 
                                    name="customSwitch" 
                                    label={this.state.label} 
                                    onChange={this.toggle}
                                    invalid
                                />
                            }
                        </Col>
                        <Col xs="7" className="text-right">
                        <div className="text-right" style={{ fontSize:"12px"}}>No. of plates to prepare</div>
                    
                        </Col>

                    </Row>
                    <Box size="20px"/>
                    <Row>
                        <Col xs="12">
                            <div style={{width:"100%", fontSize:"16px", fontWeight:"600"}} className="text-left container">
                                Tomorrow's Menu
                            </div>
                        </Col>
                    </Row>

                    <Box size="20px"/>
                    
                    <div className="container">
                        {
                            this.state.meals.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <Row >
                                            <Col xs="12">
                                                <MenuListCount Mydata={item} submitted={this.state.submitted}/>
                                            </Col>
                                        </Row>
                                        <Box size="20px"/>
                                    </div>
                                );
                            })
                        }  
                    </div>
                    
                    {
                        this.state.submitted?
                        <Toast msg={this.state.err_msg}/>
                        :
                        <div/>
                    }
                    
                    
                    
                </div>
            )
        }
        
    }
        
}

const mapStateToProps = ({isLoggedIn, token, menu, veg, meals }) => ({
    isLoggedIn,
    token,
    menu,
    veg,
    meals,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    setToken: (token) => dispatch(setToken(token)),
    logoutAction: () => dispatch(logoutAction()),
    setMenu: (menu) => dispatch(setMenu(menu))
  })
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DashbordStaff);
