import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import App from './App';
import Form from './components/Form';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/add' component={Form} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
