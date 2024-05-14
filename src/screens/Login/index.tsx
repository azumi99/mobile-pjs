import {InputDefault} from '@components/input/inputDefault';
import {InputPassword} from '@components/input/inputPassword';
import SafeAreaCustom from '@components/safeArea';
import {TextHeading} from '@components/textHeading';
import {Button, ButtonText, Text, VStack, View} from '@gluestack-ui/themed';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = () => {
    console.log('validateEmail 32');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = password.length > 5;

    setIsValid(!isValidEmail);
    setIsValidPassword(!isValidPassword);
    isValidEmail &&
      isValidPassword &&
      navigation.navigate('TabNav', {screen: 'Home'});
  };

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };
  const fetchData = () => {
    setLoading(true);
    // setTimeout(() => {
    validateEmail();
    setLoading(false);
    // }, 100);
  };
  return (
    <SafeAreaCustom>
      <View flex={1} justifyContent="center">
        <VStack space="xl" paddingHorizontal={16}>
          <VStack mb={40}>
            <TextHeading size="3xl">Login</TextHeading>
            <Text>Welcome back, Sign in to your account</Text>
          </VStack>
          <InputDefault
            size="xl"
            label={'Email'}
            changeText={value => {
              setEmail(value);
            }}
            placeHolder="e.g Olivia@gmail.com"
            borderColor="#ECEFF3"
            value={email}
            fieldInput="email-address"
            isValid={isValid}
          />
          <InputPassword
            size="xl"
            isValid={isValidPassword}
            label={'Password'}
            show={showPassword}
            handle={handleState}
            value={password}
            borderColor="#ECEFF3"
            iconColor="#C1C7D0"
            onChange={value => setPassword(value)}
          />

          <Button
            size="xl"
            variant="solid"
            action="primary"
            borderRadius={20}
            h={55}
            isDisabled={loading}
            mt={20}
            onPress={() => {
              fetchData();
              console.log('buttonLogin 115');
            }}>
            <ButtonText>Login</ButtonText>
          </Button>
        </VStack>
      </View>
    </SafeAreaCustom>
  );
};

export {LoginScreen};
