import {MessageStore, UserStore} from '@config/store';
import {View} from '@gluestack-ui/themed';
import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import messaging from '@react-native-firebase/messaging';
import {
  chatDetailSave,
  chatDetailServices,
  chatSave,
} from '@services/Chat/services';
import {baseURL} from '@config/intance';
import {detailChatInterface} from '@services/Chat/interface';

const DetailChat = ({route}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const {messageData} = MessageStore();
  const {user} = UserStore();
  console.log('test', messageData);
  const errorFunc = (message: string) => {
    console.log(message);
  };
  const getChatDetailFunc = async () => {
    try {
      const response = await chatDetailServices(errorFunc, route?.params?.id);
      console.log('test mm');
      if (response.status) {
        const messageDb = response.data.map(value => ({
          _id: value.id,
          text: value.message,
          createdAt: value.created_at,
          user: {
            _id: value.id_user === user?.id ? 1 : 0,
            name: value.name,
            avatar: `${baseURL}${route?.params?.avatar}`,
          },
        }));
        setMessages(messageDb);
      }
    } catch (error) {
      console.log('getChatDetailFunc conection error', error);
    }
  };
  const saveChatDetailFunc = async (message: string) => {
    const param: detailChatInterface = {
      id_chat: route?.params?.id,
      id_user: user?.id,
      _id: 1,
      message: message,
    };
    try {
      if (messages.length < 2) {
        const saveChat = await chatSave(
          errorFunc,
          `[${user?.id}, ${route?.params?.userId}]`,
        );
        if (!saveChat.found) {
          const params: detailChatInterface = {
            id_chat: saveChat.data.id,
            id_user: user?.id,
            _id: 1,
            message: message,
          };
          await chatDetailSave(errorFunc, params);
        }
      } else {
        await chatDetailSave(errorFunc, param);
      }
    } catch (error) {
      console.log('saveChatDetailFunc conection error', error);
    }
  };
  useEffect(() => {
    getChatDetailFunc();
  }, [messageData]);
  console.log('test message', messageData);
  // useEffect(() => {
  //   setMessages([...messageData, ...messages]);
  // }, [messageData]);

  const onSend = useCallback(
    (messages: any = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
      console.log('ttt', messages[0]?.text);
      saveChatDetailFunc(messages[0]?.text);
    },
    [messages],
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages: any) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export {DetailChat};
