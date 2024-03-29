import React from 'react';
import {Text, VStack, View} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';

const HomeScreen = () => {
  return (
    <SafeAreaCustom>
      <View flex={1} justifyContent="center">
        <Text>Home</Text>
      </View>
    </SafeAreaCustom>
  );
};

export {HomeScreen};
