'use strict'

var React = require('react-native')
var url = require('url')

var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    LinkingIOS
    } = React

var _tOauthAuthorize = 'https://twitter.com/oauth/authorize?oauth_token='
var _apiRequestToken = 'http://xuyuan.me:8483/twitter/requestToken'
var _apiAccessToken = 'http://xuyuan.me:8483/twitter/accessToken?oauth_verifier='
var _apiProfile = 'http://xuyuan.me:8483/twitter/profile'

var ReactTwitter = React.createClass({
    componentDidMount: function () {
        console.log("componentDidMount")
        LinkingIOS.addEventListener('url', this.handleUrl)
        this.getProfile()
    },

    componentWillUnmount() {
        console.log("componentWillUnmount")
        LinkingIOS.removeEventListener('url', this.handleUrl)
    },

    // Handle Twitter website call back
    // reacttwitter://foo?oauth_token=a&oauth_verifier=b
    handleUrl: function (event) {
        console.log("Handle call back " + event.url)
        var url_parts = url.parse(event.url, true)
        var query = url_parts.query

        fetch(_apiAccessToken + query.oauth_verifier)
            .then((response) => {
                if (response.status === 200) {
                    this.getProfile()
                } else {
                    this.throwResponse(response)
                }
            })
            .catch((error) => {
                console.warn(error)
            })
            .done()
    },

    getOauthToken: function () {
        console.log("Get oauth token")
        fetch(_apiRequestToken)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    this.throwResponse(response)
                }
            })
            .then((responseJson) => {
                LinkingIOS.openURL(_tOauthAuthorize + responseJson.oauthRequestToken)
            })
            .catch((error) => {
                console.warn(error)
            })
            .done()
    },

    getProfile: function () {
        console.log("Get profile")
        fetch(_apiProfile)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    this.throwResponse(response)
                }
            })
            .then((responseJson) => {
                this.setState({name: responseJson.name})
            })
            .catch((error) => {
                console.warn(error)
            })
            .done()
    },

    throwResponse: function (response) {
        console.log("Got " + response.status + " error")
        if (response.status === 403) {
            this.getOauthToken()
        }
        var error = new Error(response._bodyText)
        error.response = response
        throw error
    },

    render: function () {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome {this.state ? this.state.name : 'to React Native'}!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+Control+Z for dev menu
                </Text>
            </View>
        )
    },
})

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
})

AppRegistry.registerComponent('ReactTwitter', () => ReactTwitter)
