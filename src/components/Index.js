import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter,Switch } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Product from '../components/Product';
import AddProduct from '../components/Add_product';
import Customers from '../components/customers';
import Orders from '../components/orders';
import CustomerDetails from '../components/customer_details';
import OrderExpand from '../components/order_expand';
import store from '../components/store';
import {  Provider } from 'react-redux';
import   Payment from '../components/payment';
import Reports from '../components/reports';

export default class Index extends Component {
    render() {
        return(
            <Provider store = {store}>
            <BrowserRouter>
            <div>
                <Switch>
                <Route exact path="/" component = {Login}/>
                <Route path="/dashboard" component = {Dashboard}/>
                <Route path="/product" component = {Product}/>
                <Route path="/addproduct" component = {AddProduct}/>
                <Route path="/customers" component = {Customers}/>
                <Route path="/orders" component = {Orders}/>
                <Route path="/customerdetails" component = {CustomerDetails}/>
                <Route path="/order_expand" component = {OrderExpand}/>
                <Route path="/payment" component = {Payment}/>
                <Route path="/report" component = {Reports}/>
                </Switch>
            </div>
           </BrowserRouter>
           </Provider>
        )
    }
}

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
