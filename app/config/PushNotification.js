import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PushNotification from 'react-native-push-notification';

class MyPushNotification extends Component {
  componentDidMount() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification here

        // required on iOS only
        //        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: '1097565570065',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  render() {
    return null;
  }
}

export default MyPushNotification;
