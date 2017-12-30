import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './components/Home/Home';
import Event from './components/Events/Event';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';

class App extends Component {
  componentDidMount() {
    const jwt = sessionStorage.getItem('JWT');
    if(jwt) {
      axios({
        method: 'get',
        url: '/api/authenticate',
        headers: {
          'x-access-token': jwt
        }
      })
      .then(res => {
        if(!res.data.success) {
          sessionStorage.clear();
          window.location.reload();
        }
      })
    }
    
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/event/:id" component={Event} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={Admin} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
