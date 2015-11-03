import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history'
import { App } from './App';
import { Callback } from './Callback';

const routes = <Route>
  <Route path='/reacttwitter' component={App} />
  <Route path='/reacttwitter/callback' component={Callback} />
</Route>;

ReactDOM.render(
  <Router history={createHistory()}>{routes}</Router>,
  document.getElementById('root')
);
