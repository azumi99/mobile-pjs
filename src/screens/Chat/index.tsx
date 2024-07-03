import React, {useCallback, useEffect, useState} from 'react';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  HStack,
  Heading,
  Icon,
  ScrollView,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';
import {TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {TextHeading} from '@components/textHeading';
import {ChatInterface} from '@services/Chat/interface';
import {UserStore} from '@config/store';
import {chatServices, deleteChat} from '@services/Chat/services';
import {baseURL} from '@config/intance';
import userInterface from '@services/User/interface';
import Snackbar from 'react-native-snackbar';

const ChatScreen = () => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState<ChatInterface[]>([]);
  const {user} = UserStore();
  const errorFunc = (message: string) => {
    console.log(message);
  };
  const chatFunc = async () => {
    try {
      const response = await chatServices(errorFunc, user?.id);
      if (response.status) {
        setData(response.data);
      }
    } catch (error) {
      console.log('chatFunc error', error);
    }
  };

  const chatDeleteFunc = async (id?: number) => {
    try {
      const response = await deleteChat(errorFunc, id);
      if (response.status) {
        chatFunc();
      }
    } catch (error) {
      console.log('chatFunc error', error);
    }
  };
  const deleteActionFunc = (id?: number) => {
    Snackbar.show({
      text: 'You want delete this chat?',
      duration: 2000,
      action: {
        text: 'Delete',
        textColor: 'red',
        onPress: () => chatDeleteFunc(id),
      },
    });
  };

  useEffect(() => {
    chatFunc();
  }, []);
  useFocusEffect(
    useCallback(() => {
      chatFunc();
    }, []),
  );
  return (
    <SafeAreaCustom>
      <VStack flex={1} paddingHorizontal={16} paddingVertical={16}>
        <HStack alignItems="center" justifyContent="space-between" mb={10}>
          <TextHeading>Contact</TextHeading>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StackNav', {screen: 'ContactScreen'})
            }>
            <TextHeading style={{color: '#0077E6'}}>Add Chat</TextHeading>
          </TouchableOpacity>
        </HStack>
        <ScrollView>
          <VStack space="md">
            {data.map((value, key) => (
              <React.Fragment key={key}>
                {value.users.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onLongPress={() => deleteActionFunc(value.id)}
                    onPress={() =>
                      navigation.navigate('StackNav', {
                        screen: 'DetailChat',
                        params: {
                          name: item.name,
                          id: value.id,
                          avatar: item.url,
                        },
                      })
                    }>
                    <Box bg="$primary500" p="$5" borderRadius={10}>
                      <HStack space="md">
                        <Avatar>
                          <AvatarFallbackText>{item.name}</AvatarFallbackText>
                          {(item.url?.length as number) > 0 && (
                            <AvatarImage
                              alt={item?.name}
                              source={{
                                uri: `${baseURL}${item.url}`,
                              }}
                            />
                          )}
                        </Avatar>
                        <VStack>
                          <Heading size="sm" color="white">
                            {item.name}
                          </Heading>
                          <Text size="sm" color="white">
                            {item.role}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                ))}
              </React.Fragment>
            ))}
          </VStack>
        </ScrollView>
      </VStack>
    </SafeAreaCustom>
  );
};

export {ChatScreen};
