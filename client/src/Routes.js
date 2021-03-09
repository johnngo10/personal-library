import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import App from './App';
import Form from './components/Form';
import Book from './components/Book';
import Edit from './components/Edit';

const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/add' component={Form} />
        <Route exact path='/book/:id' component={Book} />
        <Route exact path='/book/edit/:id' component={Edit} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
