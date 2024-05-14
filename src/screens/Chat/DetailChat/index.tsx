import {View} from '@gluestack-ui/themed';
import React, {useCallback} from 'react';
import {useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

const DetailChat = () => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
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
