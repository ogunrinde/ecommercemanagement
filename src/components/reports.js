import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/reports.css';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Top from '../components/top';
import {whichpage} from '../components/action';
import { connect } from 'react-redux';

class Reports extends Component {
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        let data = {page: 'report'};
        this.props.dispatch(whichpage(data));
        //alert(this.props.data.whichpage);
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
                        <div className="contenta" style={{color:'#969696',fontSize:18,fontWeight:350}}>
                            <span>Select the period you want to explore</span>
                            <span>
                                <select className="categories" style={{padding:10,width:'25vh',marginLeft:6,marginRight:6,border: '1px solid #CCCCCC',borderRadius: 3}}>
                                         <option> Choose your range</option>
                                </select>
                            </span>
                        </div>
                        <div className="contentb">
                        </div>
                    </div>
                    <div className="maincontent9">
                         <div style={{marginTop:30}}>
                            <div style={{marginTop:200,display:'flex',justifyContent:'space-between',borderBottom: '1px solid #c0c0c0',padding:0,margin:0}}>
                                <div style={{padding:0}}>
                                    <h4 style={{padding:0,margin:0}}>Sales Report</h4>
                                </div>
                                <div style={{padding:0}}>
                                    <p style={{padding:0,margin:0,fontWeight:450}}>
                                        Last 7 days
                                    </p>
                                </div>
                            </div>
                         </div>
                         <div style={{marginTop:30}}>
                            <div style={{display:'flex',justifyContent:'center',padding:0,margin:0}}>
                                <div style={{padding:0,width:'25%',backgroundColor:'#FFEBCC',height:'25vh',marginRight:5}}>
                                      <div style={{marginTop:'10vh',paddingLeft:20}}>
                                          <p style={{fontSize:13,color:'#0A2E65',fontWeight:500}}>Gross sales</p>
                                          <h3 style={{marginTop:-12, color:'#0A2E65'}}>N5,000,000</h3>
                                      </div>
                                </div>
                                <div style={{padding:0,width:'25%',backgroundColor:'#ECFBEC',height:'25vh',marginRight:5}}>
                                      <div style={{marginTop:'10vh',paddingLeft:20}}>
                                          <p style={{fontSize:13,color:'#0A2E65',fontWeight:500}}>Total earnings</p>
                                          <h3 style={{marginTop:-12, color:'#0A2E65'}}>N5,000,000</h3>
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
export default connect(mapStateToProps)(Reports);
