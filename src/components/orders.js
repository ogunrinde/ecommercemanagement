import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/orders.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {whichpage,allorders,orderdetails} from '../components/action';
import { connect } from 'react-redux';

class Orders extends Component {
    constructor(props){
        super(props);
        this.state ={
            siteurl:'http://localhost/CustomerApp/public',
            orders:[],
            searchorders:[],
            isFetching:false
        }
        
    }
    componentDidMount(){
        let data = {page: 'orders'};
        this.props.dispatch(whichpage(data));
        this.getData();
        //alert(this.props.data.whichpage);
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    orderDetails = async (data) => {
        //this.props.history.push('/dashboard');
        await this.props.dispatch(orderdetails(data));
        //console.log(this.props.data.orderdetails);
        this.props.history.push('/order_expand');
        //this.props.history.push('/');
    }
    async getData() {
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/allorders`,{
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
                  //alert('Data saved successfully');
                  this.props.dispatch(allorders(data));
                  this.setState({orders:data.orders,searchorders:data.orders});
                  this.setState({isFetching:false});
              }else{
                alert('Error getting Data');
              }
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    getProductDate = (val) => {
        let thisval = val.target.value;
        let searchorder = [];
       for(let r  = 0; r < this.props.data.orders.length; r++){
           if(thisval == '7days'){
               let dt = new Date();
               dt.setDate( dt.getDate() - 7 );
               let datepurchase = new Date("31-12-2019");
               //datepurchase.setDate(datepurchase.getDate());
               console.log(datepurchase,dt,this.props.data.orders[r].date_created);
               if(datepurchase.getTime() >= dt.getTime())
                    searchorder.push(this.props.data.orders[r]);
           }else if(thisval == '30days'){
            let dt = new Date();
            dt.setDate( dt.getDate() - 30 );
            let now =  new Date();
            now.setDate( now.getDate());
            let datepurchase = new Date(this.state.orders[r].date_created);
            datepurchase.setDate(datepurchase.getDate());
            if(datepurchase.getTime() >= dt.getTime())
               searchorder.push(this.state.orders[r]);
          }else if(thisval == '6months'){
            let dt = new Date();
            dt.setDate( dt.getDate() - 180 );
            let now =  new Date();
            now.setDate( now.getDate());
            let datepurchase = new Date(this.state.orders[r].date_created);
            datepurchase.setDate(datepurchase.getDate());
            if(datepurchase.getTime() >= dt.getTime())
               searchorder.push(this.state.orders[r]);
        }
        
        }
        this.setState({searchorders:searchorder});
    }
    getStatus = (val) => {
        //alert(val.target.value);
        let thisval  = val.target.value;
        let searchorder = [];
        for(let f  = 0; f < this.state.orders.length; f++){
            if(thisval == this.state.orders[f].status){
                searchorder.push(this.state.orders[f]);
            }
        }
        this.setState({searchorders:searchorder});
        
    }
    getText = (val) => {
        let thisval  = val.target.value;
        let searchorder = [];
        for(let f  = 0; f < this.state.orders.length; f++){
            let index = this.state.orders[f].name.toLowerCase().search(thisval.toLowerCase());
            
            if(index > -1){
                searchorder.push(this.state.orders[f]);
            }
        }
        this.setState({searchorders:searchorder});
        
    }

    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <Top />
                    <div className="maincontent4">
                        <div className="ordtitle">
                             <div className="prodcolumn1">
                                    <select onChange = {(text) => this.getStatus(text)} className="categories" style={{padding:10,width:'22vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option>Show status</option>
                                         <option value = 'Processing'>Processing</option>
                                         <option value = 'Shipped'>Shipped</option>
                                         <option value= 'Delivered'>Delivered</option>
                                         <option value= 'Canceled'>Canceled</option>
                                     </select>
                             </div>
                             <div className="prodcolumn2">
                                 {
                                 <div>
                                     <select onChange = {(text) => this.getProductDate(text)} className="categories" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option value =''>Choose date range</option>
                                         <option value ='7days'>Last 7 days</option>
                                         <option value ='30days'>Last 30 days</option>
                                         <option value ='6months'>Last 6 months</option>
                                     </select>
                                 </div>
                                 }
                                 <div>
                                     
                                 </div>
                             </div>
                             <div className="prodcolumn3">
                               <div style={{fontSize:15,fontWeight:500}}>search</div>
                               <div><input onChange = {(text) => this.getText(text)} type = "text" className ="" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                             </div>
                         </div>
                         <div className='tablewrapper'>
                             {
                                 this.state.orders.length > 0 &&
                                 <table className='prodtable'>
                                 <tr>
                                     <th><p style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',top:0,width:15,height:15}}></p></th>
                                     <th>ORDER BY</th>
                                     <th>ORDER ID</th>
                                     <th>PAYMENT TYPE</th>
                                     <th>STATUS</th>
                                     <th>DATE</th>
                                     <th>ACTION</th>
                                 </tr>
                                 {
                                     this.state.searchorders.map((order) => 
                                     <tr>
                                        <td><p style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',top:0,width:15,height:15}}></p></td>
                                        <td>{order.name}</td>
                                        <td>{order.order_id}</td>
                                        <td>Online</td>
                                        <td>{order.status}</td>
                                        <td>{order.date_created}</td>
                                        <td onClick={()=>this.orderDetails(order)}>
                                            <span>
                                            <FontAwesomeIcon icon={faEye} style={{position:'relative',zIndex:10,color:'#DADADA',left:-5,fontSize:25}}/>
                                            </span>
                                            
                                        </td>
                                     </tr>
                                     )
                                 }
                                 
                                 
                                 </table>
                             }
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
export default connect(mapStateToProps)(Orders);
