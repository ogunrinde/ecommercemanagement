import React from 'react';
import { Route, Link, BrowserRouter,Switch } from 'react-router-dom';
import Login from '../src/components/Login';
import Dashboard from '../src/components/Dashboard';
import Product from '../src/components/Product';
import AddProduct from '../src/components/Add_product';
import EditProduct from '../src/components/Edit_product';
import Customers from '../src/components/customers';
import Orders from '../src/components/orders';
import CustomerDetails from '../src/components/customer_details';
import OrderExpand from '../src/components/order_expand';
import Deals from '../src/components/deals';
import AddDeals from '../src/components/adddeals';
import store from '../src/components/store';
import {  Provider } from 'react-redux';
import   Payment from '../src/components/payment';
import Reports from '../src/components/reports';
import Article from '../src/components/article';
import './App.css';

function App() {
  return(
      <Provider store = {store}>
      <BrowserRouter basename="/management">
          <Switch>
          <Route exact path="/" component = {Login}/>
          <Route path="/dashboard" component = {Dashboard}/>
          <Route path="/product" component = {Product}/>
          <Route path="/addproduct" component = {AddProduct}/>
          <Route path="/editproduct" component = {EditProduct}/>
          <Route path="/customers" component = {Customers}/>
          <Route path="/orders" component = {Orders}/>
          <Route path="/customerdetails" component = {CustomerDetails}/>
          <Route path="/order_expand" component = {OrderExpand}/>
          <Route path="/payment" component = {Payment}/>
          <Route path="/report" component = {Reports}/>
          <Route path="/deals" component = {Deals}/>
          <Route path="/adddeals" component = {AddDeals}/>
          <Route path="/article" component = {Article}/>
          </Switch>
     </BrowserRouter>
     </Provider>
  );
}

export default App;
