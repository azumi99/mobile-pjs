import SafeAreaCustom from '@components/safeArea';
import {NotifStore, UserStore} from '@config/store';
import {
  Badge,
  BadgeText,
  HStack,
  ScrollView,
  VStack,
  Text,
  View,
  Spinner,
  RefreshControl,
} from '@gluestack-ui/themed';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {deleteNotif, getNotif} from '@services/Notifikasi';
import {NotifInterface} from '@services/Notifikasi/interface';
import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Snackbar from 'react-native-snackbar';

const ErrorFunc = (message: string) => {
  console.log(message);
};
const NotificationScreen = () => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState<NotifInterface[]>([]);
  const {user} = UserStore();
  const [refreshing, setRefreshing] = useState(false);
  const [load, setLoad] = useState(true);
  const {notif} = NotifStore();

  const getNotifunc = async () => {
    try {
      const response = await getNotif(ErrorFunc, user?.id);
      if (response.status) {
        setLoad(false);
        setData(response.data);
      }
    } catch (error) {
      console.log('getNotifunc error', error);
      setLoad(false);
    }
  };
  const deleteNotifFunc = async (id?: string) => {
    try {
      const response = await deleteNotif(ErrorFunc, id);
      if (response.status) {
        getNotifunc();
        Snackbar.show({
          text: response.message,
          backgroundColor: '#348352',
          duration: 1500,
        });
      }
    } catch (error) {
      console.log('deleteNotifFunc error', error);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    getNotifunc().then(() => setRefreshing(false));
  };
  useFocusEffect(
    useCallback(() => {
      getNotifunc();
    }, []),
  );
  useEffect(() => {
    getNotifunc();
  }, [notif]);
  return (
    <SafeAreaCustom>
      <VStack paddingVertical={16} paddingHorizontal={16} flex={1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {data?.length > 0 ? (
            <VStack space="md">
              {data.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('TabNav', {screen: 'Request'})
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
                    <VStack space="sm">
                      <Text color="white" bold size="xs">
                        {value?.title}
                      </Text>
                      <Text color="white" size="xs">
                        {value.body.split(' ').slice(0, 4).join(' ')}
                      </Text>
                      <HStack>
                        <Badge size="sm" borderRadius={20} action="warning">
                          <BadgeText>{value?.created_at}</BadgeText>
                        </Badge>
                      </HStack>
                    </VStack>
                    <VStack>
                      <TouchableOpacity
                        onPress={() => deleteNotifFunc(value?.id)}
                        style={{
                          backgroundColor: '#f43f5e',
                          padding: 10,
                          borderRadius: 10,
                        }}>
                        <Text color="white" size="xs">
                          Delete
                        </Text>
                      </TouchableOpacity>
                    </VStack>
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

export {NotificationScreen};
