import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AppContainer } from './components/App';
import { ProfileContainer } from './components/Profile';
import { CallbackContainer } from './components/Callback';
import reducer from '../common/reducer';

const routes = <Route path='/' component={AppContainer}>
  <Route path='reacttwitter' component={ProfileContainer} />
  <Route path='reacttwitter/callback' component={CallbackContainer} />
</Route>;

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(reducer)

ReactDOM.render(
  <Provider store={store}>
    <Router history={createHistory()}>{routes}</Router>
  </Provider>,
  document.getElementById('root')
);
