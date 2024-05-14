import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {DetailsRequest} from '@screens/Request/DetailsRequest';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconCustom} from '@components/iconCustom';
import {DetailChat} from '@screens/Chat/DetailChat';
const Stack = createNativeStackNavigator();
export const StackNavigation = ({route}) => {
  const navigation = useNavigation<any>();
  const dataRoute = useRoute<any>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="DetailsRequest"
        component={DetailsRequest}
        options={{
          title: 'Request Detail',
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconCustom
                As={Ionicons}
                name="chevron-back"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DetailChat"
        component={DetailChat}
        options={{
          title: dataRoute.params?.param?.name,
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconCustom
                As={Ionicons}
                name="chevron-back"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
