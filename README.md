# ReactTwitter

ReactTwitter is a demo Twitter client to show how to share unified business logic code between React Native apps and React web projects. The project is as simple as only asking for user's oauth and show "Hello {username}", but it demonstrates the most basic aspects of front-end/back-end React program interaction.

## Config & Run

1. Config and run its server side counterparty [NodeTwitter](https://github.com/xuyuanme/NodeTwitter)
2. `npm install`
3. For website demo, run `node webDevServer.js`, then visit `http://localhost:8080/reacttwitter` in browser
4. For iOS app demo, open `./ios/ReactTwitter.xcodeproj` with Xcode, then run the app in simulator or device.
5. Todo: Android app

## Architecture

![ReactTwitter Arch](http://xuyuan.me/img/react-twitter-arch.jpg)

## Screenshots

![ReactTwitter Screen](http://xuyuan.me/img/react-twitter-screen.jpg)
