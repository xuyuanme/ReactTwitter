import React, { Component } from 'react-native'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux/native'
import thunk from 'redux-thunk'
import AppContainer from './components/App'
// import * as reducers from '../common/reducers'
import reducer from '../common/reducers/reducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class ReactTwitter extends Component {
  render() {
    console.log('ReactTwitter render')
    return (
      <Provider store={store}>
        {() => <AppContainer />}
      </Provider>
    )
  }
}
