import React, {Component} from 'react';
import {PermissionsAndroid, View,Text,Platform} from 'react-native';
import {WebView} from 'react-native-webview';
//for this to work, location must be switched on, on the device
//you also have to add   <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
//to your AndroidManifest.xml

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      permission: false
    };
  }
  async requestLocationPermission() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple(
        [PermissionsAndroid.PERMISSIONS.CAMERA, 
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
       ]
        ).then((result) => {
          if (result['android.permission.RECORD_AUDIO']
          && result['android.permission.CAMERA']
           === 'granted') {
            this.setState({
              permission: true
            });
          } 
        });
    }
  }

  componentDidMount() {
    this.requestLocationPermission();
  }

  render() {
    return (
      <View style={{flex:1}}>
        {this.state.permission === true?<WebView
        source={{uri: 'https://bigbluebutton.fcappservices.in/demo/demo2.jsp'}}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode={'always'}
        scalesPageToFit={true}
        javaScriptEnabled={true}
      />:<View><Text>Permissions Required for Video chat</Text></View>}
      </View>
   
    );
  }
}
