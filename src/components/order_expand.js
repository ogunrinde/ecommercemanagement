import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/order_expand.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import OrderTop from '../components/order_top';
import {connect} from 'react-redux';
import currencyFormatter from 'currency-formatter';

class OrderExpand extends Component {
    constructor(props){
        super(props);
        this.state = {
            status:'Processing',
            isFetching:false,
            price:0
        }
        this.submitdata = this.submitdata.bind(this);
    }
    componentDidMount(){
     let price = 0;   
     if(Object.keys(this.props.data.orderdetails).length  == 0){ this.props.history.push('orders'); return false;}
     for(let r  = 0;  r < this.props.data.orders.length; r++){
         if(this.props.data.orders[r].order_id == this.props.data.orderdetails.order_id){
             price = price + parseFloat(this.props.data.orders[r].price);
         }
     }
     this.setState({price:price});
    }
    submitdata = async () => {
        let dat = new FormData();
        this.setState({isFetching:true});
        dat.append('status',this.state.status);
        dat.append('order_id',this.props.data.orderdetails.order_id);
        await fetch(`${this.props.data.siteurl}/api/auth/updateorder`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body: dat
        })
          .then(d => d.json())
          .then(d => {
              console.log(d);
              this.setState({isFetching:false});
              if(d.status == 'success'){
                  alert('Data saved successfully');
                  
              }else{
                alert('Error saving data, try again later');
              }
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <OrderTop />
                    <div className="submain16">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                            <p style={{fontWeight:500,fontSize:15}}>Order Date</p>
                            <p style={{textAlign:'center',fontSize:18,color:'#303030',fontWeight:500,marginTop:15}}>{this.props.data.orderdetails.date_created}</p>
                        </div>
                        <div className="contenta" style={{color:'#969696',fontSize:13,textAlign:'center'}}>
                            <p style={{fontWeight:500,fontSize:15}}>ORDER STATUS</p>
                            <div style={{textAlign:'center',fontSize:17,color:'#303030',fontWeight:'600',marginTop:-2}}>
                                <span>
                                        <select onChange = {(text) => this.setState({status:text.target.value})} className="categories" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                            <option value = 'Processing'>Processing</option>
                                            <option value = 'Shipped'>Shipped</option>
                                            <option value = 'Delivered'>Delivered</option>
                                        </select>
                                </span>
                                <span>
                                   <button onClick = {this.submitdata} type="submit" style={{width:'20vh',padding:11}} className="btn-product">
                                       {
                                           this.state.isFetching == false && <span>Update</span>
                                       }
                                       {
                                           this.state.isFetching == true &&  <i className="fa fa-spinner fa-spin" style={{fontSize:20,color:'#fff'}} />

                                       }
                                   </button>
                                </span>
                            </div>
                            
                            
                        </div>
                        <div className="contentb" style={{color:'#969696',fontSize:13}}>
                            <div className="contenta" style={{color:'#969696',fontSize:13}}>
                                <p style={{fontWeight:500,fontSize:15}}>PAYMENT TYPE</p>
                                <p style={{textAlign:'center',fontSize:18,color:'#303030',fontWeight:500,marginTop:15}}>Online</p>
                            </div>
                        </div>
                    </div>
                    <div className="submain2">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                             <p style={{fontWeight:500,fontSize:18}}>Customer Details</p>
                             <div>
                                 <div style={{textAlign:"left",marginLeft:'20%'}}>
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            FullName:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                          {this.props.data.orderdetails.name}
                                        </p>
                                     </div>
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            Email Address:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                        {this.props.data.orderdetails.email}
                                        </p>
                                     </div>
                                      
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            Unique ID:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                        {this.props.data.orderdetails.order_id}
                                        </p>
                                     </div>
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            Phone Number:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                          {this.props.data.orderdetails.phone_number}
                                        </p>
                                     </div>
                                 </div>
                             </div>
                        </div>
                        <div className="contenta" style={{color:'#969696',fontSize:13,textAlign:'center'}}>
                             <p style={{fontWeight:500,fontSize:15}}>Shipping Details</p>
                             <div>
                                 <div style={{textAlign:"left",marginLeft:'20%'}}>
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            Address:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                          {this.props.data.orderdetails.address}
                                        </p>
                                     </div>
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            State:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                        {this.props.data.orderdetails.state}
                                        </p>
                                     </div>
                                      
                                     <div style={{marginTop:-10}}>
                                        <p style={{display:'inline-block', width:'40%',fontSize:15,fontWeight:500}}>
                                            Country:
                                        </p>
                                        <p style={{display:'inline-block',width:'60%',color:'#303030',fontSize:15,fontWeight:500}}>
                                        {this.props.data.orderdetails.country}
                                        </p>
                                     </div>
                                     
                                 </div>
                             </div>
                        </div>
                        
                    </div>
                    <div className="maincontentorder">
                        
                         <div>
                         <table>
                            <tr style={{backgroundColor:'#B92368',color:"#fff",padding:15}}>
                                <th>ITEM</th>
                                <th>QUANTITY</th>
                                <th>COST</th>
                                <th>TOTAL</th>
                            </tr>
                            {
                                this.props.data.orders.map((order) =>
                                   order.order_id == this.props.data.orderdetails.order_id &&
                                    <tr>
                                        <td>{order.item_name}</td>
                                        <td>{order.quantity}</td>
                                        <td>{currencyFormatter.format(parseFloat(order.price) / parseFloat(order.quantity), { code: 'NGN' })}</td>
                                        <td>{currencyFormatter.format(order.price, { code: 'NGN' })}</td>
                                        
                                    </tr>
                                )
                            }
                            <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>{currencyFormatter.format(this.state.price, { code: 'NGN' })}</td>
                                        
                                    </tr>
                            
                            </table>
                         </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        data: state.DataReducer
    }
}
export default connect(mapStateToProps)(OrderExpand);

