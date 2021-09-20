import { Center, Input, Stack, Image, Text } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Header } from '../../components/Header';
import profileImg from '../../assets/profile.jpg';
import { profileApi } from '../../api/index';
import { useFocusEffect, useNavigation } from '@react-navigation/core';

interface ProfileData {
  name?: string;
  emailAddress?: string;
  password?: string;
  phoneNumber?: number;
  birthDate?: Date;
  documentNumber?: number;
  driversLicenseNumber?: number;
  driverLicenseExpireDate?: number;
  isProfessionalDriver?: boolean;
  automotiveInsuranceProvider?: string;
}

export function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>({});

  const {goBack} = useNavigation();

  useEffect(() => {
    async function getData(){
      await profileApi.get('/9ac3a29c-a0e8-4107-a540-005bdab6a7ac').then((response) => {
        setProfileData(response.data);
        console.log(`A resposta foi: ${response.data}`)
      });
    } 
    
    getData();
  }, []);

  useFocusEffect(useCallback(() => {
    async function getData(){
      await profileApi.get('/9ac3a29c-a0e8-4107-a540-005bdab6a7ac').then((response) => {
        setProfileData(response.data);
        console.log(`A resposta foi: ${response.data}`)
      });
    } 
    
    getData();
  },[]));
  

  return (
    <>
      <Header title="Cadastro de Usuário" />
      <ScrollView>
        <Stack space={4} w="100%" mt={10} my={10}>
          <Center mx={30}>
            <Image
              size={65}
              resizeMode={'contain'}
              borderRadius={500}
              source={profileImg}
              alt="Profile imgage"
            />
            <Text my={3} bold>
              {profileData.name}
            </Text>
            <Input
              w="100%"
              size="md"
              isDisabled={true}
              variant="outline"
              value={profileData.name}
              keyboardType="email-address"
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Input
              w="100%"
              mt={3}
              isDisabled={true}
              size="md"
              variant="outline"
              value={profileData.emailAddress}
              keyboardType="email-address"
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Input
              w="100%"
              mt={3}
              size="md"
              variant="outline"
              isDisabled={true}
              value={profileData.birthDate}
              keyboardType="phone-pad"
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Input
              w="100%"
              size="md"
              mt={3}
              variant="outline"
              isDisabled={true}
              value={profileData.phoneNumber}
              placeholder="Telefone"
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Input
              w="100%"
              size="md"
              mt={3}
              isDisabled={true}
              variant="outline"
              value={
                'Motorista profissional: ' +
                (profileData.isProfessionalDriver ? 'Sim' : 'Não')
              }
              placeholder="Você é um motorista profissional ?"
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Input
              w="100%"
              size="md"
              mt={3}
              variant="outline"
              isDisabled={true}
              keyboardType="numbers-and-punctuation"
              value={profileData.documentNumber}
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Input
              w="100%"
              size="md"
              mt={3}
              variant="outline"
              isDisabled={true}
              keyboardType="numbers-and-punctuation"
              value={profileData.driversLicenseNumber}
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Input
              w="100%"
              size="md"
              mt={3}
              isDisabled={true}
              keyboardType="numeric"
              value={profileData.driverLicenseExpireDate}
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Input
              w="100%"
              size="md"
              mt={3}
              isDisabled={true}
              variant="outline"
              keyboardType="numbers-and-punctuation"
              value={profileData.automotiveInsuranceProvider}
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
          </Center>
        </Stack>
      </ScrollView>
    </>
  );
}
