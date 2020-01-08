import React, { Component } from 'react';
import './css/adddeals.css';
import Sidebar from './sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import Top from './top';
import {connect} from 'react-redux';

class AddDeals extends Component {
    constructor(props){
        super(props);
        this.state = {
            newprice:'',
            products:[],
            id:'',
            price:'',
            searchproducts:[],
            siteurl:'http://localhost/CustomerApp/public'
        }
        this.submitData = this.submitData.bind(this);
        this.getproductselected = this.getproductselected.bind(this);
        //this.filefolder = this.filefolder.bind(this);
    }
    componentDidMount(){
        //this.getproducts();
        //this.getproducts();
        //alert(this.props.data.access_token);
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        this.getproducts();
        if(status == false) this.props.history.push('/');
    }
    
    async getproducts(){
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/products`,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            }
        })
          .then(data => data.json())
          .then(data => {
              this.setState({isFetching:false});
              this.setState({products:data.products,searchproducts:data.products});
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    async submitData(e) {
        e.preventDefault();
        let data = new FormData();
        //alert(this.state.prodtname);
        if(this.state.newprice === ''){
            alert('New Price is Unknown');
            return false;
        }
        if(this.state.id === ''){
            alert('Product Name is Unknown');
            return false;
        }
        //calcalute discount
        let discount = (parseFloat(this.state.price) - parseFloat(this.state.newprice)) / parseFloat(this.state.price);
        let dpercent = discount * 100;
        this.setState({isFetching:true});
        data.append('id',this.state.id);
        data.append('discount',parseInt(dpercent));
        data.append('newprice',this.state.newprice);
        
        await fetch(`${this.props.data.siteurl}/api/auth/adddeals`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body: data
        })
          .then(data => data.json())
          .then(data => {
              console.log(data);
              if(data.status == 'success'){
                  alert('Data saved successfully');
                  this.setState({isFetching:false});
                  this.setState({id:'',price:'',newprice:''});
              }else{
                alert('Error saving data, try again later');
              }
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    getproductselected = (e) =>{
        for(let r = 0; r < this.state.products.length; r++){
            if(e.target.value == this.state.products[r].id) this.setState({price:this.state.products[r].price});
            this.setState({id:e.target.value});
        }
    }
    render() {
        return (
            <div className="wrapper">
                <div className = "sidebar">
                    <Sidebar />
                </div>
                <div className = "main">
                    <Top />
                    
                    <div className="submainprod">
                        <div className="contenta" style={{color:'#969696',fontSize:13,fontWeight:600}}>
                            <p style={{marginRight:10, fontSize:17}}><span style={{marginRight:10, fontSize:30}}>&#x2190;</span> ADD DEALS</p>
                        </div>
                        <div className="contentb">
                            
                        </div>
                    </div>
                    <div className="maincontentdeal">
                         <div className="prodtitle">
                             <div className="column1">
                                 <div>
                                    <label style={{fontSize:14,fontWeight:500}}>Product Name</label>
                                    <div>
                                        <select value = {this.state.id} style={{padding:10,width:'100%',border: '1px solid #CCCCCC',borderRadius: 3}} onChange = {event => this.getproductselected(event)}>
                                            <option value =""></option>
                                            {
                                                this.state.products.map((p)=>
                                                <option value ={p.id}>{p.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                 </div>
                                 <div  style={{marginTop:20}}>
                                    <label style={{fontSize:14,fontWeight:500}}>Old Price</label>
                                    <div>
                                      <input value = {this.state.price} onChange = {event => this.setState({price:event.target.value})} type = "number" className ="" style={{padding:10,width:'96.1%',border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>

                                 </div>
                                 <div  style={{marginTop:20}}>
                                    <label style={{fontSize:14,fontWeight:500}}>New Price</label>
                                    <div>
                                      <input value = {this.state.newprice} onChange = {event => this.setState({newprice:event.target.value})} type = "number" className ="" style={{padding:10,width:'96.1%',border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>

                                 </div>  
                                 <div  style={{marginTop:20}}>
                                    <button onClick = {this.submitData} type="submit" className="btn-productbtn" style={{backgroundColor:'#EC5198',fontSize:15}}>
                                    {
                                        this.state.isFetching == true &&
                                        <i className="fa fa-spinner fa-spin" style={{fontSize:20,color:'#fff'}} />
                                    }
                                    {
                                        this.state.isFetching == false && <span>Submit</span>
                                    } 
                                    </button>  
                                  </div>   
                         </div>
                         
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
export default connect(mapStateToProps)(AddDeals);

