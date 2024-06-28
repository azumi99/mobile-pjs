import React, {useCallback, useEffect, useState} from 'react';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Badge,
  BadgeText,
  Box,
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  HStack,
  Heading,
  ScrollView,
  Spinner,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';
import {TextHeading} from '@components/textHeading';
import {RequestInterface} from '@services/Request/interface';
import {
  deleteRequest,
  getRequestId,
  updateRequestItem,
  updateStatusRequest,
} from '@services/Request/services';
import {TouchableOpacity} from 'react-native';
import {
  ActionEditStore,
  DarkModeStore,
  UserStore,
  navigateIdRequestStore,
} from '@config/store';
import {ActionEdit} from '@components/actionRequest';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {baseURL} from '@config/intance';
import Snackbar from 'react-native-snackbar';
interface itemInterface {
  item_name: string;
  status: 'active' | 'inactive' | string;
}
const DetailsRequest = () => {
  const [values, setValues] = useState(['']);
  const {user} = UserStore();
  const navigation = useNavigation<any>();
  const {mode} = DarkModeStore();
  const {idNav} = navigateIdRequestStore();
  const [data, setData] = useState<RequestInterface[]>([]);
  const [items, setItems] = useState<itemInterface[]>([]);
  console.log(items);
  const errorFunc = (message: string) => {
    console.log(message);
  };
  const getRequestFunc = async () => {
    try {
      const response = await getRequestId(errorFunc, idNav);
      if (response?.status) {
        setData(response?.data);
        response.data.map(value => {
          setItems(JSON.parse(value.item_request));
        });
      }
    } catch (error) {
      console.log('getRequestFunc error conection');
    }
  };
  const deleteRequestFunc = async () => {
    try {
      const response = await deleteRequest(errorFunc, idNav);
      if (response?.status) {
        navigation.goBack();
        Snackbar.show({
          text: response.message,
          backgroundColor: '#348352',
          duration: 1500,
        });
      }
    } catch (error) {
      console.log('getRequestFunc error conection');
    }
  };
  useFocusEffect(
    useCallback(() => {
      getRequestFunc();
    }, []),
  );
  const handleItemChange = (value: string, index: number, isChecked) => {
    if (isChecked) {
      const updatedData = [...items];
      updatedData[index].status = value;
      setItems(updatedData);
      updateRequestItemFunc();
    }
  };
  interface itemInterfaceUpdate {
    item_request: string;
  }
  const updateRequestItemFunc = async () => {
    const params: itemInterfaceUpdate = {
      item_request: JSON.stringify(items) as string,
    };
    try {
      const response = await updateRequestItem(errorFunc, idNav, params);
      if (response?.status) {
        getRequestFunc();
        Snackbar.show({
          text: response.message,
          backgroundColor: '#348352',
          duration: 1500,
        });
      }
    } catch (error) {
      console.log('getRequestFunc error conection');
    }
  };
  interface statusInterface {
    status: string;
  }
  const updateRequestStatusFunc = async (value: string) => {
    const params: statusInterface = {
      status: value,
    };
    try {
      const response = await updateStatusRequest(errorFunc, idNav, params);
      if (response?.status) {
        getRequestFunc();
        Snackbar.show({
          text: response.message + ' ' + value,
          backgroundColor: '#348352',
          duration: 1500,
        });
      }
    } catch (error) {
      console.log('updateRequestStatusFunc error conection', error);
    }
  };
  return (
    <SafeAreaCustom>
      <ScrollView flex={1}>
        {data?.length > 0 ? (
          <View paddingHorizontal={16} marginVertical={16}>
            {data.map((value, key) => {
              const parsedDate = new Date(value.created_at);
              return (
                <VStack space="xl" key={key}>
                  <ActionEdit
                    id={idNav}
                    deleteAction={deleteRequestFunc}
                    updateAction={value => updateRequestStatusFunc(value)}
                    statusDetail={value.status}
                  />
                  <Box
                    width={'100%'}
                    bgColor={mode ? '#171717' : 'white'}
                    padding={16}
                    borderRadius={10}
                    softShadow="1">
                    <VStack space="md">
                      <TextHeading>{value?.title_job}</TextHeading>
                      <HStack space="md">
                        <Text>Status :</Text>
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
                          <BadgeText>{value?.status}</BadgeText>
                        </Badge>
                      </HStack>
                      <HStack space="md">
                        <Text>Request By :</Text>
                        <Text>{value?.by_request}</Text>
                      </HStack>
                      <HStack space="md">
                        <Text>Do date :</Text>
                        <Text>{value?.do_date}</Text>
                      </HStack>
                      <HStack space="md">
                        <Text>Created at :</Text>
                        <Text>
                          {parsedDate.toLocaleDateString('en-US', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </Text>
                      </HStack>
                      <VStack space="md">
                        <Text>Member :</Text>
                        <VStack space="xs">
                          {value?.member.map((item, index) => (
                            <HStack space="md" key={index} alignItems="center">
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
                          ))}
                        </VStack>
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
                      <TextHeading>Item Request</TextHeading>
                      <CheckboxGroup
                        value={values}
                        onChange={keys => {
                          setValues(keys);
                        }}>
                        <VStack space="md">
                          {JSON.parse(value?.item_request).map((list, keys) => (
                            <Checkbox
                              value={list?.item_name}
                              aria-label={list?.item_name}
                              isDisabled={
                                value?.status === 'Waiting' ||
                                value?.status === 'Done' ||
                                value?.status === 'Cancel' ||
                                (user?.role === 'user' &&
                                  list?.status === 'inactive' &&
                                  true)
                                  ? true
                                  : false
                              }
                              isChecked={
                                list?.status === 'active' ? true : false
                              }
                              onChange={isChecked => {
                                user?.role === 'admin' &&
                                  handleItemChange('active', keys, isChecked);
                              }}
                              key={keys}>
                              <CheckboxIndicator mr="$2">
                                <CheckboxIcon as={CheckIcon} />
                              </CheckboxIndicator>
                              <CheckboxLabel>{list?.item_name}</CheckboxLabel>
                            </Checkbox>
                          ))}
                        </VStack>
                      </CheckboxGroup>
                    </VStack>
                  </Box>
                  <Box
                    softShadow="1"
                    width={'100%'}
                    bgColor={mode ? '#171717' : 'white'}
                    padding={16}
                    borderRadius={10}>
                    <TextHeading>Note</TextHeading>
                    <Text>{value?.notes}</Text>
                  </Box>
                </VStack>
              );
            })}
          </View>
        ) : (
          <VStack alignItems="center" mt={20}>
            <Spinner size="small" />
            {/* <Text size="xs">Data No Available</Text> */}
          </VStack>
        )}
      </ScrollView>
      {/* <View paddingHorizontal={40} bottom={20}>
        <TouchableOpacity
          style={{backgroundColor: '#eab308', padding: 10, borderRadius: 10}}>
          <Text color="white" textAlign="center">
            Save Request
          </Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaCustom>
  );
};

export {DetailsRequest};
