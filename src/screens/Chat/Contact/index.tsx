import {IconCustom} from '@components/iconCustom';
import {InputDefault} from '@components/input/inputDefault';
import SafeAreaCustom from '@components/safeArea';
import {SelectComponent} from '@components/select';
import {baseURL} from '@config/intance';
import {AddAccountStore} from '@config/store';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Badge,
  BadgeIcon,
  BadgeText,
  ButtonText,
  CloseIcon,
  GlobeIcon,
  HStack,
  Heading,
  Icon,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ScrollView,
  Text,
  Modal,
  VStack,
  Button,
  View,
  RefreshControl,
  Spinner,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {
  deleteAccount,
  getUser,
  getUserId,
  newAccount,
  resetPassword,
  updateUser,
} from '@services/User';
import userInterface from '@services/User/interface';
import registerInterface from '@services/User/interface';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ContactScreen = () => {
  const [userData, setUserData] = useState<userInterface[]>([]);
  const [userId, setUserId] = useState<userInterface>();
  const {add, setAdd} = AddAccountStore();
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [url, setUrl] = useState('');
  const [edit, setEdit] = useState(false);
  const [load, setLoad] = useState(true);
  const ref = React.useRef(null);
  const [search, setSearch] = useState('');
  const navigation = useNavigation<any>();

  interface selectInterface {
    label: string;
    value: string;
  }
  const prefixData: selectInterface[] = [
    {label: 'superadmin', value: 'superadmin'},
    {label: 'admin', value: 'admin'},
    {label: 'user', value: 'user'},
  ];
  const errorFunc = (message: string) => {
    console.log(message);
  };
  const getUserFunc = async () => {
    try {
      const response = await getUser(errorFunc);
      if (response?.status) {
        setUserData(response?.data);
      }
    } catch (error) {
      console.log('getRequestFunc error conection', error);
    }
  };

  useEffect(() => {
    getUserFunc();
  }, []);
  useEffect(() => {
    add && setShowModal(true);
    add && setEmail('');
    add && setName('');
    add && setRole('');
    add && setUrl('');
    add && setPassword('');
    add && setConfirmPassword('');
    add && setEdit(true);
  }, [add]);
  const onRefresh = () => {
    setRefreshing(true);
    getUserFunc().then(() => setRefreshing(false));
  };
  const handleSearch = async (value: string) => {
    setSearch(value);
    console.log('value', value);
    const responseall = await getUser(errorFunc);
    if (value === '') {
      getUserFunc();
    } else {
      const filteredData = responseall?.data.filter(
        item =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.email.toLowerCase().includes(value.toLowerCase()),
      );
      setUserData(filteredData);
    }
  };
  return (
    <SafeAreaCustom>
      <VStack paddingHorizontal={16} space="xl" mt={20} pb={80}>
        <InputDefault
          showIcon={true}
          iconElement={<IconCustom As={Ionicons} name="search" size={20} />}
          changeText={value => handleSearch(value)}
          placeHolder="Search"
          value={search}
          size="lg"
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {userData?.length > 0 ? (
            <VStack space="md">
              {userData.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('StackNav', {
                      screen: 'DetailChat',
                      params: {
                        name: item.name,
                        userId: item.id,
                      },
                    })
                  }
                  style={{
                    padding: 16,
                    backgroundColor: '#0077E6',
                    borderRadius: 10,
                  }}>
                  <HStack
                    space="md"
                    alignItems="center"
                    justifyContent="space-between">
                    <VStack>
                      <Text color="white" bold>
                        {item.name}
                      </Text>
                      <Text color="white" size="sm">
                        {item.email}
                      </Text>
                      <HStack mt={10}>
                        <Badge size="md" borderRadius={20} action="warning">
                          <BadgeText>{item.role}</BadgeText>
                        </Badge>
                      </HStack>
                    </VStack>
                    <Avatar>
                      <AvatarFallbackText>SS</AvatarFallbackText>
                      {(item.url?.length as number) > 0 && (
                        <AvatarImage
                          alt={item.name}
                          source={{
                            uri: `${baseURL}${item.url}`,
                          }}
                        />
                      )}
                    </Avatar>
                  </HStack>
                </TouchableOpacity>
              ))}
            </VStack>
          ) : (
            <View alignSelf="center" mt={20}>
              {load ? (
                <Spinner size="small" />
              ) : (
                <Text size="xs">Data No Available</Text>
              )}
            </View>
          )}
        </ScrollView>
      </VStack>
    </SafeAreaCustom>
  );
};

export {ContactScreen};
