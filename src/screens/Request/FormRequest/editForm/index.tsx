import {TextAreaCustom} from '@components/TextArea';
import {IconCustom} from '@components/iconCustom';
import {InputDefault} from '@components/input/inputDefault';
import SafeAreaCustom from '@components/safeArea';
import {SelectComponent} from '@components/select';
import {TextHeading} from '@components/textHeading';
import {baseURL} from '@config/intance';
import {DarkModeStore, UserStore, navigateIdRequestStore} from '@config/store';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetIcon,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetScrollView,
  Avatar,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
  Badge,
  BadgeText,
  Box,
  Button,
  ButtonText,
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  GlobeIcon,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemLabel,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ScrollView,
  Spinner,
  Text,
  Textarea,
  TextareaInput,
  Tooltip,
  TooltipContent,
  TooltipText,
  VStack,
  View,
  Modal,
  ModalFooter,
  ModalHeader,
  Heading,
  Divider,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import {RequestInterface} from '@services/Request/interface';
import {getRequestId, updateRequest} from '@services/Request/services';
import {getUser} from '@services/User';
import userInterface from '@services/User/interface';
import React, {useEffect, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Snackbar from 'react-native-snackbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface selectInterface {
  label: string;
  value: string;
}
interface itemInterface {
  item_name: string;
  status: 'active' | 'inactive' | string;
}
const EditFormRequest = () => {
  const ref = React.useRef(null);
  const navigation = useNavigation<any>();
  const {width, height} = Dimensions.get('window');
  const {idNav} = navigateIdRequestStore();
  const {mode} = DarkModeStore();
  const {user} = UserStore();
  const [title, setTitle] = useState('');
  const [data, setData] = useState<RequestInterface[]>([]);
  const [by, setBy] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [statusItem, setItemStatus] = useState('');
  const [date, setDate] = useState('');
  const [tooltip, setTooltip] = useState<any>(null);
  const [itemData, setItemData] = useState<itemInterface[]>([]);
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const [userData, setUserData] = useState<userInterface[]>([]);
  const [userDataAll, setUserDataAll] = useState<userInterface[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [check, setCheck] = useState<any>();
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const handleClose = () => setShowActionsheet(!showActionsheet);
  const [saveLoad, setSaveLoad] = useState(false);

  const errorFunc = (message: string) => {
    console.log(message);
  };
  const getRequestFunc = async () => {
    try {
      const response = await getRequestId(errorFunc, idNav);
      if (response?.status) {
        setData(response?.data);
        const memberIds: number[] = [];
        response.data.map(value => {
          setTitle(value.title_job);
          setStatus(value.status);
          setBy(value.by_request);
          setDate(value.do_date);
          setNote(value.notes);
          setItemData(JSON.parse(value?.item_request));
          value.member.flatMap(item => {
            memberIds.push(item?.id);
          });
        });
        setSelectedMembers(memberIds);
      }
    } catch (error) {
      console.log('getRequestFunc error conection');
    }
  };
  const getUserFunc = async () => {
    try {
      const response = await getUser(errorFunc);
      const filteredData = response?.data.filter(item =>
        item.name.toLowerCase().includes(search?.toLowerCase()),
      );
      if (response?.status) {
        setUserData(response?.data);
        if (search) {
          setUserDataAll(filteredData);
        } else {
          setUserDataAll(response?.data);
        }
      }
    } catch (error) {
      console.log('getRequestFunc error conection');
    }
  };
  const updateRequestFunc = async () => {
    setSaveLoad(true);
    const params: RequestInterface = {
      title_job: title,
      status: status,
      by_request: by,
      do_date: date,
      member: selectedMembers,
      item_request: JSON.stringify(itemData) as string,
      notes: note,
    };
    try {
      const response = await updateRequest(errorFunc, idNav, params);
      console.log('param', response);
      if (response?.status) {
        setSaveLoad(false);
        navigation.navigate('StackNav', {screen: 'DetailsRequest'});
        Snackbar.show({
          text: response.message,
          backgroundColor: '#348352',
          duration: 1500,
        });
      } else {
        const errorMessages = [
          response.do_date?.[0],
          response.notes?.[0],
          response.title_job?.[0],
        ].filter(Boolean);

        if (errorMessages.length > 0) {
          const combinedMessage = errorMessages.join('\n');
          Snackbar.show({
            text: combinedMessage,
            backgroundColor: '#f43f5e',
            duration: 1500,
          });
        }
        setSaveLoad(false);
      }
    } catch (error) {
      setSaveLoad(false);
      Snackbar.show({
        text: 'Error conection',
        backgroundColor: '#f43f5e',
        duration: 1500,
      });
      console.log('getRequestFunc error conection', error);
    }
  };
  const prefixData: selectInterface[] = [
    {label: 'Waiting', value: 'Waiting'},
    {label: 'Processing', value: 'Processing'},
    {label: 'Cancel', value: 'Cancel'},
    {label: 'Done', value: 'Done'},
  ];

  useEffect(() => {
    getRequestFunc();
  }, []);
  useEffect(() => {
    getUserFunc();
  }, [search]);

  const handleAddForm = () => {
    const newForm: itemInterface = {item_name: '', status: 'Inactive'};
    setItemData([...itemData, newForm]);
  };

  const handleItemChange = (value: string, index: number) => {
    const updatedData = [...itemData];
    updatedData[index].item_name = value;
    setItemData(updatedData);
  };

  const handleRemoveForm = (index: number) => {
    const updatedData = itemData.filter((_, i) => i !== index);
    setItemData(updatedData);
  };

  const toggleMemberSelection = (id: number, isChecked: boolean) => {
    setSelectedMembers(prevSelectedMembers => {
      if (isChecked) {
        return [...prevSelectedMembers, id];
      } else {
        return prevSelectedMembers.filter(memberId => memberId !== id);
      }
    });
  };
  console.log('item', itemData);

  return (
    <SafeAreaCustom>
      <ScrollView flex={1}>
        {data?.length > 0 ? (
          <View paddingHorizontal={16} marginVertical={16}>
            <VStack space="xl">
              {user?.role !== 'admin' ? (
                <>
                  <Box
                    width={'100%'}
                    bgColor={mode ? '#171717' : 'white'}
                    padding={16}
                    borderRadius={10}
                    softShadow="1">
                    <VStack space="md">
                      <InputDefault
                        label="Title Job"
                        defaultValue={title}
                        changeText={value => setTitle(value)}
                      />
                      <SelectComponent
                        valueChange={value => setStatus(value)}
                        placeHolder={''}
                        isDisabled={user?.role === 'superadmin' ? false : true}
                        data={prefixData}
                        selectDefault={status}
                        label="Status"
                      />
                      <InputDefault
                        label="Request By"
                        isDisabled
                        defaultValue={by}
                        changeText={value => setBy(value)}
                      />

                      <InputDefault
                        onFocus={() => setShowModal(true)}
                        label="Do date"
                        value={date}
                        changeText={value => setDate(value)}
                      />
                      <Modal
                        isOpen={showModal}
                        onClose={() => {
                          setShowModal(false);
                        }}
                        finalFocusRef={ref}>
                        <ModalBackdrop />

                        <ModalContent bgColor={mode ? '#171717' : 'white'}>
                          <ModalHeader>
                            <Heading size="lg">Do Date</Heading>
                          </ModalHeader>
                          <ModalBody>
                            <Calendar
                              onDayPress={day => {
                                setDate(day.dateString);
                              }}
                              markedDates={{
                                [date]: {
                                  selected: true,
                                  disableTouchEvent: true,
                                },
                              }}
                            />
                          </ModalBody>
                          <ModalFooter>
                            <Button
                              variant="outline"
                              size="sm"
                              action="secondary"
                              mr="$3"
                              onPress={() => {
                                setShowModal(false);
                              }}>
                              <ButtonText>Cancel</ButtonText>
                            </Button>
                            <Button
                              size="sm"
                              action="positive"
                              borderWidth="$0"
                              onPress={() => {
                                setShowModal(false);
                              }}>
                              <ButtonText>Select</ButtonText>
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                      <VStack space="xl" mb={10}>
                        <Text>Member :</Text>
                        <VStack space="xs">
                          {userData.map((item, index) =>
                            selectedMembers.includes(item?.id as number) ? (
                              <HStack
                                space="md"
                                key={index}
                                alignItems="center">
                                <Avatar size="xs">
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
                                <VStack>
                                  <Text size="sm">{item.email}</Text>
                                </VStack>
                              </HStack>
                            ) : (
                              <View key={index}></View>
                            ),
                          )}
                        </VStack>
                      </VStack>
                      <Button borderRadius={10} onPress={handleClose}>
                        <ButtonText>Edit Member</ButtonText>
                      </Button>
                      <Actionsheet
                        isOpen={showActionsheet}
                        onClose={handleClose}
                        zIndex={999}>
                        <ActionsheetBackdrop />
                        <ActionsheetContent zIndex={999}>
                          <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                          </ActionsheetDragIndicatorWrapper>
                          <VStack space="md" width={'99%'} mt={7}>
                            <TextHeading size="lg">Add Member</TextHeading>
                            <InputDefault
                              changeText={value => setSearch(value)}
                              size="lg"
                              placeHolder="Search"
                              value={search}
                            />
                          </VStack>
                          <Divider width={width} mt={20} height={2} mb={5} />
                          <ActionsheetScrollView h={'50%'}>
                            {userDataAll.map((value, index) => (
                              <ActionsheetItem
                                key={index}
                                justifyContent="space-between">
                                <HStack space="md">
                                  <ActionsheetIcon>
                                    <Avatar
                                      bgColor={'$amber600'}
                                      size="xs"
                                      borderRadius="$full">
                                      <AvatarFallbackText>
                                        {value.name}
                                      </AvatarFallbackText>
                                      {(value.url?.length as number) > 0 && (
                                        <AvatarImage
                                          alt={value?.name}
                                          source={{
                                            uri: `${baseURL}${value.url}`,
                                          }}
                                        />
                                      )}
                                    </Avatar>
                                  </ActionsheetIcon>
                                  <ActionsheetItemText>
                                    {value.name}
                                  </ActionsheetItemText>
                                </HStack>
                                <Checkbox
                                  size="md"
                                  isChecked={selectedMembers.includes(
                                    value?.id as number,
                                  )}
                                  onChange={isChecked => {
                                    toggleMemberSelection(
                                      value.id as number,
                                      isChecked,
                                    );
                                  }}
                                  value={value?.name as string}
                                  aria-label={value.name}>
                                  <CheckboxIndicator mr="$2">
                                    <CheckboxIcon as={CheckIcon} />
                                  </CheckboxIndicator>
                                </Checkbox>
                              </ActionsheetItem>
                            ))}
                          </ActionsheetScrollView>
                        </ActionsheetContent>
                      </Actionsheet>
                    </VStack>
                  </Box>
                  <Box
                    softShadow="1"
                    width={'100%'}
                    bgColor={mode ? '#171717' : 'white'}
                    padding={16}
                    borderRadius={10}>
                    <VStack space="md">
                      <HStack
                        alignItems="center"
                        justifyContent="space-between">
                        <TextHeading>Item Request</TextHeading>
                        <Button
                          size="sm"
                          borderRadius={10}
                          onPress={handleAddForm}>
                          <ButtonText>Add Form</ButtonText>
                        </Button>
                      </HStack>
                      <VStack space="md">
                        {itemData.map((list, keys) => (
                          <VStack key={keys} space="3xl">
                            <HStack alignItems="center" space="md">
                              <InputDefault
                                changeText={value =>
                                  handleItemChange(value, keys)
                                }
                                defaultValue={list?.item_name}
                                width={'85%'}
                              />

                              <TouchableOpacity
                                onPress={() => handleRemoveForm(keys)}>
                                <View
                                  bgColor="$rose500"
                                  padding={10}
                                  borderRadius={10}>
                                  <IconCustom
                                    As={MaterialCommunityIcons}
                                    name="trash-can"
                                    size={20}
                                    color="white"
                                  />
                                </View>
                              </TouchableOpacity>
                            </HStack>
                          </VStack>
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                  <Box
                    softShadow="1"
                    width={'100%'}
                    bgColor={mode ? '#171717' : 'white'}
                    padding={16}
                    borderRadius={10}>
                    <VStack space="md">
                      <TextHeading>Notes</TextHeading>
                      <TextAreaCustom
                        size="md"
                        width={'100%'}
                        valueDefault={note}
                        valueChange={value => setNote(value)}
                      />
                    </VStack>
                  </Box>
                </>
              ) : (
                <Box
                  softShadow="1"
                  width={'100%'}
                  bgColor={mode ? '#171717' : 'white'}
                  padding={16}
                  borderRadius={10}>
                  <VStack space="md">
                    <TextHeading>Notes</TextHeading>
                    <TextAreaCustom
                      size="md"
                      width={'100%'}
                      valueDefault={note}
                      valueChange={value => setNote(value)}
                    />
                  </VStack>
                </Box>
              )}
            </VStack>

            <View mt={30}>
              <TouchableOpacity
                onPress={updateRequestFunc}
                style={{
                  backgroundColor: '#eab308',
                  padding: 10,
                  borderRadius: 10,
                }}>
                {saveLoad ? (
                  <Text color="white" textAlign="center">
                    Updating data <Spinner size="small" />
                  </Text>
                ) : (
                  <Text color="white" textAlign="center">
                    Save Request
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <VStack alignItems="center" mt={20}>
            <Spinner size="small" />
            {/* <Text size="xs">Data No Available</Text> */}
          </VStack>
        )}
      </ScrollView>
    </SafeAreaCustom>
  );
};

export {EditFormRequest};
