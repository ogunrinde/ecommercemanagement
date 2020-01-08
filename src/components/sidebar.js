import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faShoppingCart, faMoneyCheck, faAddressBook, faBriefcase, faFile, faImages } from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {logout} from '../components/action';
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    constructor(props){
      super(props);
      this.state = {
        siteurl:'http://localhost/CustomerApp/public',
        sidebar:[
          {
            nav:'Home',
            icon:faHome,
            route:'dashboard'
          },
          {
            nav:'Products',
            icon:faUser,
            route:'product'
          },
          {
            nav:'Customers',
            icon:faUser,
            route:'customer'
          },
          {
            nav:'Payment',
            icon:faMoneyCheck
          },
          {
            nav:'Reports',
            icon:faAddressBook
          },
          {
            nav:'Orders',
            icon:faShoppingCart,
            route:'orders'
          }
        ]
      }
      this.nav = this.nav.bind(this);
    }
    nav (val) {
      //this.props.dispatch(whichpage(val));
      //alert(route);
      //window.location.href = "/dashboard";
      //this.props.history.push('/dashboard');
    }
    logout = async () => {
      //alert('aaaa');
      let url = `http://www.thelittlebigkidcompany.com.ng/api/auth/logout`;
          fetch(url,{
              method:'POST',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type':'application/json',
                  'Authorization': `Bearer ${this.props.data.access_token}`
              }
          })
            .then(data => data.json())
            .then(data => {
              this.props.dispatch(logout());
              this.props.history.push('/');
            })
            .catch(err => {
              
            });
    }
    render() {
        return (
            <div className="">
                <div className ="side">
                       
                       {
                         this.props.data.whichpage.toLowerCase() == 'home' ? (<div className="lastlist first" style={{marginTop: '12vh'}}>
                         <FontAwesomeIcon icon={faHome} />  <Link to='/dashboard'><span style={{marginLeft:10}}>Home</span></Link>
                        </div>) :(<div className="lastlist others" style={{marginTop: '12vh'}}>
                         <FontAwesomeIcon icon={faHome} />  <Link to='/dashboard'><span style={{marginLeft:10}}>Home</span></Link>
                        </div>)
                       }
                       {
                         this.props.data.whichpage.toLowerCase() == 'product' ? (<div className="lastlist first">
                         <FontAwesomeIcon icon={faImages} />  <Link to='/product'><span style={{marginLeft:10}}>Products</span></Link>
                        </div>) :(<div className="lastlist others">
                         <FontAwesomeIcon icon={faImages} />  <Link to='/product'><span style={{marginLeft:10}}>Products</span></Link>
                        </div>)
                       }
                       {
                         this.props.data.whichpage.toLowerCase() == 'customer' ? (<div className="lastlist first">
                         <FontAwesomeIcon icon={faUser} />  <Link to='/customers'><span style={{marginLeft:10}}>Customers</span></Link>
                        </div>) :(<div className="lastlist others">
                         <FontAwesomeIcon icon={faUser} />  <Link to='/customers'><span style={{marginLeft:10}}>Customers</span></Link>
                        </div>)
                       }
                       {
                         this.props.data.whichpage.toLowerCase() == 'deals' ? (<div className="lastlist first">
                         <FontAwesomeIcon icon={faBriefcase} />  <Link to='/deals'><span style={{marginLeft:10}}>Deals</span></Link>
                        </div>) :(<div className="lastlist others">
                         <FontAwesomeIcon icon={faBriefcase} />  <Link to='/deals'><span style={{marginLeft:10}}>Deals</span></Link>
                        </div>)
                       }
                       {
                         this.props.data.whichpage.toLowerCase() == 'payment' ? (<div className="lastlist first">
                         <FontAwesomeIcon icon={faMoneyCheck} />  <Link to='/payment'><span style={{marginLeft:10}}>Payment</span></Link>
                        </div>) :(<div className="lastlist others">
                         <FontAwesomeIcon icon={faMoneyCheck} />  <Link to='/payment'><span style={{marginLeft:10}}>Payment</span></Link>
                        </div>)
                       }
                       {
                         this.props.data.whichpage.toLowerCase() == 'report' ? (<div className="lastlist first">
                         <FontAwesomeIcon icon={faAddressBook} />  <Link to='/report'><span style={{marginLeft:10}}>Reports</span></Link>
                        </div>) :(<div className="lastlist others">
                         <FontAwesomeIcon icon={faAddressBook} />  <Link to='/report'><span style={{marginLeft:10}}>Reports</span></Link>
                        </div>)
                       }
                       {
                         this.props.data.whichpage.toLowerCase() == 'orders' ? (<div className="lastlist first">
                         <FontAwesomeIcon icon={faShoppingCart} />  <Link to='/orders'><span style={{marginLeft:10}}>Orders</span></Link>
                        </div>) :(<div className="lastlist others">
                         <FontAwesomeIcon icon={faShoppingCart} />  <Link to='/orders'><span style={{marginLeft:10}}>Orders</span></Link>
                        </div>)
                       }
                       {
                         this.props.data.whichpage.toLowerCase() == 'article' ? (<div className="lastlist first">
                         <FontAwesomeIcon icon={faFile} />  <Link to='/article'><span style={{marginLeft:10}}>Articles</span></Link>
                        </div>) :(<div className="lastlist others">
                         <FontAwesomeIcon icon={faFile} />  <Link to='/article'><span style={{marginLeft:10}}>Articles</span></Link>
                        </div>)
                       }
                        <div onClick = {this.logout} className="lastlist logout" style={{cursor:'pointer'}}>
                            Logout
                        </div>
                        
                    
                </div>
                
            </div>
        );
    }
};
const mapStateToProps = state => {
  return {
    data:state.DataReducer
  }
  
}
export default connect(mapStateToProps)(Sidebar);
