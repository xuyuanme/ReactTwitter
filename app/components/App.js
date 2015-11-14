import React, { Component } from 'react-native'
import { connect } from 'react-redux/native'
import url from 'url'
import * as actionCreators from '../../common/actions/action_creators'
import ProfileContainer from './Profile'

var {
  LinkingIOS,
  } = React

export class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleUrl = this.handleUrl.bind(this)
  }

  componentDidMount() {
    console.log('App componentDidMount')
    LinkingIOS.addEventListener('url', this.handleUrl)
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount')
    LinkingIOS.removeEventListener('url', this.handleUrl)
  }

  // Handle Twitter website call back
  // reacttwitter://foo?oauth_token=a&oauth_verifier=b
  handleUrl(event) {
    console.log('App handle call back ' + event.url)
    var url_parts = url.parse(event.url, true)
    var query = url_parts.query
    if(query && query.oauth_verifier) {
      this.props.getAccessToken(query.oauth_verifier)
    } else {
      console.warn('Invalid callback url')
    }
  }

  render() {
    console.log('App render')
    if(this.props.error) {
      if(this.props.error.status===403) {
        // Invalid login, get a new oauth request token
        this.props.getOauthToken()
      } else {
        console.warn(this.props.error)
      }
    } else if(this.props.redirect) {
      // Handle url redirect. Currently there're two cases:
      if(!this.props.redirect.endsWith('.js')) {
        // 1. Got oauth request token, redirect to Twitter for oauth access token
        LinkingIOS.openURL(this.props.redirect)
      } else {
        // 2. Got oauth access token, redirect to homepage
        this.props.getProfile()
      }
    }
    return (
      <ProfileContainer />
    )
  }
}

function mapStateToProps(state) {
  return {
    'redirect': state.get('redirect'),
    'error': state.get('error')
  }
}

export default AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App);
