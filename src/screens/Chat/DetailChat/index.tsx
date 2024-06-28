import {MessageStore} from '@config/store';
import {View} from '@gluestack-ui/themed';
import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import messaging from '@react-native-firebase/messaging';

const DetailChat = () => {
  const initialMessages = [
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'React Native',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      },
    },
    {
      _id: '9c0f108b-92b7-433d-ac24-20a2860da0f0',
      createdAt: '2024-06-21T17:30:40.664Z',
      text: 'Test',
      user: {
        _id: 2,
        name: 'React Native',
        avatar:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      },
    },
  ];
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const {messageData} = MessageStore();
  console.log('test', messageData);

  useEffect(() => {
    // messaging().onMessage(async remoteMessage => {
    //   setMessages([...initialMessages, ...messageData]);
    //   console.log('helo', remoteMessage);
    // });
    setMessages([...messageData, ...messages]);
  }, [messageData]);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    console.log(messages);
  }, []);

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
