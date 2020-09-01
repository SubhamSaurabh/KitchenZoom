import React, { Component } from 'react';
import { Table } from 'reactstrap';
import MyInput from './../input/MyInput';



class EditTable extends Component{


    render(){
        return (
            <Table dark responsive={true}>
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Port no</th>
                </tr>
              </thead>
              <tbody>
                  {
                      this.props.devices.map((item, index) => {
                          return (
                            <tr key={index}>
                                <td className="text-center" onClick={this.handleEdit} name={item.name}>
                                    <div style={{paddingLeft:"10px", paddingRight:"10px"}}><MyInput name={item.name} id={item.id}/></div>
                                </td>
                                <td className="text-center">{item.port}</td>
                            </tr>
                          )
                      })
                  }
                
              </tbody>
            </Table>
          );
    }
  
}

export default EditTable;