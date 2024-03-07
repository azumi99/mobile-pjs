import React from 'react';
import {
  Avatar,
  AvatarFallbackText,
  Center,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';
import {TextHeading} from '@components/textHeading';
import {IconCustom} from '@components/iconCustom';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaCustom>
      <ScrollView>
        <View paddingHorizontal={16}>
          <VStack>
            <VStack alignItems="center" mt={50} space="lg">
              <Avatar bgColor="$amber600" size="xl" borderRadius="$full">
                <AvatarFallbackText>Sandeep Srivastava</AvatarFallbackText>
              </Avatar>
              <VStack alignItems="center" space="xs">
                <TextHeading size="lg">Silvia Sifa</TextHeading>
                <Text>silviasifa0899@mail.com</Text>
              </VStack>
            </VStack>
            <View bgColor="#F6F8FA" padding={16} borderRadius={10} mt={20}>
              <TextHeading style={{marginBottom: 20}}>General</TextHeading>
              <VStack space="3xl">
                <TouchableOpacity>
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack alignItems="center" space="md">
                      <View
                        padding={10}
                        borderRadius={'$full'}
                        bgColor="#ECEFF3">
                        <MaterialIcons size={25} name={'mode-edit-outline'} />
                      </View>
                      <TextHeading>Edit Profile</TextHeading>
                    </HStack>
                    <MaterialIcons size={25} name={'chevron-right'} />
                  </HStack>
                </TouchableOpacity>
                <TouchableOpacity>
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack alignItems="center" space="md">
                      <View
                        padding={10}
                        borderRadius={'$full'}
                        bgColor="#ECEFF3">
                        <MaterialIcons size={25} name={'lock-reset'} />
                      </View>
                      <TextHeading>Change Password</TextHeading>
                    </HStack>
                    <MaterialIcons size={25} name={'chevron-right'} />
                  </HStack>
                </TouchableOpacity>
                <TouchableOpacity>
                  <HStack justifyContent="space-between" alignItems="center">
                    <HStack alignItems="center" space="md">
                      <View
                        padding={10}
                        borderRadius={'$full'}
                        bgColor="#ECEFF3">
                        <MaterialIcons size={25} name={'light-mode'} />
                      </View>
                      <TextHeading>Theme</TextHeading>
                    </HStack>
                    <MaterialIcons size={25} name={'chevron-right'} />
                  </HStack>
                </TouchableOpacity>
              </VStack>
            </View>
            <View bgColor="#F6F8FA" padding={16} borderRadius={10} mt={20}>
              <TextHeading style={{marginBottom: 20}}>Settings</TextHeading>
              <TouchableOpacity>
                <HStack justifyContent="space-between" alignItems="center">
                  <HStack alignItems="center" space="md">
                    <View padding={10} borderRadius={'$full'} bgColor="#ECEFF3">
                      <MaterialIcons size={25} name={'logout'} />
                    </View>
                    <TextHeading>Logout</TextHeading>
                  </HStack>
                  <MaterialIcons size={25} name={'chevron-right'} />
                </HStack>
              </TouchableOpacity>
            </View>
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaCustom>
  );
};

export {ProfileScreen};
