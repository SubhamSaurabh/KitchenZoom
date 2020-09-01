import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';
import VegIcon from './../../Assets/Veg.svg';
import NonVegIcon from './../../Assets/NonVeg.svg';

import { connect } from 'react-redux';
import {setToken, logoutAction, setMenu, addMeal} from './../../actions';


class MenuListCount extends Component {
    constructor(props){
        super(props);
        //let st = this.props.Mydata.status;
        //console.log(this.props.Mydata);
        this.state = {
            avail: this.props.Mydata.avail,
            already: this.props.Mydata.avail,
            veg: true,
            submited:this.props.submitted,
            guest_veg:10,
            guest_non_veg:15,
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
            //console.log("Add in list")
            var meal_arr = this.props.meals;
            meal_arr.push(parseInt(m_id));
            this.props.addMeal(meal_arr);
        }
        else{
            //console.log("Now remove it! Yuck!! Deside first, you JERK!!");
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
                <ListGroupItem  style={{backgroundColor:'black', color: "white"}} action><strong>{`${data.type[0].toLocaleUpperCase()}${data.type.slice(1)}`}</strong></ListGroupItem>
                    <ListGroupItem  action>
                        <Row style={{fontSize:"14px"}}>
                            <Col xs="8">
                                <strong >{data.items}</strong>   
                            </Col>
                            <Col xs="4" className="text-right">
                                {
                                    data.isVeg?
                                    <img src={VegIcon} alt="veg_icon" width="18px"/>
                                    :
                                    <img src={NonVegIcon} alt="non_veg_icon" width="18px"/>
                                }
                            </Col>
                        </Row>
                    </ListGroupItem> 
                    <ListGroupItem action>
                        <Row style={{fontSize:"12px"}}>
                            <Col xs="8">
                                <span >Total Plate</span>
                            </Col>
                            <Col xs="4" className="text-right">
                                {data.number_of_users}
                            </Col>
                        </Row>
                    </ListGroupItem>  
                    <ListGroupItem action>
                        <Row style={{fontSize:"12px"}}>
                            <Col xs="8">
                                <span >Guest Plate</span>
                            </Col>
                            <Col xs="4" className="text-right">
                                +&nbsp;{
                                    
                                        data.isVeg?
                                        this.state.guest_veg
                                        :
                                        this.state.guest_non_veg  
                                }
                            </Col>
                        </Row>
                    </ListGroupItem> 
                    <ListGroupItem action>
                        <Row style={{fontSize:"12px"}}>
                            <Col xs="8">
                                {
                                    data.isVeg?
                                    <strong className="text-right" style={{color:"#008001"}}>
                                        TOTAL
                                    </strong>
                                    :
                                    <strong className="text-right" style={{color:"#d40000"}}>
                                        TOTAL
                                    </strong>

                                }
                                
                            </Col>
                            <Col xs="4" className="text-right">
                            {
                                    data.isVeg?
                                    <strong className="text-right" style={{color:"#008001"}}>
                                        {this.state.guest_veg+data.number_of_users}
                                    </strong>
                                    :
                                    <strong className="text-right" style={{color:"#d40000"}}>
                                        {this.state.guest_non_veg+data.number_of_users}
                                    </strong>

                                }
                                
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
  )(MenuListCount);