import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/top.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default class Top extends Component {
    render() {
        return (
            <div className="headertop">
                <div className="accountowner">
                        Hello, Admin
                </div>
                <div className="notification">
                    <FontAwesomeIcon icon={faBell} />
                    <p style={{position:"relative",left:9,zIndex:1,top:-85,backgroundColor:'#C10F0F',width:30,height:30,borderRadius:15,textAlign:'center',color:'#fff'}}>
                        <h4 style={{position:"absolute",top:-10,left:7,fontSize:12}}>30</h4>
                    </p>
                    
                </div>
            </div>
        );
    }
}
