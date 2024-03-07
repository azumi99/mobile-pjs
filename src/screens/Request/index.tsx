import React from 'react';
import {Text, VStack, View} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';

const RequestScreen = () => {
  return (
    <SafeAreaCustom>
      <View flex={1} justifyContent="center">
        <Text>Request</Text>
      </View>
    </SafeAreaCustom>
  );
};

export {RequestScreen};
