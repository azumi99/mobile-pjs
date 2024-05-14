import React from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {TextHeading} from '@components/textHeading';

const ChatScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaCustom>
      <ScrollView flex={1} paddingHorizontal={16} paddingVertical={16}>
        <VStack space="md">
          <TextHeading>Contact</TextHeading>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StackNav', {
                screen: 'DetailChat',
                param: {name: 'Ronald Richards'},
              })
            }>
            <Box bg="$primary500" p="$5" borderRadius={10}>
              <HStack space="md">
                <Avatar>
                  <AvatarFallbackText>RR</AvatarFallbackText>
                  <AvatarImage
                    alt="image"
                    source={{
                      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                    }}
                  />
                </Avatar>
                <VStack>
                  <Heading size="sm" color="white">
                    Ronald Richards
                  </Heading>
                  <Text size="sm" color="white">
                    Admin
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StackNav', {
                screen: 'DetailChat',
                param: {name: 'Arlene McCoy'},
              })
            }>
            <Box bg="$primary500" p="$5" borderRadius={10}>
              <HStack space="md">
                <Avatar>
                  <AvatarFallbackText>AA</AvatarFallbackText>
                  <AvatarImage
                    alt="image"
                    source={{
                      uri: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    }}
                  />
                </Avatar>
                <VStack>
                  <Heading size="sm" color="white">
                    Arlene McCoy
                  </Heading>
                  <Text size="sm" color="white">
                    Admin
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </TouchableOpacity>
        </VStack>
      </ScrollView>
    </SafeAreaCustom>
  );
};

export {ChatScreen};
