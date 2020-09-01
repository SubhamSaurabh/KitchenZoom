import React, { Component } from 'react';
import getBill from './../_services/dataService/billService';
import Spin from './../components/spinner/Spin';
import { Table, Row, Col } from 'reactstrap';
import Box from './../components/box/Box';
import { MDBIcon } from "mdbreact";
import bill_vars from './../conf/billConfig';

import { connect } from 'react-redux';

class MyBills extends Component {
    constructor(props){
        super(props);
        this.state={
            month_bill:[],
            total_bill:[],
            loading:true,
            err:false,
            err_msg:'',
            full:false,
            month_total:0,
            total_total:0
        
        }
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount(){
        getBill(this.props.token).then(res=>{
            // console.log(res);
            if(res.status){
                this.setState({
                    month_bill: res.month_meals,
                    total_bill: res.total_meals,
                    month_total: res.month_meals.length*bill_vars.mult_fact+bill_vars.add_fact,
                    total_total: res.total_meals.length*bill_vars.mult_fact+bill_vars.add_fact,
                }, ()=>{
                    this.setState({loading:false});
                })
            }
            else{
                this.setState({err:true, err_msg:res.msg}, ()=>{
                    this.setState({loading:false})
                })
            }
        })
    }
    handleClick(e){
        e.preventDefault();
        this.setState({loading:true}, ()=>{
            this.setState({full:!this.state.full}, ()=>{
                this.setState({loading:false});
            })
        })
    }
    render() {
        if(this.state.loading){
            return(
                <div className="text-center">
                    <Box size="50px"/>
                    <Spin size="lg"/>
                    Loading ...
                </div>
            );
        }
        else{
            const month_bill = this.state.month_bill;
            // console.log(month_bill);

            return (
                <div className="container">
                    <div className="text-center" style={{width:"100%"}} xs="6">
                            This month's bill
                    </div>
                        
                    <Box size="10px"/>
                    <Table dark responsive={true}>
                        <thead>
                            <tr>
                            <th className="text-center">Date</th>
                            <th className="text-center">Meal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                month_bill.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                            <td className="text-center"><span className="text-white">{item.date.slice(0, 17)}</span></td>
                                            <td className="text-center">{item.type_of_meal}</td>
                                        </tr>
                                    )
                                    
                                })

                            }
                            <tr style={{color:"#0bc00b"}}>
                                <td className="text-right">
                                    <strong>TOTAL</strong>
                                </td>
                                <td className="text-center">
                                    <strong> <MDBIcon icon="rupee-sign" />  {this.state.month_total}</strong>
                                </td>
                            </tr>
                        </tbody>
                    
                    </Table>

                    {
                        this.state.full==true?
                        <div>
                            <Box size="20px"/>
                            <div className="text-center" style={{width:"100%"}} xs="6">
                                    Total Bill
                            </div>
                            <Box size="10px"/>
                            <Table dark responsive={true}>
                                <thead>
                                    <tr>
                                    <th className="text-center">Date</th>
                                    <th className="text-center">Meal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        month_bill.map((item, index)=>{
                                            return(
                                                <tr key={index}>
                                                    <td className="text-center"><span className="text-white">{item.date.slice(0, 17)}</span></td>
                                                    <td className="text-center">{item.type_of_meal}</td>
                                                </tr>
                                            )
                                            
                                        })
        
                                    }
                                    <tr style={{color:"#0bc00b"}}>
                                        <td className="text-right">
                                            <strong>TOTAL</strong>
                                        </td>
                                        <td className="text-center">
                                            <strong> <MDBIcon icon="rupee-sign" /> {this.state.total_total}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <a style={{fontSize:"10px"}} onClick={this.handleClick}>Click to see less.</a>
                        </div>
                        :
                        <a style={{fontSize:"10px"}} onClick={this.handleClick}>Click to see all.</a>
                    
                    }
                    
                    
                </div>
            )
        }   
        
    }
}

const mapStateToProps = ({token, }) => ({
    token,
  })
  
  const mapDispatchToProps = (dispatch) => ({

  })
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyBills);
