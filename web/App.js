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
    fetch(_apiRequestToken, {
      credentials: 'include'
    }).then(this.checkStatus)
      .then(response => {
        return response.json()
      })
      .then((json) => {
        window.location.replace(_tOauthAuthorize + json.oauthRequestToken)
      })
      .catch(this.handleError)
  },

  getProfile: function () {
    console.log('getProfile')
    fetch(_apiProfile, {
      credentials: 'include'
    }).then(this.checkStatus)
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({name: json.name})
      })
      .catch(this.handleError)
  },

  checkStatus: function(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.status = response.status
      error.response = response
      throw error
    }
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
