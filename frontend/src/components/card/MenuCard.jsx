import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap';

export default class MenuCard extends Component {
    render() {
        const general_menu = this.props.data;
        var today = new Date()
        today.setDate(today.getDate() + 1)
        const tom = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
        //console.log(tom);
        return (
            <div className="container">
            <ListGroup >
                <ListGroupItem  style={{backgroundColor:'black', color: "white"}} action>
                    <span style={{marginRight:"20px"}}>{tom}</span>
                    ({general_menu[0].day})
                </ListGroupItem>
                {
                    general_menu.map((item, index)=> {
                        return (
                            <ListGroupItem style={{fontSize:"12px"}}  action key={index}>
                                <Row>
                                    <Col xs="3">
                                    
                                    <strong>{`${item.time[0].toLocaleUpperCase()}${item.time.slice(1)}`}</strong>
                                    </Col>
                                    <Col xs="9">
                                    {item.items}
                                    </Col>
                                </Row>
                            </ListGroupItem>
                        )
                    })
                }
                
                
            </ListGroup>
            </div>
        )
    }
}
