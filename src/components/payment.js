import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/payment.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {whichpage} from '../components/action';
import { connect } from 'react-redux';
import currencyFormatter from 'currency-formatter';

class Payment extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFetching:false,
            payments:[],
            searchpayments:[]
        }
        
    }
    componentDidMount(){
        let data = {page: 'payment'};
        this.props.dispatch(whichpage(data));
        this.getData();
        //alert(this.props.data.whichpage);
    }
    async getData() {
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/allpayments`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body: {}
        })
          .then(data => data.json())
          .then(data => {
              console.log(data);
              this.setState({isFetching:false});
              if(data.status == 'success'){
                  this.setState({payments:data.payments,searchpayments:data.payments});
                  this.setState({isFetching:false});
              }else{
                alert('Error getting Data');
              }
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <Top />
                    <div className="submain">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                            <p style={{fontSize:17,color:'#303030',fontWeight:'500'}}>Payment transactions : <span style={{color:'#B92368'}}>Last 7 days</span></p>
                        </div>
                        <div className="contentb">
                        </div>
                    </div>
                    <div className="maincontent2">
                         
                         <div className='tablewrapper'>
                         <table className='prodtable2'>
                            <tr>
                                <th>ORDER ID</th>
                                <th>AMOUNT</th>
                                <th>PAYMENT MODE</th>
                                <th>DATE</th>
                            </tr>
                            {
                                     this.state.searchpayments.map((payment) => 
                                     payment.status == 'success' &&
                            <tr>
                                
                                <td>{payment.order_id}</td>
                                <td>{currencyFormatter.format(payment.amount, { code: 'NGN' })}</td>
                                <td>Online</td>
                                <td>{payment.date_created}</td>
                                
                            </tr>
                            )}
                            
                            </table>
                            {
                                 this.state.isFetching == true &&
                                 <div style={{textAlign:"center",marginTop:50}}><i className="fa fa-spinner fa-spin" style={{fontSize:30,color:'#EC5198'}} /></div>
                             }
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
export default connect(mapStateToProps)(Payment);
