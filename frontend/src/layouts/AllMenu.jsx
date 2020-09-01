import React, { Component } from 'react';
import getAllMenu from './../_services/dataService/allMenuService';
import Toast from './../components/toast/Toast';
import Box from './../components/box/Box';
import Spin from './../components/spinner/Spin';
import EveryDay from './../components/card/EveryDay';
import {Row, Col, CustomInput} from 'reactstrap';

export default class AllMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            veg_menu:[],
            status:true,
            non_veg_menu:[],
            disp_meal:[],
            loading:true,
            err_msg:'',
            label:"Veg",
            err:false,
        }
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount(){
        getAllMenu().then(res=>{
            console.log(res);
            if(res.status){
                this.setState({
                    veg_menu:res.veg,
                    non_veg_menu:res.non_veg
                }, ()=>{
                    if(this.state.status){  // veg food
                        this.setState({disp_meal:this.state.veg_menu}, ()=>{
                            this.setState({loading:false});
                        })
                    }
                    else{
                        this.setState({disp_meal:this.state.non_veg_menu}, ()=>{
                            this.setState({loading:false});
                        })
                    }  
                })
            }
            else{
                this.setState({err:true, err_msg:res.msg}, ()=>{
                    this.setState({loading:false})
                })
            }
        })
    }

    toggle(e){
        e.preventDefault()
        this.setState({
            loading:true
        }, () => {
            //console.log('BEFORE ',this.state.status);
            let l = this.state.status ? "Non-Veg": "Veg";
            this.setState({
                status: !this.state.status,
                label: l
            }, () => {
                //console.log('AFTER ', this.state.status);
                if(this.state.status){
                    this.setState({
                        disp_meal:this.state.veg_menu,
                    }, 
                    ()=>{
                        this.setState({loading:false})
                    })
                }
                else{
                    this.setState({
                        disp_meal:this.state.non_veg_menu
                    }, 
                    ()=>{
                        this.setState({loading:false})
                    })
                }
                this.setState({
                    loading:false
                })
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
            // console.log(this.state.disp_meal)
            return (
                <div className="container" style={{marginTop:"-30px"}}>
                    <Row className="container"> 
                        <Col className="">
                            {
                                this.state.status?
                                <CustomInput 
                                    color="dark" 
                                    checked={this.state.status} 
                                    type="switch" 
                                    id="veg_toggle" 
                                    name="customSwitch" 
                                    label={this.state.label} 
                                    onChange={this.toggle}
                                    valid
                                />
                                :
                                <CustomInput 
                                    color="dark" 
                                    checked={this.state.status} 
                                    type="switch" 
                                    id="veg_toggle" 
                                    name="customSwitch" 
                                    label={this.state.label} 
                                    onChange={this.toggle}
                                    invalid
                                />
                            }
                        </Col>
                    </Row>
                    <Box size="20px"/>
                    {
                        this.state.disp_meal.map((item, index)=>{
                            return(
                                <div>
                                <EveryDay data={item} key={index}/>
                                <Box size="20px"/>
                                </div>
                            )
                        })
                    }

                    
                    {
                        this.state.err?
                        <Toast msg={this.state.err_msg}/>
                        :
                        <div></div>
                    }
                </div>
            )
        }
    }
}
