import React from 'react';

var _apiAccessToken = 'http://xuyuan.me:8483/twitter/accessToken?oauth_verifier='

export var Callback = React.createClass({
  getInitialState: function() {
    return {content: ''}
  },

  componentWillMount: function() {
    var query = this.props.location.query
    if(query && query.oauth_verifier) {
      this.setState({content: 'Redirecting to home...'})
      this.getAccessToken(query.oauth_verifier)
    } else {
      this.setState({content: 'Invalid callback url'})
    }
  },

  getAccessToken: function(oauth_verifier) {
    console.log('getAccessToken with ' + oauth_verifier)
    fetch(_apiAccessToken + oauth_verifier, {
      credentials: 'include'
    }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          var getUrl = window.location
          var baseUrl = getUrl.protocol + '//' + getUrl.host + '/' + getUrl.pathname.split('/')[1]
          window.location.replace(baseUrl)
        } else {
          console.warn(response)
          this.setState({content: response.statusText})
        }
      })
      .catch((error) => {
        console.warn(error)
        this.setState({content: error.responseText})
      })
  },

  render:  function() {
    return <div>{this.state.content}</div>
  },
})
