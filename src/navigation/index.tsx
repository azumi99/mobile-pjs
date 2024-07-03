import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '@screens/Home';

import {LoginScreen} from '@screens/Login';
import {TabNav} from '@navigation/tabNav';
import {StackNavigation} from '@navigation/stackNav';
import {SplashScreen} from '@screens/splashScreen';
import {
  MessageStore,
  NotifStore,
  TokenFCMStore,
  TokenJwt,
  UserStore,
} from '@config/store';
import PushNotification from 'react-native-push-notification';
import {checkApplicationPermission} from '@config/firebase';

const NavigatorScreen = () => {
  const Stack = createStackNavigator();
  const {token} = TokenJwt();
  const {messageData, setMessageData} = MessageStore();
  const {setFcmtoken} = TokenFCMStore();
  const {notif, setNotif} = NotifStore();
  const RemoteNotification = () => {
    PushNotification.configure({
      onRegister: function (token) {
        setFcmtoken(token.token);
        // console.log(token);
      },
      onNotification: function (notification) {
        const {message, title, id} = notification;
        let strTitle: string = JSON.stringify(title).split('"').join('');
        let strBody: string = JSON.stringify(message).split('"').join('');
        const key: string = JSON.stringify(id).split('"').join('');
        PushNotification.createChannel(
          {
            channelId: key,
            channelName: 'remote messasge',
            channelDescription: 'Notification for remote message',
            importance: 4,
            vibrate: true,
          },
          created => console.log(`createChannel returned '${created}'`),
        );
        PushNotification.localNotification({
          channelId: key,
          title: strTitle,
          message: strBody,
        });
        if (notification.data.param !== '0') {
          // const initialMessages = [
          //   {
          //     _id: key,
          //     createdAt: new Date(),
          //     text: notification.data.message,
          //     user: {
          //       _id: 2,
          //       name: 'React Native',
          //       avatar:
          //         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          //     },
          //   },
          // ];
          setMessageData(id);
        }
        if (notification.data.param !== '1') {
          setNotif(id);
        }

        console.log(
          'REMOTE NOTIFICATION ==>',
          title,
          message,
          id,
          notification,
        );
      },
      senderID: '1234567890',
      popInitialNotification: true,
      requestPermissions: true,
    });
  };
  useEffect(() => {
    checkApplicationPermission();
    RemoteNotification();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        {[token].length < 2 && (
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        )}

        <Stack.Screen
          name="TabNav"
          component={TabNav}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StackNav"
          component={StackNavigation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export {NavigatorScreen};
