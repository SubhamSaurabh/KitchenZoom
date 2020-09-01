import React, { Component } from 'react';
import { CustomInput, Badge, InputGroup, InputGroupAddon, Button } from 'reactstrap';
import { MDBContainer } from "mdbreact";
import urls from './../../conf';

import { connect } from 'react-redux';

var base_url = urls.dev_url;

class Range extends Component {
    constructor(props){
        super(props)
        this.state = {
            rangeValue:this.props.data.currentValue,
            loading: false,
            name: this.props.data.device
        }
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillReceiveProps(){
        this.setState({
            rangeValue: this.props.data.currentValue
        })
    }
    handleChange(e){
        e.preventDefault();
        let new_intensity = e.target.value;
        const { name, value } = e.target;
        //console.log(this)
        this.setState({ [name]: value });
        this.setState({loading:true});
        
        //Network call for changing intensity here...
        console.log(new_intensity);
        console.log(this.props.data.device);
        fetch(`${base_url}device/intensity`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "device_name": this.props.data.device,
                "token": this.props.token,
                "intensity": new_intensity
            })
        }).then(response => response.json()).then(resp => {
            // console.log(resp.message)
            if(resp.message==="published"){
                // console.log("published")
            }
            else{
                let l = this.state.status ? "OFF": "ON";
                this.setState({
                    status: !this.state.status,
                    label: l
                })
            }
            this.setState({
                loading:false
            })
        })     
    }
    render() {
        
        return (
            <div>
            <p className="text-center">Slide the slider to increase/decrease the intensity.</p>
            <MDBContainer className="d-flex justify-content-right">
                
            <InputGroup size="sm">
                
                <CustomInput type="range" min={this.props.data.min} max={this.props.data.max} value={this.state.rangeValue} onChange={this.handleChange} name="rangeValue" inline 
                    style={{width: "62%", padding:"1rem"}}
                    id=""
                    disabled={this.state.loading}
                />
                <InputGroupAddon addonType="append"><Button color="dark"><Badge color="light">{this.state.rangeValue}</Badge><span style={{paddingLeft:"5px"}}>SET</span></Button></InputGroupAddon>
            </InputGroup>
            </MDBContainer>
            </div>
            
        )
    }
}

const mapStateToProps = ({token }) => ({
    token,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    
  })
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Range);
