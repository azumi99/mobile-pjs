import {
  HStack,
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useRef} from 'react';
import {Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (counter < 100) {
        if (counter === 50) {
          setTimeout(() => {
            setCounter(prevCounter => prevCounter + 1);
          }, 700);
        } else {
          setCounter(prevCounter => prevCounter + 1);
        }
      }
    }, 10);
    if (counter === 100) {
      navigation.replace('LoginScreen');
    }

    return () => clearInterval(interval);
  }, [counter]);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View>
        <VStack alignSelf="center" space="4xl">
          <HStack alignItems="center" space="xs" justifyContent="center">
            <Image
              style={{width: 50, height: 50, alignSelf: 'center'}}
              source={require('../../../assets/logo/logo_company.png')}
            />
            <Text fontSize={30}>Request app</Text>
          </HStack>
          <Progress value={counter} w={300} h="$2" size="md">
            <ProgressFilledTrack h="$2" />
          </Progress>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

export {SplashScreen};
