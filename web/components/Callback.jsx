import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../common/actions/action_creators';

export var Callback = React.createClass({
  getInitialState: function() {
    return {content: ''}
  },

  componentWillMount: function() {
    var query = this.props.location.query
    if(query && query.oauth_verifier) {
      this.setState({content: 'Redirecting to home...'})
      this.props.getAccessToken(query.oauth_verifier)
    } else {
      this.setState({content: 'Invalid callback url'})
    }
  },

  render:  function() {
    if(this.props.error) {
      this.setState({content: error.message})
    }
    return <div>{this.state.content}</div>
  },
})

function mapStateToProps(state) {
  return {
    'error': state.get('error')
  }
}

export const CallbackContainer = connect(
  mapStateToProps,
  actionCreators
)(Callback);
