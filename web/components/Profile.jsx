import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../common/actions/action_creators';

export var Profile = React.createClass({
  getInitialState: function() {
    console.log('Profile getInitialState')
    return {}
  },

  componentWillMount: function() {
    console.log('Profile componentWillMount')
    this.props.getProfile()
  },

  componentDidMount: function () {
    console.log('Profile componentDidMount')
  },

  render: function() {
    console.log('Profile render')
    return <div>Welcome {this.props.profile? this.props.profile.name : ''} to React Web!</div>
  },
})

function mapStateToProps(state) {
  return {
    'profile': state.get('profile')
  }
}

export const ProfileContainer = connect(
  mapStateToProps,
  actionCreators
)(Profile);
