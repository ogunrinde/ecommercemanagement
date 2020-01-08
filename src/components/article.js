import React, { Component } from 'react';
import './css/article.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMarker } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {connect} from 'react-redux';
import {whichpage} from '../components/action';

class Article extends Component {
    constructor(props){
        super(props);
        this.state = {
            topic:'',
            body:'',
            isFetching:false,
            searchproducts:[],

            siteurl:'http://localhost/CustomerApp/public'
        }
        this.submitData = this.submitData.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
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
              this.setState({searchproducts:data.products});
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    
    componentDidMount(){
        this.getproducts();
        let data = {page: 'article'};
        this.props.dispatch(whichpage(data));
        //alert(this.props.data.access_token);
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    selectCategory(val){
        this.setState({selectcate:val,category:val});
        //alert(val);
    }
    async submitData(e) {
        e.preventDefault();
        let id = '';
        let sugg = '';
        let data = new FormData();
        //alert(this.state.prodtname);
        if(this.state.topic === ''){
            alert('Article Topic is Unknown');
            return false;
        }
        if(this.state.body === ''){
            alert('Article Body is Unknown');
            return false;
        }
        this.setState({isFetching:true});
        this.state.searchproducts.forEach((suggest) => {
            if(id == '') {id += suggest.id; sugg += suggest.suggested;}
            else {id += ';'+suggest.id; sugg += ';'+suggest.suggested}  
        });
        data.append('topic',this.state.topic);
        data.append('body',this.state.body);
        data.append('id',id);
        data.append('sugg',sugg);
        await fetch(`${this.props.data.siteurl}/api/auth/addarticle`,{
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
                  this.setState({topic:'',body:''});
              }else{
                alert('Error saving data, try again later');
              }
          })
          .catch(err => {
            alert("Error: Please check your internet");
          });
    }
    suggested = async (prod) =>{
        //alert(prod.suggested);
        if(prod.suggested == '' || prod.suggested == null || prod.suggested == 'null'){ 
            prod.suggested = '1';      
            let count = this.state.count + 1;
            this.setState({count:count});
            let suggestions = this.state.searchproducts;
            let index = suggestions.findIndex(x => x.id === prod.id);
            suggestions[index].suggested = "1";
            await this.setState({searchproducts:suggestions});
            console.log(this.state.searchproducts);
        }else{
            let count = this.state.count - 1;
            this.setState({count:count});
            let suggestions = this.state.searchproducts;
            let index = suggestions.findIndex(x => x.id === prod.id);
            suggestions[index].suggested = "";
            await this.setState({searchproducts:suggestions});
            console.log(this.state.searchproducts);
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
                            <p style={{marginRight:10, fontSize:17}}>ARTICLE / SUGGESTIONS</p>
                        </div>
                        <div className="contentb">
                            <button onClick = {this.submitData} type="submit" className="btn-productbtn">
                            {
                                this.state.isFetching == true &&
                                <i className="fa fa-spinner fa-spin" style={{fontSize:20,color:'#fff'}} />
                            }
                            {
                                this.state.isFetching == false && <span>ADD ARICLE / SUGGESTIONS</span>
                            } 
                            </button>
                        </div>
                    </div>
                    <div className="maincontentarticle">
                         <div className="prodtitle">
                             <div className="column1">
                                 <div style={{fontSize:14,fontWeight:500}}>Topic</div>
                                 <div><input value = {this.state.topic} onChange = {event => this.setState({topic:event.target.value})} type = "text" className ="" style={{padding:10,width:'96%',border: '1px solid #CCCCCC',borderRadius: 3}}/> </div>
                                     <div>
                                       <div style={{fontSize:14,fontWeight:500,marginTop:20}}>Body</div>
                                       <div>
                                           <textarea style={{padding:10,width:'96%',border: '1px solid #CCCCCC',borderRadius: 3,height:'30vh'}}  onChange = {event => this.setState({body:event.target.value})}>{this.state.body}</textarea>
                                        </div>
                                     </div>
                             </div>
                             <div className="column2">
                                    <div>
                                       <div style={{fontSize:14,fontWeight:500}}>Suggest Product</div>
                                    </div>
                                    {
                                        this.state.isFetching == true &&
                                        <i className="fa fa-spinner fa-spin" style={{fontSize:20,color:'#EC5198'}} />
                                    }
                                    <div className="suggest" style={{height:'98%',overflowY:'scroll',border:"1px solid #c1c1c1"}}>
                                    <table className=''>
                                        <tr className=''>
                                            <th style={{textAlign:"left"}}>Name</th>
                                            <th style={{textAlign:"left"}}>Suggest</th>
                                        </tr>
                                        {
                                        this.state.searchproducts.map((prod)=>
                                        <tr className='prodtr' style={{textAlign:"left"}}>
                                            <td style={{textAlign:"left",textTransform:"capitalize"}}>
                                                {prod.name}
                                            </td>
                                            <td>
                                                {
                                                    prod.suggested == '1' ?
                                                    (<p onClick = {() => this.suggested(prod)} style={{display:'inline-block',position:'relative',zIndex:10,backgroundColor:'#EC5198',color:'#EC5198',borderRadius:3,border: '2px solid #EC5198',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>):
                                                    (<p onClick = {() => this.suggested(prod)} style={{display:'inline-block',position:'relative',zIndex:10,color:'#DADADA',borderRadius:3,border: '2px solid #CCCCCC',width:15,height:15,textAlign:'center',margin:7,top:10}}></p>)
                                                }
                                            </td>
                                        </tr>
                                        )
                                        }
                                    </table>    
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
export default connect(mapStateToProps)(Article);

