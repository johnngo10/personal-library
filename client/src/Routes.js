import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import App from './App';
import Form from './components/Form';
import Book from './components/Book';
import Edit from './components/Edit';
import Error from './components/Error';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/add' component={Form} />
        <Route exact path='/book/:id' component={Book} />
        <Route exact path='/book/edit/:id' component={Edit} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
