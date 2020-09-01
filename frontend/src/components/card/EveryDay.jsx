import React, { Component } from 'react'
import { ListGroupItem, Row, Col, ListGroup } from 'reactstrap';
import Box from './../box/Box';
import Spin from './../spinner/Spin';

export default class EveryDay extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            data:[]
        }
    }
    componentDidMount(){
        this.setState({loading:true}, ()=>{
            
            this.setState({data:this.props.data}, ()=>{
                // console.log(this.state.data);
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
            const data = this.state.data;
            return (
                <div>
                    <ListGroup >
                        <ListGroupItem  style={{backgroundColor:'#0bc00b', color: "white"}} action>
                            {data.day}
                        </ListGroupItem>
                        
                        <ListGroupItem >
                            <Row>
                                <Col xs="3">
                                Breakfast
                                </Col>
                                <Col xs="9">
                                {data.breakfast}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem >
                            <Row>
                                <Col xs="3">
                                Lunch
                                </Col>
                                <Col xs="9">
                                {data.lunch}
                                </Col>
                            </Row>
                        </ListGroupItem>

                        <ListGroupItem >
                            <Row>
                                <Col xs="3">
                                Dinner
                                </Col>
                                <Col xs="9">
                                {data.dinner}
                                </Col>
                            </Row>
                        </ListGroupItem>
                                
                    </ListGroup>
                    
                </div>
            )
        }
    }
}
