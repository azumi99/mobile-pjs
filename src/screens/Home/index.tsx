import React, {useState} from 'react';
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
  ScrollView,
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
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';
import {TextHeading} from '@components/textHeading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dimensions, TouchableOpacity} from 'react-native';
import {IconCustom} from '@components/iconCustom';
import {dataListHistory, dataListRequest, dataTotal} from './DataDummy';
import {SelectComponent} from '@components/select';
import dataInterface from '@components/select/interface';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [prefix, setPrefix] = useState('Month');
  const {width, height} = Dimensions.get('window');
  const navigation = useNavigation<any>();
  const prefixData: dataInterface[] = [
    {label: 'Month', value: 'Month'},
    {label: 'Year', value: 'Year'},
  ];
  console.log('log', dataListHistory.length);
  return (
    <SafeAreaCustom>
      <View flex={1} paddingHorizontal={16}>
        <VStack space="xl">
          <HStack justifyContent="space-between" alignItems="center">
            <VStack>
              <TextHeading>
                <TextHeading style={{color: 'red'}}>PJS</TextHeading> Request
              </TextHeading>
              <Text>Hi, User</Text>
            </VStack>
            <HStack>
              <TouchableOpacity>
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
                <View borderWidth={0.2} padding={10} borderRadius={5}>
                  <IconCustom As={Ionicons} size={20} name={'notifications'} />
                </View>
              </TouchableOpacity>
            </HStack>
          </HStack>
          <ScrollView showsVerticalScrollIndicator={false}>
            <VStack space="xl" mb={100}>
              <VStack space="md">
                <HStack justifyContent="space-between" alignItems="center">
                  <TextHeading>Totaly</TextHeading>
                  <SelectComponent
                    width={'30%'}
                    valueChange={value => setPrefix(value)}
                    size="md"
                    placeHolder={prefix}
                    data={prefixData}
                  />
                </HStack>
                <HStack justifyContent="space-between">
                  <Box bg="$primary500" p="$5" borderRadius={10} width={'45%'}>
                    <Text size="sm" color="white">
                      Request
                    </Text>
                    <TextHeading style={{color: 'white'}}>
                      {dataTotal.total_request}
                    </TextHeading>
                    <TouchableOpacity style={{marginTop: 7}}>
                      <HStack alignItems="center" space="xs">
                        <Text color="white" size="xs">
                          Details
                        </Text>
                        <IconCustom
                          As={Ionicons}
                          name="chevron-forward-circle"
                          size={16}
                          color="white"
                        />
                      </HStack>
                    </TouchableOpacity>
                  </Box>
                  <Box bg="$primary500" p="$5" borderRadius={10} width={'45%'}>
                    <Text size="sm" color="white">
                      Request Done
                    </Text>
                    <TextHeading style={{color: 'white'}}>
                      {dataTotal.total_request_done}
                    </TextHeading>
                    <TouchableOpacity style={{marginTop: 7}}>
                      <HStack alignItems="center" space="xs">
                        <Text color="white" size="xs">
                          Details
                        </Text>
                        <IconCustom
                          As={Ionicons}
                          name="chevron-forward-circle"
                          size={16}
                          color="white"
                        />
                      </HStack>
                    </TouchableOpacity>
                  </Box>
                </HStack>
                <HStack justifyContent="space-between">
                  <Box bg="$primary500" p="$5" borderRadius={10} width={'45%'}>
                    <Text size="sm" color="white">
                      Request Waiting
                    </Text>
                    <TextHeading style={{color: 'white'}}>
                      {dataTotal.total_request_waiting}
                    </TextHeading>
                    <TouchableOpacity style={{marginTop: 7}}>
                      <HStack alignItems="center" space="xs">
                        <Text color="white" size="xs">
                          Details
                        </Text>
                        <IconCustom
                          As={Ionicons}
                          name="chevron-forward-circle"
                          size={16}
                          color="white"
                        />
                      </HStack>
                    </TouchableOpacity>
                  </Box>
                  <Box bg="$primary500" p="$5" borderRadius={10} width={'45%'}>
                    <Text size="sm" color="white">
                      Request Processing
                    </Text>
                    <TextHeading style={{color: 'white'}}>
                      {dataTotal.total_request_processing}
                    </TextHeading>
                    <TouchableOpacity style={{marginTop: 7}}>
                      <HStack alignItems="center" space="xs">
                        <Text color="white" size="xs">
                          Details
                        </Text>
                        <IconCustom
                          As={Ionicons}
                          name="chevron-forward-circle"
                          size={16}
                          color="white"
                        />
                      </HStack>
                    </TouchableOpacity>
                  </Box>
                </HStack>
                <HStack justifyContent="space-between">
                  <Box bg="$primary500" p="$5" borderRadius={10} width={'45%'}>
                    <Text size="sm" color="white">
                      Request Cancel
                    </Text>
                    <TextHeading style={{color: 'white'}}>
                      {dataTotal.total_request_cancel}
                    </TextHeading>
                    <TouchableOpacity style={{marginTop: 7}}>
                      <HStack alignItems="center" space="xs">
                        <Text color="white" size="xs">
                          Details
                        </Text>
                        <IconCustom
                          As={Ionicons}
                          name="chevron-forward-circle"
                          size={16}
                          color="white"
                        />
                      </HStack>
                    </TouchableOpacity>
                  </Box>
                  <Box bg="$primary500" p="$5" borderRadius={10} width={'45%'}>
                    <Text size="sm" color="white">
                      History List
                    </Text>
                    <TextHeading style={{color: 'white'}}>
                      {dataTotal.total_request_history}
                    </TextHeading>
                    <TouchableOpacity style={{marginTop: 7}}>
                      <HStack alignItems="center" space="xs">
                        <Text color="white" size="xs">
                          Details
                        </Text>
                        <IconCustom
                          As={Ionicons}
                          name="chevron-forward-circle"
                          size={16}
                          color="white"
                        />
                      </HStack>
                    </TouchableOpacity>
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
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {dataListRequest.length > 0 ? (
                    <HStack space="md">
                      {dataListRequest.map((value, index) => (
                        <TouchableOpacity key={index}>
                          <Box
                            bg="$primary500"
                            p="$5"
                            borderRadius={10}
                            width={width - 80}>
                            <VStack>
                              <HStack justifyContent="space-between" space="md">
                                <View maxWidth={'60%'}>
                                  <TextHeading style={{color: 'white'}}>
                                    {value.project_name}
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
                                  {value.dodate}
                                </Text>
                              </HStack>
                              <HStack space="sm">
                                <Text color="white" size="xs">
                                  List Item Request:
                                </Text>
                                <Text color="white" size="xs" bold>
                                  {value.total_request}
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
                                  {value.member.url.map((item, key) => (
                                    <Avatar size="xs" key={key}>
                                      <AvatarImage
                                        alt="image"
                                        source={{
                                          uri: item,
                                        }}
                                      />
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
                  <TouchableOpacity>
                    <View bg="$rose500" padding={5} borderRadius={10}>
                      <Text color="white" size="sm">
                        Details
                      </Text>
                    </View>
                  </TouchableOpacity>
                </HStack>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {dataListHistory.length > 0 ? (
                    <HStack space="md">
                      {dataListHistory.map((value, index) => (
                        <TouchableOpacity key={index}>
                          <Box
                            bg="$primary500"
                            p="$5"
                            borderRadius={10}
                            width={width - 80}>
                            <VStack>
                              <HStack justifyContent="space-between" space="md">
                                <View maxWidth={'60%'}>
                                  <TextHeading style={{color: 'white'}}>
                                    {value.project_name}
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
                                  {value.dodate}
                                </Text>
                              </HStack>
                              <HStack space="sm">
                                <Text color="white" size="xs">
                                  List Item Request:
                                </Text>
                                <Text color="white" size="xs" bold>
                                  {value.total_request}
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
                                  {value.member.url.map((item, key) => (
                                    <Avatar size="xs" key={key}>
                                      <AvatarImage
                                        alt="image"
                                        source={{
                                          uri: item,
                                        }}
                                      />
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
        </VStack>
      </View>
    </SafeAreaCustom>
  );
};

export {HomeScreen};
