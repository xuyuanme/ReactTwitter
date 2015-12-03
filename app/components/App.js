import React, { Component } from 'react-native'
import {LinkingManager} from 'NativeModules'
import { connect } from 'react-redux/native'
import url from 'url'
import * as actionCreators from '../../common/actions/action_creators'
import ProfileContainer from './Profile'

var {
  LinkingIOS,
  IntentAndroid,
  DeviceEventEmitter,
  } = React

export class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.handleUrl = this.handleUrl.bind(this)
  }

  componentDidMount() {
    console.log('App componentDidMount')
    if (LinkingManager) {
      LinkingIOS.addEventListener('url', this.handleUrl)
    } else if (IntentAndroid.canOpenURL) {
      DeviceEventEmitter.addListener('url', this.handleUrl)
    }
  }

  componentWillUnmount() {
    console.log('App componentWillUnmount')
    if (LinkingManager) {
      LinkingIOS.removeEventListener('url', this.handleUrl)
    } else if (IntentAndroid.canOpenURL) {
      DeviceEventEmitter.removeListener('url', this.handleUrl)
    }
  }

  // Handle Twitter website call back
  // reacttwitter://foo?oauth_token=a&oauth_verifier=b
  handleUrl(event) {
    if (event.url) {
      // iOS callback
      var callbackURL = event.url
    } else {
      // Android callback
      var callbackURL = event
    }
    console.log('App handle call back ' + callbackURL)
    var url_parts = url.parse(callbackURL, true)
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
        if (LinkingManager) {
          LinkingIOS.openURL(this.props.redirect)
        } else if (IntentAndroid.canOpenURL) {
          IntentAndroid.canOpenURL(this.props.redirect, (supported) => {
            if (supported) {
              IntentAndroid.openURL(this.props.redirect);
            } else {
              console.warn('Don\'t know how to open URI: ' + this.props.redirect);
            }
          })
        }
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
