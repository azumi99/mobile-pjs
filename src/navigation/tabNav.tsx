import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen} from '@screens/Home';
import {RequestScreen} from '@screens/Request';
import {ApprovalScreen} from '@screens/Approval';
import {ProfileScreen} from '@screens/Profile';
import {Text, View} from '@gluestack-ui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabNav = () => {
  const Tab = createBottomTabNavigator();
  const size = 20;
  const iconHome = (color: string, focused: boolean) => (
    <View>
      <MaterialCommunityIcons
        size={focused ? 25 : size}
        color={color}
        name={focused ? 'home-minus' : 'home-minus-outline'}
      />
    </View>
  );

  const iconRequest = (color: string, focused: boolean) => (
    <View>
      <MaterialCommunityIcons
        size={focused ? 25 : size}
        color={color}
        name={focused ? 'file-document' : 'file-document-outline'}
      />
    </View>
  );

  const iconAproval = (color: string, focused: boolean) => (
    <View>
      <MaterialCommunityIcons
        size={focused ? 25 : size}
        color={color}
        name={focused ? 'clipboard-check' : 'clipboard-check-outline'}
      />
    </View>
  );

  //   const iconChat = (color: string, focused: boolean) => (
  //     <View>
  //       <Ionicons
  //         size={focused ? 25 : size}
  //         color={color}
  //         name={focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline'}
  //       />
  //     </View>
  //   );

  const iconAccount = (color: string, focused: boolean) => (
    <View>
      <Ionicons
        size={focused ? 25 : size}
        color={color}
        name={focused ? 'person' : 'person-outline'}
      />
    </View>
  );
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, focused}) => iconHome(color, focused),
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                color: focused ? '#387fdc' : 'black',
              }}>
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Request"
        component={RequestScreen}
        options={{
          tabBarIcon: ({color, focused}) => iconRequest(color, focused),

          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                color: focused ? '#387fdc' : 'black',
              }}>
              Request
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Aproval"
        component={ApprovalScreen}
        options={{
          tabBarIcon: ({color, focused}) => iconAproval(color, focused),

          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                color: focused ? '#387fdc' : 'black',
              }}>
              Aproval
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, focused}) => iconAccount(color, focused),
          //   tabBarShowLabel: true,
          //   headerShown: true,
          //   headerTitle: 'Profile',
          //   headerTitleAlign: 'center',
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                color: focused ? '#387fdc' : 'black',
              }}>
              Profile
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export {TabNav};
