import React, {useState} from 'react';
import {
  Badge,
  BadgeText,
  Box,
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
  HStack,
  ScrollView,
  Text,
  VStack,
  View,
} from '@gluestack-ui/themed';
import SafeAreaCustom from '@components/safeArea';
import {TextHeading} from '@components/textHeading';

const DetailsRequest = () => {
  const [values, setValues] = useState(['']);
  console.log(values);
  return (
    <SafeAreaCustom>
      <ScrollView flex={1}>
        <VStack paddingHorizontal={16} marginVertical={16} space="xl">
          <Box
            width={'100%'}
            bgColor="white"
            padding={16}
            borderRadius={10}
            softShadow="1">
            <VStack space="md">
              <TextHeading>Pembangunan Trotoar Kecil</TextHeading>
              <HStack space="md">
                <Text>Status :</Text>
                <Badge
                  size="md"
                  variant="solid"
                  borderRadius="$md"
                  action="warning">
                  <BadgeText>waiting</BadgeText>
                </Badge>
              </HStack>
              <HStack space="md">
                <Text>Request By :</Text>
                <Text>Nana M</Text>
              </HStack>
              <HStack space="md">
                <Text>Do date :</Text>
                <Text>23-08-2024</Text>
              </HStack>
              <HStack space="md">
                <Text>Member :</Text>
                <VStack>
                  <Text>Nana</Text>
                  <Text>Mona</Text>
                  <Text>Lala</Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
          <Box
            softShadow="1"
            width={'100%'}
            bgColor="white"
            padding={16}
            borderRadius={10}>
            <VStack space="md">
              <TextHeading>Item Request</TextHeading>
              <CheckboxGroup
                value={values}
                onChange={keys => {
                  setValues(keys);
                }}>
                <VStack space="md">
                  <Checkbox value="Besi" aria-label="Besi">
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Besi 5 Kubik</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="Semen" aria-label="Semen">
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Semen 5 Karung</CheckboxLabel>
                  </Checkbox>
                  <Checkbox value="Batu" aria-label="adBatuobe">
                    <CheckboxIndicator mr="$2">
                      <CheckboxIcon as={CheckIcon} />
                    </CheckboxIndicator>
                    <CheckboxLabel>Batu 5 Kubik</CheckboxLabel>
                  </Checkbox>
                </VStack>
              </CheckboxGroup>
            </VStack>
          </Box>
          <Box
            softShadow="1"
            width={'100%'}
            bgColor="white"
            padding={16}
            borderRadius={10}>
            <TextHeading>Note</TextHeading>
            <Text>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry
            </Text>
          </Box>
        </VStack>
      </ScrollView>
    </SafeAreaCustom>
  );
};

export {DetailsRequest};
