/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import Navigator from 'app/navigation';
import configureStore from 'app/store/configureStore';
import SplashScreen from 'react-native-splash-screen';
import AppIntro from 'app/components/AppIntroSlider';
import AsyncStorage from '@react-native-community/async-storage';
const { persistor, store } = configureStore();
import PushNotification from 'app/config/PushNotification';

export default function Entrypoint() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('first_time').then(value => {
      setLoading(false);
      setShowRealApp(!!value);
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        {loading ? (
          <ActivityIndicator size={40} color="black" />
        ) : showRealApp ? (
          <Navigator />
        ) : (
          <AppIntro setShowRealApp={setShowRealApp} />
        )}
        <PushNotification />
      </PersistGate>
    </Provider>
  );
}
