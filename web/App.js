import React from 'react';

var _tOauthAuthorize = 'https://twitter.com/oauth/authorize?oauth_token='
var _apiRequestToken = 'http://xuyuan.me:8483/twitter/requestToken'
var _apiProfile = 'http://xuyuan.me:8483/twitter/profile'

export var App = React.createClass({
  getInitialState: function() {
    console.log('getInitialState')
    return {}
  },

  componentWillMount: function() {
    console.log('componentWillMount')
    this.getProfile()
  },

  componentDidMount: function () {
    console.log('componentDidMount')
  },

  getOauthToken: function() {
    console.log('getOauthToken')
    $.get(_apiRequestToken)
      .then((response) => {
        window.location.replace(_tOauthAuthorize + response.oauthRequestToken)
      })
      .fail((error) => {
        this.handleError(error)
      })
  },

  getProfile: function () {
    console.log('getProfile')
    $.get(_apiProfile)
      .then((response) => {
        this.setState({name: response.name})
      })
      .fail((error) => {
        this.handleError(error)
      })

  },

  handleError: function(error) {
    if(error.status === 403) {
      this.getOauthToken()
    } else {
      console.warn(error)
    }
  },

  render:  function() {
    console.log('render')
    return <div>Welcome {this.state.name ? this.state.name : 'to React Web'}!</div>
  },
})
