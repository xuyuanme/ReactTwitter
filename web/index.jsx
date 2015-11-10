import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history'
import { App } from './components/App';
import { Profile } from './components/Profile'
import { Callback } from './components/Callback';

const routes = <Route path='/' component={App}>
  <Route path='reacttwitter' component={Profile} />
  <Route path='reacttwitter/callback' component={Callback} />
</Route>;

ReactDOM.render(
  <Router history={createHistory()}>{routes}</Router>,
  document.getElementById('root')
);
