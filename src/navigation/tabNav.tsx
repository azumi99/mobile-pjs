import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '@screens/Home';
import {RequestScreen} from '@screens/Request';
import {HistoryScreen} from '@screens/History';
import {ProfileScreen} from '@screens/Profile';
import {Center, Text, VStack, View} from '@gluestack-ui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ChatScreen} from '@screens/Chat';

const TabNav = () => {
  const Tab = createBottomTabNavigator();
  const size = 20;
  const iconHome = (color: string, focused: boolean) => (
    <VStack space="xs" style={{justifyContent: 'center', alignItems: 'center'}}>
      <MaterialCommunityIcons
        size={focused ? 23 : size}
        color={color}
        name={focused ? 'home-minus' : 'home-minus-outline'}
      />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontSize: 10,
          color: focused ? '#387fdc' : 'black',
        }}>
        Home
      </Text>
    </VStack>
  );

  const iconRequest = (color: string, focused: boolean) => (
    <VStack space="xs" style={{justifyContent: 'center', alignItems: 'center'}}>
      <MaterialCommunityIcons
        size={focused ? 23 : size}
        color={color}
        name={focused ? 'file-document' : 'file-document-outline'}
      />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontSize: 10,
          color: focused ? '#387fdc' : 'black',
        }}>
        Request
      </Text>
    </VStack>
  );

  const iconAproval = (color: string, focused: boolean) => (
    <VStack space="xs" style={{justifyContent: 'center', alignItems: 'center'}}>
      <MaterialCommunityIcons
        size={focused ? 23 : size}
        color={color}
        name={focused ? 'clipboard-check' : 'clipboard-check-outline'}
      />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontSize: 10,
          color: focused ? '#387fdc' : 'black',
        }}>
        History
      </Text>
    </VStack>
  );

  const iconChat = (color: string, focused: boolean) => (
    <VStack space="xs" style={{justifyContent: 'center', alignItems: 'center'}}>
      <Ionicons
        size={focused ? 23 : size}
        color={color}
        name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
      />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontSize: 10,
          color: focused ? '#387fdc' : 'black',
        }}>
        Chat
      </Text>
    </VStack>
  );

  const iconAccount = (color: string, focused: boolean) => (
    <VStack space="xs" style={{justifyContent: 'center', alignItems: 'center'}}>
      <Ionicons
        size={focused ? 23 : size}
        color={color}
        name={focused ? 'person' : 'person-outline'}
      />
      <Text
        style={{
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          fontSize: 10,
          color: focused ? '#387fdc' : 'black',
        }}>
        Profile
      </Text>
    </VStack>
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: () => null,
        tabBarStyle: {
          height: 75,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => iconHome(color, focused),
        }}
      />
      <Tab.Screen
        name="Request"
        component={RequestScreen}
        options={{
          tabBarIcon: ({color, focused}) => iconRequest(color, focused),
          tabBarShowLabel: true,
          headerShown: true,
          headerTitle: 'Request',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: ({color, focused}) => iconChat(color, focused),
          tabBarShowLabel: true,
          headerShown: true,
          headerTitle: 'Chat',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({color, focused}) => iconAproval(color, focused),
          tabBarShowLabel: true,
          headerShown: true,
          headerTitle: 'History',
          headerTitleAlign: 'center',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, focused}) => iconAccount(color, focused),
        }}
      />
    </Tab.Navigator>
  );
};

export {TabNav};
