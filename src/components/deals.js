import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/product.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {whichpage} from '../components/action';
import { connect } from 'react-redux';
import { eachdeals } from '../components/action';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert';
import currencyFormatter from 'currency-formatter';

class Deals extends Component {
    constructor(props){
        super(props);
        this.state = {
            deals:[],
            siteurl:'http://localhost/CustomerApp/public',
            searchdeals:[],
            show:false,
            isFetching:false

        }
        this.adddeal = this.adddeal.bind(this);
        this.edit = this.edit.bind(this);
    }
    adddeal() {
        this.props.history.push('/adddeals');
    }
    componentDidMount(){
        this.getdeals();
        let data = {page: 'deals'};
        this.props.dispatch(whichpage(data));
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    edit = (prod) => {
        let data = {deals: prod};
        this.props.dispatch(eachdeals(data));
        //console.log(this.props.data.deals);
        this.props.history.push('/editdeal');
    }
    showdialog(id){
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              this.delete(id);  
            } else {
              
            }
          });
    }
    delete = async (id) => {
        await fetch(`${this.props.data.siteurl}/api/auth/deletedeal`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            },
            body: JSON.stringify({id:id})
        })
          .then(data => data.json())
          .then(data => {
              console.log(data);
              if(data.status == 'success'){
                  //alert("Data Deleted Successfully");
                  swal("Deleted! Your Data has been deleted!", {
                    icon: "success",
                  });
                  this.setState({deals:data.deals,searchdeals:data.deals});
              }
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    getText = (val) => {
        let thisval  = val.target.value;
        let searchdeal = [];
        for(let f  = 0; f < this.state.deals.length; f++){
            let index = this.state.deals[f].name.toLowerCase().search(thisval.toLowerCase());
            
            if(index > -1){
                searchdeal.push(this.state.deals[f]);
            }
        }
        this.setState({searchdeals:searchdeal});
        
    }
    async getdeals(){
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/deals`,{
            method:'GET',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.data.access_token}`
            }
        })
          .then(data => data.json())
          .then(data => {
              console.log(data);
              this.setState({isFetching:false});
              this.setState({deals:data.deals,searchdeals:data.deals});
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
                    <Top style={{marginTop:500}}/>
                    
                    <div className="submain">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                            <p style={{fontSize:19,fontWeight:'400'}}>TOTAL NUMBER OF DEALS</p>
                            <p style={{textAlign:'center',fontSize:17,color:'#303030',fontWeight:'600',marginTop:-2}}>500</p>
                        </div>
                        <div className="contentb">
                            <button type="submit" onClick = {this.adddeal} className="btn-product">Add New Deal</button>
                        </div>
                    </div>
                    <div className="maincontent1">
                         <div className="prodtitle1">
                             
                             <div className="prodcolumn2">
                                 <div>
                                     <select className="categories" style={{padding:10,width:'23vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option> Show all categories</option>
                                     </select>
                                 </div>
                                 <div>
                                     <select className="categories" style={{padding:10,width:'23vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option>show status</option>
                                     </select>
                                 </div>
                             </div>
                             <div className="prodcolumn3">
                               <div style={{fontSize:15,fontWeight:500}}>search</div>
                               <div><input onChange = {(text) => this.getText(text)} type = "text" className ="" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                             </div>
                         </div>
                         <div style={{textAlign:'center'}}>
                            {
                                this.state.isFetching == false && this.state.searchdeals.length == 0 &&
                                    <h5>No Deals Added Yet</h5>
                            }
                         </div>
                         <div className='tablewrapper'>
                         {
                                this.state.isFetching == true &&
                                <div style={{textAlign:'center',width:'100%'}}><i className="fa fa-spinner fa-spin" style={{fontSize:30,color:'#118DE6',textAlign:'center'}} /></div>
                         }  
                         {  
                          this.state.searchdeals.length > 0 &&   
                         <table className='prodtable'>
                            <tr className='prodtr'>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Category</th>
                                <th>Price (NGN)</th>
                                <th>New Price (NGN)</th>
                                <th>Discount (%)</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            
                            {
                                this.state.searchdeals.map((prod)=>
                                        <tr className='prodtr'>
                                        <td>
                                         <img src={this.props.data.siteurl+'/public/images/'+prod.picture.split('|')[0]} style={{width:60,height:60}}/>
                                        </td>
                                        <td style={{textTransform:"capitalize"}}>{prod.name}</td>
                                        <td>{prod.stock}</td>
                                        <td>{prod.category}</td>
                                        <td> {currencyFormatter.format(prod.price, { code: 'NGN' })}</td>
                                        <td>{currencyFormatter.format(prod.newprice, { code: 'NGN' })}</td>
                                        <td>{prod.discount}</td>
                                        <td>{prod.date_deal_created}</td>
                                        <td>
                                            <span style={{padding:3,borderRadius:5,margin:2}}>
                                            <FontAwesomeIcon onClick = {() => this.showdialog(prod.id)} icon={faTrash} style={{position:'relative',zIndex:10,color:'red',left:2}}/>
                                            </span>
                                            
                                        </td>
                                    </tr>
                                )
                            }
                            
                            
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
export default connect(mapStateToProps)(Deals);

