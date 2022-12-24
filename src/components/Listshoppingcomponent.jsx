import React, { Component } from 'react';
import Shoppingservice from '../Services/Shoppingservice';

class Listshoppingcomponent extends Component {
    constructor(props)
    {
        super(props)
        this.state ={
            shopping:[]

        }
       
    }
    componentDidMount(){
        Shoppingservice.getShopping().then((res)=>{
            this.setState({ shopping: res.data })
        }); 
    }
    
    render() {
        return (
            <div>
                <h2 className="text-center">Shopping Mall  </h2>
                <div className='row'>
                    <table className='table table-striped table-bordered'>
                        <thead>
                           <tr>
                            <th> Shop Id  </th>
                            <th> Shop Category </th>
                            <th> Shop Employee ID </th>
                            <th> Shop Name </th>
                            <th> Customers </th>
                            <th> Shop Status </th>
                            <th> Shop Owner </th>
                            <th> Lease Status </th>
                            <th> Actions</th>
                           </tr>

                        </thead>
                        <tbody>
                            {
                                this.state.shopping.map(
                                    shopping =>
                                    <tr key= { shopping.id}>
                                        <td>{shopping.shop_ID }</td>
                                        <td>{shopping.shop_Category }</td>
                                        <td> {shopping.shop_EmployeeID} </td>
                                        <td> {shopping.shop_Name} </td>
                                        <td> {shopping.customers} </td>
                                        <td> {shopping.shop_Status} </td>
                                        <td> {shopping.shop_Owner} </td>
                                        <td> {shopping.lease_Status} </td>
                                        
                                    </tr>
                                ) 
                            }
                        </tbody>
                    </table>
                     </div>

            </div>
        );
    }
}

export default Listshoppingcomponent;