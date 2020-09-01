import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Toast extends Component {
    constructor(props){
        super(props);
        let msg = this.props.msg;
        this.state = {
            msg: msg
        }
    }
    componentDidMount(){
        this.notify();
    }
    notify = () => toast(this.state.msg);
    render() {
        return (
            <ToastContainer />                
        )
    }
}
