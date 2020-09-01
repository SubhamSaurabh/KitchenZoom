import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col, CustomInput, FormGroup, Label, Input } from 'reactstrap';
import Box from './../box/Box';

import { connect } from 'react-redux';
import {setToken, logoutAction, setMenu, addMeal} from './../../actions';


class MenuListCard extends Component {
    constructor(props){
        super(props);
        //let st = this.props.Mydata.status;
        //console.log(this.props.Mydata);
        this.state = {
            avail: this.props.Mydata.avail,
            already: this.props.Mydata.avail,
            veg: true,
            submited:this.props.submitted
        };

        this.handleavail = this.handleavail.bind(this);
        this.setMealClick = this.setMealClick.bind(this);
    
    }
    handleavail(e){
        this.setState({avail: !this.state.avail}, ()=>{
            //this.props.addMeal()
            //console.log(e)
        });
    }
    setMealClick(e){
        const m_id = e.target.name;
        if(!this.state.avail){
            // console.log("Add in list")
            var meal_arr = this.props.meals;
            meal_arr.push(parseInt(m_id));
            this.props.addMeal(meal_arr);
        }
        else{
            // console.log("Now remove it! Yuck!! Deside first, you JERK!!");
            var arr = this.props.meals;
            var new_arr = [];
            for( var i = 0; i < arr.length; i++){
                if( arr[i] === parseInt(m_id)){
                      arr.splice(i, 1);
                }
            }
            //console.log(arr);
            this.props.addMeal(arr);
        }
        
    }
    componentWillMount(){
        //console.log(this.props.Mydata);
        this.setState({avail:this.props.Mydata.avail});
    }
    
    
    render() {
        const data=this.props.Mydata;
        //console.log(data)
        // console.log("SUBMITTED: ", this.props.submitted);
        // console.log("AVAIl: ", this.state.avail);
        // console.log("ALREADY: ", this.state.already);
        return (
            <ListGroup>
                <ListGroupItem  style={{backgroundColor:'#0bc00b', color: "white"}} action>
                    
                    <strong>{`${data.type[0].toLocaleUpperCase()}${data.type.slice(1)}`}</strong>
                    
                    </ListGroupItem>
                    <ListGroupItem  action>
                        <Row style={{fontSize:"12px"}}>
                            <Col xs="9">
                                <strong >{data.items}</strong> <br/>
                                <Box size="4px"/>
                                <span className="text-secondary">{data.time} </span><br/>
                                <Box size="6px"/>
                                <hr style={{padding:"0", margin:"0"}}/>
                                <Box size="4px"/>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" 
                                            disabled={this.state.already} 
                                            checked={this.state.avail} 
                                            id={data.meal_id}
                                            name={data.meal_id} 
                                            value={this.state.avail} 
                                            onChange={this.handleavail}
                                            onClick={this.setMealClick}
                                        /> 
                                        <span className="text-secondary" style={{marginTop:"5px"}}>Avail this food</span>
                                    </Label>
                                </FormGroup>                                
                            </Col>
                            <Col xs="3">
                                <br/>
                                <Box size="4px"/>
                                <br/>
                                <Box size="4px"/>
                                <Box size="4px"/>
                                <span className="text-right" style={{color:"#bfbfbf"}} >Rating</span> 
                            </Col>
                        </Row>
                    </ListGroupItem>   
            </ListGroup>
        )
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
    setMenu: (menu) => dispatch(setMenu(menu)),
    addMeal: (meal) => dispatch(addMeal(meal))
  })
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MenuListCard);