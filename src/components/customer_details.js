import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/customer_details.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {connect} from 'react-redux';

class CustomerDetails extends Component {
    componentDidMount(){
        //let data = {page: 'customer'};
        //this.props.dispatch(whichpage(data));
    }
    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <Top />
                    <div className="submain4">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                            <p style={{fontSize:'1.2em',fontWeight:'500'}}>{this.props.data.customerdetails.customer_name}</p>
                        </div>
                        <div className="contentb" style={{color:'#969696',fontSize:13}}>
                                <p style={{fontSize:'1.2em',fontWeight:'500',color:'#118DE6'}}>{this.props.data.customerdetails.unique_id}</p>
                        </div>
                    </div>
                    <div className="submain12">
                        <div className="contentc" style={{color:'#969696',fontSize:13}}>
                             <p style={{position:'relative',fontWeight:500,top:-10,fontSize:20,color:'#fff',zIndex:4,left:225}}>N 14000</p>
                             <p style={{position:'relative',fontWeight:400,top:90,fontSize:17,color:'#fff',zIndex:4,left:150}}>Amount Spent</p>
                             <img src={require('../components/assets/img2.png')} style={{width:'50%',height:170}}/>
                        </div>
                        <div className="contentb" style={{color:'#969696',fontSize:13}}>
                             <p style={{position:'absolute',fontWeight:500,top:'28%',fontSize:20,color:'#fff',zIndex:4,left:'60vw'}}>10</p>
                             <p style={{position:'absolute',fontWeight:400,top:'43%',fontSize:17,color:'#fff',zIndex:4,left:'60vw'}}>Orders</p>
                             <img src={require('../components/assets/img22.png')} style={{width:'50%',height:170}}/>
                        </div>
                        
                    </div>
                    <div className="maincontent10">
                        
                         <div>
                         <table className='customerOrder'>
                            <tr style={{color:"#9F9F9F"}}>
                                <th>ORDER</th>
                                <th>ORDER ID</th>
                                <th>PRICE</th>
                                <th>STATUS</th>
                                <th>DATE</th>
                            </tr>
                            <tr>
                                <td>Toy Cars</td>
                                <td>In Stock</td>
                                <td>N 2,000</td>
                                <td>Category</td>
                                
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td style={{color:'#118DE6',fontSize:10}}>Gift wrappings : 0</td>
                                <td style={{color:'#118DE6', fontSize:10}}>Gift Certificate: 0</td>
                                
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
export default connect(mapStateToProps)(CustomerDetails);

