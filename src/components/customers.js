import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/customer.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {whichpage} from '../components/action';
import { connect } from 'react-redux';
import { eachcustomer } from '../components/action';

class Customer extends Component {
    constructor(props){
        super(props);
        this.state = {
            customers:[],
            siteurl:'http://localhost/CustomerApp/public',
            searchcustomers:[],
            isFetching:false

        }
    }
    componentDidMount(){

        let data = {page: 'customer'};
        this.props.dispatch(whichpage(data));
        this.getcustomers();
        //alert(this.props.data.whichpage);
    }
    async getcustomers(){
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/getcustomer`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body:{}
        })
          .then(data => data.json())
          .then(data => {
              console.log(data);
              this.setState({isFetching:false});
              this.setState({customers:data.customers,searchcustomers:data.customers});
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    getText = (val) => {
        let thisval  = val.target.value;
        let searchcustomers = [];
        for(let f  = 0; f < this.state.customers.length; f++){
            let index = this.state.customers[f].customer_name.toLowerCase().search(thisval.toLowerCase());
            
            if(index > -1){
                searchcustomers.push(this.state.customers[f]);
            }
        }
        this.setState({searchcustomers:searchcustomers});
        
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    view = (c) => {
        let data = {details: c};
        this.props.dispatch(eachcustomer(data));
        //console.log(this.props.data.products);
        this.props.history.push('/customerdetails');
    }
    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <Top />
                    
                    <div className="maincontentcustomer">
                         <div className="custitle">
                             <div className="columncus">
                                 <div style={{fontSize:15,fontWeight:500}}>show</div>
                                 <div><input type = "text" className ="" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                                 <div style={{fontSize:15,fontWeight:500}}>entries</div>
                             </div>
                             
                             <div className="columncus2">
                               <div style={{fontSize:15,fontWeight:500}}>search</div>
                               <div><input type = "text" onChange = {(text) => this.getText(text)} className ="" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                             </div>
                         </div>
                         <div className='tablewrapper2'>
                         {
                                this.state.isFetching == true &&
                                <div style={{textAlign:'center',width:'100%'}}><i className="fa fa-spinner fa-spin" style={{fontSize:30,color:'#118DE6',textAlign:'center'}} /></div>
                         }  
                         {   
                         this.state.searchcustomers.length > 0 &&      
                         <table className='prodtable2'>
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE NUMBER</th>
                                <th>UNIQUE ID</th>
                                <th>ORDERS</th>
                                <th>ACTIONS</th>
                            </tr>
                            {
                                this.state.searchcustomers.map((c)=>
                            <tr>
                                
                                <td>{c.customer_name}</td>
                                <td>{c.cutomer_email}</td>
                                <td>{c.customer_phone_number}</td>
                                <td>{c.unique_id}</td>
                                <td>20</td>
                                <td>
                                    <span>
                                    <FontAwesomeIcon icon={faEye} onClick = {() => this.view(c)} style={{position:'relative',zIndex:10,fontSize:25,color:'#DADADA',left:-5}}/>
                                    </span>
                                    
                                </td>
                            </tr>
                                )}
                            </table>
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
export default connect(mapStateToProps)(Customer);
