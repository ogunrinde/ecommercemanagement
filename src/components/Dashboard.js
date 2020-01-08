import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/dashboard.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {connect} from 'react-redux';
import {whichpage} from '../components/action';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            processingorders:[],
            allorders:[],
            outofstock:[]
        }
    }
    componentDidMount(){
        let data = {page: 'home'};
        //this.getdetails();
        this.props.dispatch(whichpage(data));
    }
    componentWillMount(){
        let status = this.props.data.isloggin;
        if(status == false) this.props.history.push('/');
    }
    async getdetails(){
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/details`,{
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
              this.setState({processingorders:data.processingorders,allorders:data.allorders,outofstock:data.outofstock});
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
                    <div className="maincontentdash">
                         <div className="dastitle" style={{textAlign:'left'}}>
                             <p style={{fontSize:19,fontWeight:'600'}}>Store Summary</p>
                         </div>
                         <div class='counter'>
                             <div className="items sales">
                                 <div className="more">
                                     <div className = "option" style={{backgroundColor: '#FF8761'}}>&#x20A6;</div>
                                     <div className = "detail">
                                         <p style={{fontSize:19,fontWeight:'400'}}>Gross sales<br/><span style={{color:'#EC5198', fontWeight:"bold"}}>1,000,000</span></p>
                                         
                                     </div>
                                 </div>
                             </div>
                             <div className="items sold">
                                <div className="more">
                                     <div className = "option" style={{backgroundColor: '#B198DC'}}>
                                        <img src={require('../components//assets/items.png')} style={{width:40,height:40}}/>
                                     </div>
                                     <div className = "detail">
                                         <p style={{fontSize:19,fontWeight:'400'}}>Items sold<br/><span style={{color:'#EC5198', fontWeight:"bold"}}>500</span></p>
                                         
                                     </div>
                                 </div>
                             </div>
                             <div className="items order">
                             <div className="more">
                                     <div className = "option" style={{backgroundColor: '#6DC7BE'}}>
                                        <img src={require('../components//assets/order.png')} style={{width:40,height:40}}/>
                                     </div>
                                     <div className = "detail">
                                         <p style={{fontSize:19,fontWeight:'400'}}>Order<br/><span style={{color:'#EC5198', fontWeight:"bold"}}>{this.state.allorders.length}</span></p>
                                         
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="dastitle" style={{textAlign:'left'}}>
                             <p style={{fontSize:19,fontWeight:'600'}}>Store statistics</p>
                         </div>
                         <div className="stat">
                             <div className="summary">
                                  <div className="productrow">
                                      <div className="iconimg">
                                            <div className="icon">
                                               <FontAwesomeIcon icon={faBookmark} style={{position:'relative',zIndex:10,color:'blue'}}/>
                                            </div>
                                      </div>
                                      <div className="detailproduct">
                                          <p style={{fontSize:19,fontWeight:400,marginTop:2}}>6 Products</p>
                                          <p style={{color:'#C10F0F',fontSize:14,marginTop:-15,fontWeight:'500'}}>Out of stock</p>
                                      </div>
                                  </div>
                                  <div className="productrow">
                                      <div className="iconimg">
                                            <div className="icon">
                                               <FontAwesomeIcon icon={faBookmark} style={{position:'relative',zIndex:10,color:'blue'}}/>
                                            </div>
                                      </div>
                                      <div className="detailproduct">
                                          <p style={{fontSize:19,fontWeight:'300',marginTop:2}}>6 Products</p>
                                          <p style={{color:'#C10F0F',fontSize:14,marginTop:-15,fontWeight:'500'}}>Out of stock</p>
                                      </div>
                                  </div>
                                  <div className="productrow">
                                      <div className="iconimg">
                                            <div className="icon">
                                               <FontAwesomeIcon icon={faBookmark} style={{position:'relative',zIndex:10,color:'blue'}}/>
                                            </div>
                                      </div>
                                      <div className="detailproduct">
                                          <p style={{fontSize:19,fontWeight:'300',marginTop:2}}>{this.state.processingorders.length} orders</p>
                                          <p style={{color:'#C10F0F',fontSize:14,marginTop:-15,fontWeight:'500'}}>Processing</p>
                                      </div>
                                  </div>
                             </div>
                             <div className="image">
                                 <img src={require('../components//assets/illustrate.png')} style={{width:'70%',height:250}}/>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return{
        data: state.DataReducer
    }
}
export default connect(mapStateToProps)(Dashboard);

