import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../common/actions/action_creators';

export var App = React.createClass({
  render: function() {
    if(this.props.error) {
      console.warn(this.props.error)
      if(this.props.error.status===403) {
        // Invalid login, get a new oauth request token
        this.props.getOauthToken()
      }
    } else if(this.props.redirect) {
      // Handle url redirect. Currently there're two cases:
      // 1. Got oauth request token, redirect to Twitter for oauth access token
      // 2. Got oauth access token, redirect to homepage
      window.location.replace(this.props.redirect)
    }
    return this.props.children;
  }
});

function mapStateToProps(state) {
  return {
    'redirect': state.get('redirect'),
    'error': state.get('error')
  }
}

export const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App);
