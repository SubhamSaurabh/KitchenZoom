import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {MDBIcon} from 'mdbreact';

import { connect } from 'react-redux';
import {setVeg, setMyDuration} from './../../actions';


class DropMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            purpose: this.props.purpose
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e){
        e.preventDefault();
        let val = e.target.name;
        //console.log(val);
        if(this.state.purpose === "duration")
        {
            this.props.setMyDuration(val)
            this.setState({
                data:val
            })

        }
        else if(this.state.purpose === "refresh rate")
        {
            this.props.setFreq(val)
            this.setState({
                data:val
            })
        }
    }
    render() {
        //console.log(this.props.freq);
        return (
            <UncontrolledDropdown >
                <DropdownToggle color="dark"  caret>
                    <span style={{paddingRight:"5px"}} className="text-lowercase">{this.state.data}</span>
                    
                    <MDBIcon icon={this.props.icon} />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem header>{this.props.purpose}</DropdownItem>
                    {
                        this.props.shortdurations.map((item, index)=> {
                            return (
                                <DropdownItem key={index} onClick={this.handleClick} name={item.value}>{item.disp}</DropdownItem>
                            )
                        })
                    }
                    <DropdownItem divider />
                    {
                        this.props.longdurations.map((item, index)=> {
                            return (
                                <DropdownItem key={index} onClick={this.handleClick} name={item.value}>{item.disp}</DropdownItem>
                            )
                        })
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
}


const mapStateToProps = ({freq, duration }) => ({
    freq,
    duration
  })
  
  const mapDispatchToProps = (dispatch) => ({
    setFreq: (veg) => dispatch(setVeg(veg)),
    setMyDuration: (duration) => dispatch(setMyDuration(duration)),
  })
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(DropMenu);

