import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation, useRoute} from '@react-navigation/native';
import {DetailsRequest} from '@screens/Request/DetailsRequest';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IconCustom} from '@components/iconCustom';
import {DetailChat} from '@screens/Chat/DetailChat';
import {
  ActionEditStore,
  AddAccountStore,
  ChangePasswordStore,
  DarkModeStore,
  EditProfileStore,
  MessageStore,
  NotifStore,
  navigateIdRequestStore,
} from '@config/store';
import {EditFormRequest} from '@screens/Request/FormRequest/editForm';
import {EditProfileScreen} from '@screens/Profile/EditProfile';
import {Text} from '@gluestack-ui/themed';
import {AddFormRequest} from '@screens/Request/FormRequest/addForm';
import {ChangePasswordScreen} from '@screens/Profile/ChangePassword';
import {ManageUser} from '@screens/Profile/ManageUser';
import {NotificationScreen} from '@screens/Notifikasi';
import {ContactScreen} from '@screens/Chat/Contact';
const Stack = createNativeStackNavigator();
export const StackNavigation = ({route}) => {
  const navigation = useNavigation<any>();
  const dataRoute = useRoute<any>();
  const {edit, setEdit} = ActionEditStore();
  const {setParam} = EditProfileStore();
  const {setChange} = ChangePasswordStore();
  const {setIdNav} = navigateIdRequestStore();
  const {mode} = DarkModeStore();
  const {setAdd} = AddAccountStore();
  const {setMessageData} = MessageStore();
  const {setNotif} = NotifStore();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: mode ? 'black' : 'white',
        },
        headerTitleStyle: {
          color: mode ? 'white' : 'black',
        },
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
            <TouchableOpacity
              onPress={() => {
                setIdNav(0);
                navigation.goBack();
              }}>
              <IconCustom As={Ionicons} name="chevron-back" size={20} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setEdit(!edit)}>
              <IconCustom As={Ionicons} name="ellipsis-vertical" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DetailChat"
        component={DetailChat}
        options={{
          title: dataRoute.params?.params?.name,
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                setMessageData([]);
              }}>
              <IconCustom As={Ionicons} name="chevron-back" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EditFormRequest"
        component={EditFormRequest}
        options={{
          title: 'Form Edit',
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('StackNav', {
                  screen: 'DetailsRequest',
                })
              }>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddFormRequest"
        component={AddFormRequest}
        options={{
          title: 'Form Add',
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          title: 'Edit Profile',
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setParam(true)}>
              <Text>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: 'Change Password',
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setChange(true)}>
              <Text>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ManageUser"
        component={ManageUser}
        options={{
          title: 'Manage Users',
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                setIdNav(0);
                navigation.goBack();
              }}>
              <IconCustom As={Ionicons} name="chevron-back" size={20} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => setAdd(true)}>
              <Text color="$primary500">Add User</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Notification',
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                setNotif('');
                navigation.goBack();
              }}>
              <IconCustom As={Ionicons} name="chevron-back" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          title: 'Contact',
          headerBackVisible: false,
          headerShown: true,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconCustom As={Ionicons} name="chevron-back" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
