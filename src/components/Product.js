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
import { eachproducts } from '../components/action';
import SweetAlert from 'sweetalert2-react';
import swal from 'sweetalert';
import currencyFormatter from 'currency-formatter';

class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[],
            siteurl:'http://localhost/CustomerApp/public',
            searchproducts:[],
            show:false,
            isFetching:false,
            isSubmitting:false,
            count:0,
            features:[]

        }
        this.addproduct = this.addproduct.bind(this);
        this.edit = this.edit.bind(this);
    }
    addproduct() {
        this.props.history.push('/addproduct');
    }
    componentDidMount(){
        this.getproducts();
        let data = {page: 'product'};
        this.props.dispatch(whichpage(data));
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    edit = (prod) => {
        let data = {products: prod};
        this.props.dispatch(eachproducts(data));
        //console.log(this.props.data.products);
        this.props.history.push('/editproduct');
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
        await fetch(`${this.props.data.siteurl}/api/auth/deleteproduct`,{
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
                  swal("Poof! Your Data has been deleted!", {
                    icon: "success",
                  });
                  this.setState({products:data.products,searchproducts:data.products});
              }
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    getCategory = (val) => {
        let thisval  = val.target.value;
        let searchproduct = [];
        for(let f  = 0; f < this.state.products.length; f++){
            let index = this.state.products[f].category.toLowerCase().search(thisval.toLowerCase());
            
            if(index > -1){
                searchproduct.push(this.state.products[f]);
            }
        }
        this.setState({searchproducts:searchproduct});
        
    }
    getStatus = (val) => {
        alert(val.target.value);
        let thisval  = val.target.value;
        let searchproduct = [];
        for(let f  = 0; f < this.state.products.length; f++){
            if(parseInt(this.state.products[f].unit_left) > 0 && thisval == this.state.products[f].stock){
                searchproduct.push(this.state.products[f]);
            }
        }
        this.setState({searchproducts:searchproduct});
        
    }
    getText = (val) => {
        let thisval  = val.target.value;
        let searchproduct = [];
        for(let f  = 0; f < this.state.products.length; f++){
            let index = this.state.products[f].name.toLowerCase().search(thisval.toLowerCase());
            
            if(index > -1){
                searchproduct.push(this.state.products[f]);
            }
        }
        this.setState({searchproducts:searchproduct});
        
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
    featured = async (prod) =>{
        //alert(prod.featured);
        if(prod.featured == '' || prod.featured == null || prod.featured == 'null'){       
            prod.featured = '1';
            let count = this.state.count + 1;
            this.setState({count:count});
            let features = this.state.searchproducts;
            let index = features.findIndex(x => x.id === prod.id);
            features[index].featured = "1";
            await this.setState({searchproducts:features});
            console.log(this.state.searchproducts);
        }else{
            let count = this.state.count - 1;
            this.setState({count:count});
            let features = this.state.searchproducts;
            let index = features.findIndex(x => x.id === prod.id);
            features[index].featured = "";
            await this.setState({searchproducts:features});
            console.log(this.state.searchproducts);
        }
        //console.log(prod);
    }
    submitData = async () =>{
        let id = '';
        let feat = '';
        this.state.searchproducts.forEach((feature) => {
            if(id == '') {id += feature.id; feat += feature.featured;}
            else {id += ';'+feature.id; feat += ';'+feature.featured}  
       });
       
       if(this.state.count == 0){
        swal("Oops!", "No Product is Selected", "error");
        return false;
       }

       let data = new FormData();
       data.append('id',id);
       data.append('feat',feat);
       this.setState({isSubmitting:true});
        await fetch(`${this.props.data.siteurl}/api/auth/addfeatures`,{
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
              this.setState({isSubmitting:false});
              if(data.status == 'success'){
                  alert('Data saved successfully');
                  this.setState({isFetching:false});
                  this.setState({count:0});
                  this.setState({prodtname:'',price:'',quantity:'',desc:'',category:'',files:[], selectcate :''});
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
                    <Top style={{marginTop:500}}/>
                    
                    <div className="submain">
                        <div className="contenta" style={{color:'#969696',fontSize:13}}>
                            <p style={{fontSize:19,fontWeight:'400'}}>TOTAL NUMBER OF PRODUCTS</p>
                            <p style={{textAlign:'center',fontSize:17,color:'#303030',fontWeight:'600',marginTop:-2}}>500</p>
                        </div>
                        <div className="contentb">
                            <button type="submit" onClick = {this.addproduct} className="btn-product">Add New Product</button>
                        </div>
                    </div>
                    <div className="maincontent1">
                         <div className="prodtitle1">
                             
                             <div className="prodcolumn2">
                                 <div>
                                     <select onChange = {(text) => this.getCategory(text)} className="categories" style={{padding:10,width:'24vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option value=''> Show all categories</option>
                                         <option value='0-3years'>0-3 years</option>
                                         <option value='4-6years'>4-6 years</option>
                                         <option value='7-9years'>7-9 years</option>
                                         <option value='11-12years'>10-12 years</option>
                                     </select>
                                 </div>
                                 <div>
                                     <select onChange = {(text) => this.getStatus(text)} className="categories" style={{padding:10,width:'23vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option>show status</option>
                                         <option value ='In Stock'>In Stock</option>
                                         <option value = 'Out of Stock'>Out of Stock</option>
                                     </select>
                                 </div>
                             </div>
                             <div className="prodcolumn3">
                               <div style={{fontSize:15,fontWeight:500}}>search</div>
                               <div><input onChange = {(text) => this.getText(text)} type = "text" className ="" style={{padding:10,width:'20vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                             </div>
                         </div>
                         <div className='tablewrapper'>
                         {
                                this.state.isFetching == true &&
                                <div style={{textAlign:'center',width:'100%'}}><i className="fa fa-spinner fa-spin" style={{fontSize:30,color:'#118DE6',textAlign:'center'}} /></div>
                         }  
                         {  
                          this.state.searchproducts.length > 0 &&   
                         <table className='prodtable'>
                            <tr className='prodtr'>
                                <th>Picture</th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Unit left</th>
                                <th>Featured Product</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            
                            {
                                this.state.searchproducts.map((prod)=>
                                        <tr className='prodtr'>
                                        <td>
                                         <img src={this.props.data.siteurl+'/public/images/'+prod.picture.split('|')[0]} style={{width:60,height:60}}/>
                                        </td>
                                        <td style={{textTransform:"capitalize"}}>{prod.name}</td>
                                        <td>
                                          {
                                              prod.stock == 'In Stock' &&
                                              <span style={{color:'#027222'}}>{prod.stock}</span>
                                          }
                                          {
                                              prod.stock !== 'In Stock' &&
                                              <span style ={{color:'#c10f0f'}}>{prod.stock}</span>
                                          }
                                        </td>
                                        <td>{currencyFormatter.format(prod.price, { code: 'NGN' })}</td>
                                        <td>{prod.category}</td>
                                        <td>{prod.unit_left}</td>
                                        <td>
                                        {
                                             prod.featured == '1' ?
                                             (<p onClick = {() => this.featured(prod)} style={{display:'inline-block',position:'relative',zIndex:10,backgroundColor:'#EC5198',color:'#EC5198',borderRadius:3,border: '2px solid #EC5198',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>):
                                             (<p onClick = {() => this.featured(prod)} style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>)
                                         }
                                        </td>
                                        <td>{prod.date_created}</td>
                                        <td>
                                            <span>
                                            <FontAwesomeIcon onClick = {() => this.edit(prod)} icon={faEdit} style={{position:'relative',zIndex:10,color:'#DADADA',left:-5}}/>
                                            </span>
                                            <span>
                                            <FontAwesomeIcon onClick = {() => this.showdialog(prod.id)} icon={faTrash} style={{position:'relative',zIndex:10,color:'#EC5198'}}/>
                                            </span>
                                        </td>
                                    </tr>
                                    
                                )
                            }
                            <tr className='prodtr'>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                        <button onClick = {this.submitData} type="submit" className="btn-productbtn" style={{width:200,backgroundColor:'#EC5198',paddingLeft:20,paddingRight:20}}>
                                            {
                                                this.state.isSubmitting == true &&
                                                <i className="fa fa-spinner fa-spin" style={{fontSize:20,color:'#fff'}} />
                                            }
                                            {
                                                this.state.isSubmitting == false && <span style={{fontSize:15}}>Add Featured Product</span>
                                            } 
                                            </button>
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                            
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
export default connect(mapStateToProps)(Product);

