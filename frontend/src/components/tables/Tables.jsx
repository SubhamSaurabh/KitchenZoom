import React from 'react';
import { Table } from 'reactstrap';
import Switch from './../toggle/Switch';
import {Link} from 'react-router-dom';

const MyTable = (props) => {
  return (
    <Table dark responsive={true}>
      <thead>
        <tr>
          <th className="text-center">Name</th>
          <th className="text-center">Location</th>
          <th className="text-center">Status</th>
        </tr>
      </thead>
      <tbody>
          {
              props.devices.map((item, index) => {
                  return (
                    <tr key={index}>
                        <td className="text-center"><Link to={`/devices/${item.name}`}><span className="text-white">{item.name}</span></Link></td>
                        <td className="text-center">{item.location}</td>
                        <td className="text-center"><Switch name={item.name} status={item.status}/></td>
                    </tr>
                  )
              })
          }
        
      </tbody>
    </Table>
  );
}

export default MyTable;