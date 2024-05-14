import React from 'react';
import {
  Avatar,
  AvatarGroup,
  AvatarImage,
  Badge,
  BadgeText,
  Box,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';
import {dataListHistory} from '@screens/Home/DataDummy';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextHeading} from '@components/textHeading';

const HistoryScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaCustom>
      <View flex={1} paddingHorizontal={16} marginVertical={16}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {dataListHistory.length > 0 ? (
            <VStack space="md">
              {dataListHistory.map((value, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('StackNav', {screen: 'DetailsRequest'})
                  }>
                  <Box bg="$primary500" p="$5" borderRadius={10}>
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
                            action={
                              value.status === 'done'
                                ? 'success'
                                : value.status === 'cancel'
                                ? 'error'
                                : value.status === 'waiting'
                                ? 'warning'
                                : value.status === 'processing'
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
            </VStack>
          ) : (
            <Text size="xs">Data No Available</Text>
          )}
        </ScrollView>
      </View>
    </SafeAreaCustom>
  );
};

export {HistoryScreen};
