import React, { Component } from 'react'
import {Input, InputGroup, InputGroupAddon, InputGroupText} from 'reactstrap';
import Spin from './../spinner/Spin';


export default class MyInput extends Component {
    constructor(props){
        super(props);
        let n = this.props.name;
        let i = this.props.id
        this.state={
            name:n,
            loading: false,
            id: i
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);

        
    }
    handleChange(e){
        e.preventDefault()
        //console.log(e.target.name)
        this.setState({name: e.target.value})
    }
    handleSave(e){
        e.preventDefault()
        let name = this.state.name;
        console.log("Saving ... ", name);
        this.setState({loading: true});
        
        //NETWORK CALL HERE ...

        this.setState({loading: false});
    }
    render() {
        return (
            <InputGroup className="mb-3">
                
                <Input type="text"  value={this.state.name} name={this.props.name} onChange={this.handleChange} />
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                    {
                        this.state.loading? 
                        <Spin size="sm" ></Spin>:
                        <i class="fas fa-save" onClick={this.handleSave}></i>
                    }
                    
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
        )
    }
}
