import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/addproduct.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import { connect } from 'react-redux';
import {whichpage} from '../components/action';

class EditProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            prodtname:'',
            price:'',
            quantity:'',
            desc:'',
            gender:'',
            category:'',
            isFetching:false,
            selectcate:'',
            gender:'',
            files:[],
            siteurl:'http://localhost/CustomerApp/public'
        }
        this.submitData = this.submitData.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    componentDidMount(){
        if(this.props.data.products.name == '') this.props.history.push('/product');
        let data = {page: 'product'};
        this.props.dispatch(whichpage(data));
        this.setState({
            prodtname:this.props.data.products.name,
            price: this.props.data.products.price,
            quantity: this.props.data.products.stock,
            gender: this.props.data.products.gender,
            category:this.props.data.products.category,
            desc:this.props.data.products.description,
            selectcate:this.props.data.products.category,
            oldimages:this.props.data.products.picture,
            id:this.props.data.products.id
        })
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    selectCategory(val){
        this.setState({selectcate:val,category:val});
        //alert(val);
       }
       onChangeHandler(event) {
        if(this.state.files.length == 3){
            alert("You have added 3 images already");
            return false;
        }
        let file = event.target.files[0];
        let allfiles = this.state.files;
        allfiles.push(file);
        this.setState({files:allfiles});
        //console.log(this.state.files);
     }
    async submitData(e) {
        e.preventDefault();
        let data = new FormData();
        if(this.state.prodtname === ''){
            alert('Product name is Unknown');
            return false;
        }
        if(this.state.price === ''){
            alert('Product cost is Unknown');
            return false;
        }
        if(this.state.quantity === ''){
            alert('Product quantity is Unknown');
            return false;
        }
        
        if(this.state.desc === ''){
            alert('Product description is Unknown');
            return false;
        }
        if(this.state.category === ''){
            alert('Product Category is Unknown');
            return false;
        }
        if(this.state.gender === ''){
            alert('Gender is Unknown');
            return false;
        }
        data.append('id',this.state.id);
        data.append('productname',this.state.prodtname);
        data.append('price',this.state.price);
        data.append('quantity',this.state.quantity);
        data.append('description',this.state.desc);
        data.append('category',this.state.category);
        data.append('gender',this.state.gender);
        data.append('oldimages',this.state.oldimages);
        this.state.files.forEach((image_file) => {
            data.append('images[]', image_file);
       }); 
       this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/editproduct`,{
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
              this.setState({isFetching:false});
              if(data.status == 'success'){
                  alert('Data saved successfully');
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
                    <Top />
                    
                    <div className="submainprod">
                        <div className="contenta" style={{color:'#969696',fontSize:13,fontWeight:600}}>
                            <p><span style={{marginRight:10, fontSize:20,fontWeight:500}}>&#8592;</span> EDIT PRODUCT</p>
                        </div>
                        <div className="contentb">
                            
                            <button onClick = {this.submitData} type="submit" className="btn-productbtn">    
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
                    <div className="maincontent">
                         <div className="prodtitle">
                             <div className="column1">
                                 <div style={{fontSize:14,fontWeight:500}}>Product Name</div>
                                 <div><input value = {this.state.prodtname} onChange = {event => this.setState({prodtname:event.target.value})} type = "text" className ="" style={{padding:10,width:'96%',border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                                 <div className="sublist">
                                     <div>
                                       <div style={{fontSize:14,fontWeight:500}}>Price</div>
                                       <div><input value = {this.state.price} onChange = {event => this.setState({price:event.target.value})} type = "number" className ="" style={{padding:10,width:'95%',border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                                     </div>
                                     <div>
                                       <div style={{fontSize:14,fontWeight:500}}>Quantity</div>
                                       <div><input value = {this.state.quantity} onChange = {event => this.setState({quantity:event.target.value})} type = "number" className ="" style={{padding:10,width:'95%',border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                                     </div>
                                    
                                 </div>
                             </div>
                             <div className="column2">
                                    <div>
                                       <div style={{fontSize:14,fontWeight:500}}>Upload Pictures</div>
                                    </div>
                                    <div style={{border:'1px solid #CCCCCC',height:'70%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                                     <img src={require('../components//assets/illustrate.png')} style={{width:60,height:60}}/>  
                                     <h3>{this.state.files.length} IMAGES ADDED</h3>                                      
                                    </div>
                                    <div style={{display:'flex',width:'100%'}}>
                                        <div>
                                           <input type="file" onChange = {this.onChangeHandler} style={{position:'relative',zIndex:10,color:'#8D8D8D',left:0}} />
                                           <br/><small style={{color:'#C10F0F'}}>Upload maximum of 3 pictures</small> 
                                        </div>
                                    </div>
                             </div>
                             
                         </div>
                         <div className="others">
                             <div className="desc">
                                 <div style={{fontSize:14,fontWeight:500}}>Description</div>
                                 <div>
                                     <textarea value = {this.state.desc} onChange = {event => this.setState({desc:event.target.value})} className ="" style={{padding:10,width:'96%',height:'20vh',border: '1px solid #CCCCCC',borderRadius: 3}}>
                                     </textarea>
                                 </div>    
                                 
                             </div>
                             <div className="cate">
                                 <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Gender</div> 
                                 <div>
                                    <select value = {this.state.gender} onChange = {event => this.setState({gender:event.target.value})} name = 'gender' className="form-control" style={{padding:10}}>
                                        <option value=""></option>
                                        <option value="Both">Both</option>
                                        <option value ="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                 </div> 
                                 <div style={{color:'#4C4C4C',fontSize:14,fontWeight:500}}>Age</div>
                                 <div style={{border: '1px solid #CCCCCC',borderRadius: 3}}>
                                     <div>
                                         {
                                             this.state.selectcate.toLowerCase() == '0-3years' ?
                                             (<p onClick = {() => this.selectCategory('0-3years')} style={{display:'inline-block',position:'relative',zIndex:10,backgroundColor:'#EC5198',color:'#EC5198',borderRadius:3,border: '2px solid #EC5198',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>):
                                             (<p onClick = {() => this.selectCategory('0-3years')} style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>)
                                         }
                                         <p style={{display:'inline-block',color:'#303030',fontSize:13,fontWeight:350}}>0 - 3 years</p>
                                         
                                     </div>
                                     <div style={{marginTop:-20}}>
                                         {
                                             this.state.selectcate.toLowerCase() == '4-6years' ?
                                             (<p onClick = {() => this.selectCategory('4-6years')} style={{display:'inline-block',position:'relative',zIndex:10,backgroundColor:'#EC5198',color:'#EC5198',borderRadius:3,border: '2px solid #EC5198',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>):
                                             (<p onClick = {() => this.selectCategory('4-6years')} style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>)
                                         }
                                         <p style={{display:'inline-block',color:'#303030',fontSize:13}}>4 - 6 years</p>
                                         
                                     </div>
                                     <div style={{marginTop:-20}}>
                                         {
                                             this.state.selectcate.toLowerCase() == '7-9years' ?
                                             (<p onClick = {() => this.selectCategory('7-9years')} style={{display:'inline-block',position:'relative',zIndex:10,backgroundColor:'#EC5198',color:'#EC5198',borderRadius:3,border: '2px solid #EC5198',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>):
                                             (<p onClick = {() => this.selectCategory('7-9years')} style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>)
                                         }
                                         <p style={{display:'inline-block',color:'#303030',fontSize:13}}>7 - 9 years</p>
                                         
                                     </div>
                                     <div style={{marginTop:-20}}>
                                         {
                                             this.state.selectcate.toLowerCase() == '10-12years' ?
                                             (<p onClick = {() => this.selectCategory('10-12years')} style={{display:'inline-block',position:'relative',zIndex:10,backgroundColor:'#EC5198',color:'#EC5198',borderRadius:3,border: '2px solid #EC5198',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>):
                                             (<p onClick = {() => this.selectCategory('10-12years')} style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>)
                                         }
                                         <p style={{display:'inline-block',color:'#303030',fontSize:13}}>10 - 12 years</p>
                                         
                                     </div>
                                     
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
export default connect(mapStateToProps)(EditProduct);
