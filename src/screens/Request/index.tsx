import React, {useCallback, useEffect, useState} from 'react';
import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
  Badge,
  BadgeText,
  Box,
  HStack,
  RefreshControl,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';
import {Dimensions, TouchableOpacity} from 'react-native';
import {dataListRequest} from '@screens/Home/DataDummy';
import {TextHeading} from '@components/textHeading';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  getRequest,
  getRequestAll,
  getRequestAllSuper,
} from '@services/Request/services';
import {RequestInterface} from '@services/Request/interface';
import {IconCustom} from '@components/iconCustom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {InputDefault} from '@components/input/inputDefault';
import userInterface from '@services/User/interface';
import {baseURL} from '@config/intance';
import {UserStore, navigateIdRequestStore} from '@config/store';

const RequestScreen = () => {
  const {width, height} = Dimensions.get('window');
  const {setIdNav} = navigateIdRequestStore();
  const {user} = UserStore();
  const [data, setData] = useState<RequestInterface[]>([]);
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = useState(false);
  const [load, setLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const errorFunc = (message: string) => {
    console.log(message);
  };
  const getRequestFunc = async (pageNumber = 1, shouldRefresh = false) => {
    console.log('number', pageNumber);
    try {
      const response =
        user?.role === 'superadmin'
          ? await getRequestAllSuper(pageNumber, errorFunc)
          : await getRequest(pageNumber, errorFunc, user?.id);
      if (response?.status) {
        const newData = response?.data;
        if (response?.total_pages < page) {
          setPage(0);
        }
        setHasMore(newData.length > 0);
        if (pageNumber === 1) {
          setData(newData);
        } else {
          setData(prevData =>
            shouldRefresh ? newData : [...prevData, ...newData],
          );
        }
      }
    } catch (error) {
      console.log('getRequestFunc error conection', error);
    } finally {
      setLoad(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };
  // useEffect(() => {
  //   getRequestFunc();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getRequestFunc();
    }, []),
  );

  const onRefresh = () => {
    handleSearch('');
    setRefreshing(true);
    getRequestFunc().then(() => setRefreshing(false));
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      setPage(prevPage => {
        const nextPage = prevPage + 1;
        getRequestFunc(nextPage);
        return nextPage;
      });
    }
  };
  const handleSearch = async (value: string) => {
    setSearch(value);
    console.log('value', value);
    const responseall = await getRequestAll(errorFunc, user?.id);
    if (value === '') {
      getRequestFunc();
    } else {
      const filteredData = responseall?.data.filter(item =>
        item.title_job.toLowerCase().includes(value.toLowerCase()),
      );
      setData(filteredData);
    }
  };
  return (
    <SafeAreaCustom>
      <View flex={1} paddingHorizontal={16} mb={16}>
        <InputDefault
          showIcon={true}
          iconElement={<IconCustom As={Ionicons} name="search" size={20} />}
          changeText={value => handleSearch(value)}
          placeHolder="Search"
          value={search}
          size="lg"
        />
        <ScrollView
          mt={16}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={({nativeEvent}) => {
            const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
            const isCloseToBottom =
              layoutMeasurement.height + contentOffset.y >=
              contentSize.height - 250;
            const shouldLoadMore = !loadingMore && hasMore && isCloseToBottom;
            if (shouldLoadMore && search.length === 0) {
              handleLoadMore();
            }
          }}
          scrollEventThrottle={200}
          contentContainerStyle={{paddingBottom: 50}}>
          {data?.length > 0 ? (
            <VStack space="md">
              {data.map((value, index) => {
                const itemRequest = JSON.parse(value.item_request);
                const parsedDate = new Date(value.created_at);
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setIdNav(Number(value?.id));
                      navigation.navigate('StackNav', {
                        screen: 'DetailsRequest',
                      });
                    }}>
                    <Box bg="$primary500" p="$5" borderRadius={10}>
                      <VStack>
                        <HStack justifyContent="space-between" space="md">
                          <View maxWidth={'60%'}>
                            <TextHeading style={{color: 'white'}}>
                              {value.title_job}
                            </TextHeading>
                          </View>
                          <View>
                            <Badge
                              size="md"
                              variant="solid"
                              borderRadius="$md"
                              action={
                                value.status === 'Done'
                                  ? 'success'
                                  : value.status === 'Cancel'
                                  ? 'error'
                                  : value.status === 'Waiting'
                                  ? 'warning'
                                  : value.status === 'Processing'
                                  ? 'info'
                                  : 'muted'
                              }>
                              <BadgeText>{value.status}</BadgeText>
                            </Badge>
                          </View>
                        </HStack>
                        <HStack space="sm">
                          <Text color="white" size="xs">
                            Do Date:
                          </Text>
                          <Text color="white" size="xs" bold>
                            {value.do_date}
                          </Text>
                        </HStack>
                        <HStack space="sm">
                          <Text color="white" size="xs">
                            Created at:
                          </Text>
                          <Text color="white" size="xs" bold>
                            {parsedDate.toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </Text>
                        </HStack>
                        <HStack space="sm">
                          <Text color="white" size="xs">
                            List Item Request:
                          </Text>
                          <Text color="white" size="xs" bold>
                            {itemRequest.length}
                          </Text>
                        </HStack>
                        <HStack
                          justifyContent="space-between"
                          alignItems="center"
                          space="md">
                          <Text color="white" size="xs">
                            Member:
                          </Text>
                          <AvatarGroup>
                            {value?.member.map((item, key) => (
                              <Avatar size="xs" key={key}>
                                <AvatarFallbackText>
                                  {item?.name}
                                </AvatarFallbackText>
                                {(item.url?.length as number) > 0 && (
                                  <AvatarImage
                                    alt={item?.name}
                                    source={{
                                      uri: `${baseURL}${item.url}`,
                                    }}
                                  />
                                )}
                              </Avatar>
                            ))}
                          </AvatarGroup>
                        </HStack>
                      </VStack>
                    </Box>
                  </TouchableOpacity>
                );
              })}
            </VStack>
          ) : (
            <View alignSelf="center">
              {load ? (
                <Spinner size="small" />
              ) : (
                <Text size="xs">Data No Available</Text>
              )}
            </View>
          )}
          {loadingMore && hasMore && (
            <View alignSelf="center" paddingVertical={10}>
              <Spinner size="small" />
            </View>
          )}
        </ScrollView>
        {user?.role !== 'admin' && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StackNav', {screen: 'AddFormRequest'})
            }
            style={{
              position: 'absolute',
              backgroundColor: '#f43f5e',
              padding: 10,
              borderRadius: 50,
              right: 30,
              bottom: 10,
            }}>
            <IconCustom As={Ionicons} name={'add'} size={30} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaCustom>
  );
};

export {RequestScreen};
