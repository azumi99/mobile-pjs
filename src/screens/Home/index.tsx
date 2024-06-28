import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonText,
  ChevronDownIcon,
  HStack,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Spinner,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';
import {TextHeading} from '@components/textHeading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {IconCustom} from '@components/iconCustom';
import {dataListHistory, dataListRequest, dataTotal} from './DataDummy';
import {SelectComponent} from '@components/select';
import dataInterface from '@components/select/interface';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  DarkModeStore,
  TokenFCMStore,
  UserStore,
  navigateIdRequestStore,
} from '@config/store';
import {
  historyCountService,
  requestCountService,
  statusCountService,
} from '@services/Dashboard/services';
import {getRequestAll, getRequestAllSuper} from '@services/Request/services';
import {RequestInterface} from '@services/Request/interface';
import {getHistorytAll, getHistorytAllSuper} from '@services/History/services';
import {baseURL} from '@config/intance';
import {checkApplicationPermission} from '@config/firebase';
import {FcmSave} from '@services/FCM';

const HomeScreen = () => {
  const [prefix, setPrefix] = useState('Month');
  const {width, height} = Dimensions.get('window');
  const {setIdNav} = navigateIdRequestStore();
  const {mode} = DarkModeStore();
  const {fcmtoken} = TokenFCMStore();
  const [maxBoxHeight, setMaxBoxHeight] = useState<number>(0);
  const {user} = UserStore();
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState('');
  const [history, setHistory] = useState('');
  const [waiting, setWaiting] = useState('');
  const [progress, setProgress] = useState('');
  const [done, setDone] = useState('');
  const [cancel, setCancel] = useState('');
  const [dataRequest, setDataRequest] = useState<RequestInterface[]>([]);
  const [dataHistory, setDataHistory] = useState<RequestInterface[]>([]);
  const navigation = useNavigation<any>();
  const prefixData: dataInterface[] = [
    {label: 'Month', value: 'Month'},
    {label: 'Year', value: 'Year'},
  ];
  const scrollViewRef = useRef<ScrollView | null>(null);
  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const {contentOffset} = event.nativeEvent;
    const index = Math.floor(contentOffset.x / (width - 80) + 0.5);
    scrollViewRef.current?.scrollTo({x: index * (width - 80), animated: true});
  };
  const scrollViewRef1 = useRef<ScrollView | null>(null);
  const handleMomentumScrollEnd1 = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const {contentOffset} = event.nativeEvent;
    const index = Math.floor(contentOffset.x / (width - 80) + 0.5);
    scrollViewRef1.current?.scrollTo({x: index * (width - 80), animated: true});
  };
  const errorFunc = (message: string) => {
    console.log(message);
  };
  const serviceCountStatusFunc = async () => {
    try {
      const progressResponse = await statusCountService(
        errorFunc,
        user?.id,
        'progress',
      );
      const waitingResponse = await statusCountService(
        errorFunc,
        user?.id,
        'waiting',
      );
      const cancelResponse = await statusCountService(
        errorFunc,
        user?.id,
        'cancel',
      );
      const doneResponse = await statusCountService(
        errorFunc,
        user?.id,
        'done',
      );
      const requestCountResponse = await requestCountService(
        errorFunc,
        user?.id,
      );
      const historytCountResponse = await historyCountService(
        errorFunc,
        user?.id,
      );

      setWaiting(waitingResponse.data);
      setProgress(progressResponse.data);
      setDone(doneResponse.data);
      setCancel(cancelResponse.data);
      setRequest(requestCountResponse.data);
      setHistory(historytCountResponse.data);
    } catch (error) {
      console.log('serviceCountStatusFunc error', error);
    }
  };
  const requestSlide = async () => {
    try {
      const responseall =
        user?.role === 'superadmin'
          ? await getRequestAllSuper(1, errorFunc)
          : await getRequestAll(errorFunc, user?.id);
      if (responseall.status) {
        setDataRequest(responseall.data.slice(0, 3));
        setLoading(false);
      }
    } catch (error) {
      console.log('requestSlide error', error);
      setLoading(false);
    }
  };
  const historySlide = async () => {
    try {
      const responseall =
        user?.role === 'superadmin'
          ? await getHistorytAllSuper(1, errorFunc)
          : await getHistorytAll(errorFunc, user?.id);
      if (responseall.status) {
        setDataHistory(responseall.data.slice(0, 3));
      }
    } catch (error) {
      console.log('requestSlide error', error);
    }
  };
  const FcmTokenSave = async () => {
    try {
      const response = await FcmSave(errorFunc, user?.id, fcmtoken.toString());
      console.log(response);
    } catch (error) {
      console.log('FcmTokenSave error conection', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      serviceCountStatusFunc();
      FcmTokenSave();
      requestSlide();
      historySlide();
    }, []),
  );
  useEffect(() => {
    FcmTokenSave();
    serviceCountStatusFunc();
    requestSlide();
    historySlide();
  }, [user]);
  return (
    <SafeAreaCustom>
      <View flex={1} paddingHorizontal={16} mt={20}>
        <VStack space="xl">
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <TextHeading>
                <TextHeading style={{color: 'red'}}>PJS</TextHeading> Request
              </TextHeading>
              <Text>Hi, {user?.name}</Text>
            </VStack>
            <HStack>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('StackNav', {
                    screen: 'NotificationScreen',
                  })
                }>
                <View
                  bgColor="red"
                  padding={5}
                  position="absolute"
                  borderRadius={'$full'}
                  top={2}
                  right={2}
                  zIndex={1}
                  alignItems="center">
                  <Text size="xs" position="absolute" color="white"></Text>
                </View>
                <View
                  borderWidth={0.2}
                  padding={10}
                  borderRadius={5}
                  borderColor={mode ? 'white' : 'black'}>
                  <IconCustom As={Ionicons} size={20} name={'notifications'} />
                </View>
              </TouchableOpacity>
            </HStack>
          </HStack>
          {loading ? (
            <Spinner size="small" />
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              <VStack space="xl" mb={100} mt={10}>
                <VStack space="md">
                  <HStack justifyContent="space-between" alignItems="center">
                    <TextHeading>Totaly</TextHeading>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Box
                      bg="$primary500"
                      p="$5"
                      borderRadius={10}
                      width={'45%'}>
                      <Text size="sm" color="white">
                        Request
                      </Text>
                      <TextHeading style={{color: 'white'}}>
                        {request}
                      </TextHeading>
                    </Box>
                    <Box
                      bg="$primary500"
                      p="$5"
                      borderRadius={10}
                      width={'45%'}>
                      <Text size="sm" color="white">
                        Request Done
                      </Text>
                      <TextHeading style={{color: 'white'}}>{done}</TextHeading>
                    </Box>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Box
                      bg="$primary500"
                      p="$5"
                      borderRadius={10}
                      width={'45%'}>
                      <Text size="sm" color="white">
                        Request Waiting
                      </Text>
                      <TextHeading style={{color: 'white'}}>
                        {waiting}
                      </TextHeading>
                    </Box>
                    <Box
                      bg="$primary500"
                      p="$5"
                      borderRadius={10}
                      width={'45%'}>
                      <Text size="sm" color="white">
                        Request Progress
                      </Text>
                      <TextHeading style={{color: 'white'}}>
                        {progress}
                      </TextHeading>
                    </Box>
                  </HStack>
                  <HStack justifyContent="space-between">
                    <Box
                      bg="$primary500"
                      p="$5"
                      borderRadius={10}
                      width={'45%'}>
                      <Text size="sm" color="white">
                        Request Cancel
                      </Text>
                      <TextHeading style={{color: 'white'}}>
                        {cancel}
                      </TextHeading>
                    </Box>
                    <Box
                      bg="$primary500"
                      p="$5"
                      borderRadius={10}
                      width={'45%'}>
                      <Text size="sm" color="white">
                        History List
                      </Text>
                      <TextHeading style={{color: 'white'}}>
                        {dataTotal.total_request_history}
                      </TextHeading>
                    </Box>
                  </HStack>
                </VStack>
                <VStack space="md">
                  <HStack justifyContent="space-between" alignItems="center">
                    <TextHeading>Request</TextHeading>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('TabNav', {screen: 'Request'})
                      }>
                      <View bg="$rose500" padding={5} borderRadius={10}>
                        <Text color="white" size="sm">
                          Details
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </HStack>
                  <ScrollView
                    ref={scrollViewRef}
                    onMomentumScrollEnd={handleMomentumScrollEnd}
                    horizontal={true}
                    decelerationRate="fast"
                    snapToInterval={width - 80}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}>
                    {dataRequest.length > 0 ? (
                      <HStack space="md">
                        {dataRequest.map((value, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setIdNav(Number(value?.id));
                              navigation.navigate('StackNav', {
                                screen: 'DetailsRequest',
                              });
                            }}>
                            <Box
                              bg="$primary500"
                              p="$5"
                              height={180}
                              borderRadius={10}
                              width={width - 80}>
                              <VStack>
                                <HStack
                                  justifyContent="space-between"
                                  space="md">
                                  <View maxWidth={'60%'}>
                                    <TextHeading style={{color: 'white'}}>
                                      {value.title_job
                                        .split(' ')
                                        .slice(0, 4)
                                        .join(' ')}
                                      {value.title_job.split(' ').length > 4
                                        ? ' ...'
                                        : ''}
                                    </TextHeading>
                                  </View>
                                  <View>
                                    <Badge
                                      size="md"
                                      variant="solid"
                                      borderRadius="$md"
                                      action="warning">
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
                                    List Item Request:
                                  </Text>
                                  <Text color="white" size="xs" bold>
                                    {JSON.parse(value.item_request).length}
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
                                    {value.member.map((item, key) => (
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
                        ))}
                      </HStack>
                    ) : (
                      <Text size="xs">Data No Available</Text>
                    )}
                  </ScrollView>
                </VStack>
                <VStack space="md">
                  <HStack justifyContent="space-between" alignItems="center">
                    <TextHeading>History</TextHeading>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('TabNav', {screen: 'History'})
                      }>
                      <View bg="$rose500" padding={5} borderRadius={10}>
                        <Text color="white" size="sm">
                          Details
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </HStack>
                  <ScrollView
                    ref={scrollViewRef1}
                    onMomentumScrollEnd={handleMomentumScrollEnd1}
                    horizontal={true}
                    decelerationRate="fast"
                    snapToInterval={width - 80}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}>
                    {dataHistory.length > 0 ? (
                      <HStack space="md">
                        {dataHistory.map((value, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              setIdNav(Number(value?.id));
                              navigation.navigate('StackNav', {
                                screen: 'DetailsRequest',
                              });
                            }}>
                            <Box
                              bg="$primary500"
                              p="$5"
                              height={180}
                              borderRadius={10}
                              width={width - 80}>
                              <VStack>
                                <HStack
                                  justifyContent="space-between"
                                  space="md">
                                  <View maxWidth={'60%'}>
                                    <TextHeading style={{color: 'white'}}>
                                      {value.title_job
                                        .split(' ')
                                        .slice(0, 4)
                                        .join(' ')}
                                      {value.title_job.split(' ').length > 4
                                        ? ' ...'
                                        : ''}
                                    </TextHeading>
                                  </View>
                                  <View>
                                    <Badge
                                      size="md"
                                      variant="solid"
                                      borderRadius="$md"
                                      action="success">
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
                                    List Item Request:
                                  </Text>
                                  <Text color="white" size="xs" bold>
                                    {JSON.parse(value.item_request).length}
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
                                    {value.member.map((item, key) => (
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
                        ))}
                      </HStack>
                    ) : (
                      <Text size="xs">Data No Available</Text>
                    )}
                  </ScrollView>
                </VStack>
              </VStack>
            </ScrollView>
          )}
        </VStack>
      </View>
    </SafeAreaCustom>
  );
};

export {HomeScreen};
