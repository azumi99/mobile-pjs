import React from 'react';
import {Text, VStack, View} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';

const ApprovalScreen = () => {
  return (
    <SafeAreaCustom>
      <View flex={1} justifyContent="center">
        <Text>Approval</Text>
      </View>
    </SafeAreaCustom>
  );
};

export {ApprovalScreen};
