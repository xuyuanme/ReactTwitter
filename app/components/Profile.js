import React, { Component } from 'react-native'

var {
  StyleSheet,
  Text,
  View,
} = React

export default Profile = React.createClass({
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
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome {this.props.profile? this.props.profile.name : ''} to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js or index.android.js
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
