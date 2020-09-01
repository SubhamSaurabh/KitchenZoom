import React, { Component } from 'react'
import { CustomInput } from 'reactstrap';
import Spin from './../spinner/Spin';
import urls from './../../conf';

import { connect } from 'react-redux';
import {setVeg} from './../../actions';

var base_url = urls.dev_url;

class Switch extends Component {
    constructor(props){
        super(props)
        //console.log("DEBUG:: ", this.props.status)
        //let l = this.props.veg ? "Veg": "Non-Veg";
        this.state={
            label:"Veg",
            loading:false,
            changed:false,
            name: this.props.name          
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle(e){
        e.preventDefault()
        this.setState({
            loading:true
        }, () => {
            console.log('BEFORE ',this.state.status);
            let l = this.state.status ? "Non-Veg": "Veg";
            this.setState({
                status: !this.state.status,
                label: l
            }, () => {
                console.log('AFTER ', this.state.status);
                this.props.setVeg(this.state.status);
                this.setState({
                    loading:false
                })
            })
        })   
    }
    componentWillMount(){
        this.setState({loading:true}, ()=>{
            console.log("In mount")
            this.setState({status:true},()=>{
                this.setState({loading:false})
            })
        })
    }
    render() {
        console.log("IN RENDER ", this.state.status)
        if(this.state.loading ){

            return(
                <Spin size="sm" lastColor="light"/>
            )
        }
        else{
            console.log("IN RENDER ELSE ", this.state.status)
            console.log("IN RENDER LOADING ", this.state.loading)
            return (
                <div>
                    "STATUS "{this.state.status}
                <CustomInput 
                    color="dark" 
                    checked={this.state.status} 
                    type="switch" 
                    id={this.props.name} 
                    name="customSwitch" 
                    label={this.state.label} 

                    onChange={this.toggle}
                />
                </div>
            )
        }
        
    }
}

const mapStateToProps = ({token }) => ({
    token,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    setVeg: (veg) => dispatch(setVeg(veg))
  })
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Switch);