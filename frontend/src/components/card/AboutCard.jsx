import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'reactstrap';


export default class AboutCard extends Component {
    
    render() {
        return (
            <div>
                <Card body inverse className="text-center" style={{ backgroundColor: '#333', borderColor: '#333' }}>
                    <CardTitle>{this.props.name}</CardTitle>
                    <CardText className="text-left">
                        {
                            this.props.about.map((item, index) => {
                                return(
                                <span key={index}>{item}<br/></span> 
                                )
                            })
                        }
                        
                    </CardText>
                </Card>
            </div>
        )
    }
}
