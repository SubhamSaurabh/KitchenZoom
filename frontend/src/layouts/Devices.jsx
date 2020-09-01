import React, { Component } from 'react';
import {MDBContainer} from 'mdbreact';
import Range from './../components/slider/Range';
import ChartsPage from './../components/Charts/lineChart';
import getDataOf from './../_services/deviceService/getDeviceData';
import AboutCard from './../components/card/AboutCard';
import Box from './../components/box/Box';
import {shortdurations, longdurations, shortfrequency, longfrequency} from './../CONSTANTS/Durations/Duration';
import {getRangeData} from './../_services/dataService/importData';
import {Col, Row} from 'reactstrap';
import DropMenu from './../components/dropdown/DropMenu';
import Spin from './../components/spinner/Spin';
import Toast from './../components/toast/Toast';

import { connect } from 'react-redux';
import {setVeg, setMyDuration} from './../actions';

class Devices extends Component {
    constructor(props){
        super(props)
        this.state = {
            device_name: "",
            device_id: "",
            min: null,
            max: null,
            monitoring: false,
            currentValue: 0,
            location: "",
            about: [],
            Graphlabel: "",
            graphName: "",
            loading: false,
            init_data: {
                label:[],
                data:[]
            },
            error: false,
            err_msg: ''

        }
    }
    
    componentDidMount(){
        let name = this.props.history.location.pathname.split("/")
        name = name[2]+"/"+name[3]

        let r = getDataOf(name, this.props.devices);
        if(r===null)
        {
            this.setState({error:true, err_msg:"No such device!"})
            console.log("r is null")
            return;
        }
        console.log(r)
        this.setState({loading:true})
        this.setState({
            device_name: name,
            device_id:r.id,
            monitoring: r.monitoring,
            min: r.min_intensity,
            max: r.max_intensity,
            about: [r.desc],
            location: r.location,
            currentValue: r.cur_intensity,
            Graphlabel: r.desc,
            graphName: r.desc,
        })
        if(r.monitoring){
            getRangeData(r.id, this.props.duration, this.props.token).then(res=>{
                console.log(res)
                this.setState({
                    init_data: res
                })
            })
        }
        this.setState({loading:false})
        this.unlisten = this.props.history.listen((location, action) => {
            //console.log("on route change ", location);
            this.setState({loading:true})
            let name = this.props.history.location.pathname.split("/")
            name = name[2]+"/"+name[3]
            let r = getDataOf(name, this.props.devices);
            if(r===null)
            {
                this.setState({error:true, err_msg:"No such device!"})
                console.log("r is null")
                return
            }
            this.setState({
                device_name: name,
                device_id:r.id,
                min: r.min_intensity,
                max: r.max_intensity,
                monitoring: r.monitoring,
                about: [r.desc],
                location: r.location,
                currentValue: r.cur_intensity,
                Graphlabel: r.desc,
                graphName: r.desc,
            })
            if(r.monitoring){
                getRangeData(r.id, this.props.duration, this.props.token).then(res=>{
                    this.setState({
                        init_data: res
                    })
                })
            }
            this.setState({loading:false})
        });
        
    }


    componentWillReceiveProps(nextProps){
        //console.log("Recieve props", nextProps);
        this.setState({loading:true})
        if(this.state.monitoring){
            getRangeData(this.state.device_id, nextProps.duration, this.props.token).then(res=>{
                console.log(res);
                this.setState({
                    init_data: res
                })
            })
        }
        
        this.setState({loading:false})
    }

    componentWillMount(){
        
        
    }

    
    render() {
        //console.log(this.props.history.location.pathname)
        //const device_name = this.props.history.location.pathname.split("/")[2]
        const {device_name, min, max, currentValue, about, graphName } = this.state;
        const init_data = this.state.init_data;
        console.log("INSIDE DEVICES MONTIT:: ", this.state.monitoring)
        if(this.state.error){
            return <Toast msg={this.state.err_msg}/>
        }
        if(!this.state.monitoring){
            return (
                <MDBContainer>
                    <AboutCard about={about} name={this.state.device_name}/>
                    <Box size="50px" />
                    <AboutCard about={["Monitoring is off for this device"]} name={"No chart available"}/>
                    <Box size="50px" />
                    <Range
                    data = {{
                        device: device_name,
                        min: min,
                        max: max,
                        currentValue: currentValue
                    }}
                    />                    
                </MDBContainer>
            )
        }
        else{
            return (
                
                <MDBContainer>
                    <AboutCard about={about} name={this.state.device_name}/>
                    <Box size="50px" />
                    
                    <Row>
                        <Col md={8} sm={1}>
                        <h3>{graphName}</h3>
                        </Col>
                        <Col md={4} sm={11} >
                        <Row>
                            <Col className="text-right">
                            <DropMenu
                                shortdurations={shortfrequency}
                                longdurations={longfrequency}
                                icon="retweet"
                                purpose="refresh rate"
                                data={this.props.freq}
                            />
                            </Col>
                            <Col className="text-left" >
                            <DropMenu
                            shortdurations={shortdurations}
                            longdurations={longdurations}
                            icon="clock"
                            purpose="duration"
                            data={this.props.duration}
                            />
                            </Col>
                        </Row>
                        
                        </Col>
                    </Row>
                    {
                        this.state.loading?<div className="text-center"><Box size="75px" /><Spin size="lg" lastColor="dark"/><p>Loading Chart . . .</p><Box size="75px" /></div>:
                        <div>
                        <ChartsPage
                        my_freq={parseInt(this.props.freq)}
                        my_duration={parseInt(this.props.duration)}
                        init_data={init_data}
                        device_id={this.state.device_id}
                        />
                        <Box size="50px" />
                        <Range
                        data = {{
                            device: device_name,
                            min: min,
                            max: max,
                            currentValue: currentValue
                        }}
                        />
                        </div>
                    }
                    
                </MDBContainer>
            )
        }
    }
}


const mapStateToProps = ({freq, duration, token, devices }) => ({
    freq,
    duration,
    token,
    devices,
  })
  
  const mapDispatchToProps = (dispatch) => ({
    setFreq: (freq) => dispatch(setVeg(freq)),
    setMyDuration: (duration) => dispatch(setMyDuration(duration)),
  })
  
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Devices);