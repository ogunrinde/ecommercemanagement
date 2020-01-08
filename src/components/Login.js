import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './css/login.css';
import {connect} from 'react-redux';
import { login } from '../components/action';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggin : false,
            email:'',
            isFetching:false,
            password:'',
            user:{},
            status:'failed',
            siteurl:'http://localhost/CustomerApp/public'
        };
        this.authenticated = this.authenticated.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.getPassword = this.getPassword.bind(this);
    }
    getEmail(event) {
        this.setState({email:event.target.value});
    }
    getPassword(event) {
        this.setState({password:event.target.value});
    }
    async authenticated(e) {
        e.preventDefault();
        //alert(this.props.data.isloggin);
        if(this.state.email == '' && this.state.password == '') {
            alert('Email and Password are required');
            return false;
        }
        this.setState({isFetching:true});
        await fetch(`${this.props.data.siteurl}/api/auth/login`,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email:this.state.email,password:this.state.password})
        })
          .then(data => data.json())
          .then(data => {
              //console.log(data);
              if(data.status == 'success'){
                this.props.dispatch(login(data));
                this.setState({isLoggin:true});
                this.setState({user:data.user,status:data.status});
                this.setState({isFetching:false});
                this.props.history.push('/dashboard');
                //return <Redirect to='/dashboard' />
                //console.log(this.props.data.user.email);
              }else if(data.status == 'failed'){
                  alert(data.message);
              }else {
                alert(data.message);
              }
          })
          .catch(err => {
            this.setState({isFetching:false});  
            alert("Error: Please check your internet");
          });
    }
    render() {
        return (
            <div className="container">
                <div className="wrap">
                    <div className = "loginheader">
                        <p>LOGIN TO YOUR DASHBOARD</p>
                    </div>
                    <div>
                    <form>
                            <div className="form-group">
                                
                                <input type="email" value={this.state.email} onChange={this.getEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                            </div>
                            <div className="form-group">
                                
                                <input type="password" value={this.state.password} onChange={this.getPassword} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <p className="forget">Forget Password?</p>
                            </div>
                            

                            <button onClick={this.authenticated} type="submit" className="btn">
                                {
                                    this.state.isFetching == true &&
                                       <i className="fa fa-spinner fa-spin" style={{fontSize:20,color:'#fff'}} />
                                }{
                                    this.state.isFetching == false && <span>Submit</span>
                                }
                                
                            </button>
                    </form>
                    </div>
                </div>
                
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        data: state.DataReducer
    };
};
export default connect(mapStateToProps)(Login);
