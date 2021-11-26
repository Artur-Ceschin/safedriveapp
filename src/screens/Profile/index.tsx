import { Center, Input, Stack, Image, Text, Toast, Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleProp, TextStyle, } from 'react-native';
import { Header } from '../../components/Header';
import profileImg from '../../assets/profile.jpg';
import { driverApi } from '../../api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import LabelText from '../../components/LabelText';

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
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  async function fetchData() {
    try {
      const uuid = JSON.parse(await AsyncStorage.getItem('@safeDriver:id') as string);
      const response = await driverApi.get(`/${uuid}`);
      setProfileData(response.data);
    } catch (error: any) {
      Toast.show({
        title: 'Houve um problema ao carregar os seus dados',
        description: error.data?.message || error.message,
        status: 'error',
      });
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Header title="Perfil" />
        <Stack alignItems="center" justifyContent="center" height="80%" mt={10}>
          <ActivityIndicator size={36} color="black" />
        </Stack>
      </>
    )
  }

  return (
    <>
      <Header title="Perfil" />
      <ScrollView>
        <Stack space={4} w="100%" mt={4}>
          <Center mx={4}>
            <Image
              size={65}
              resizeMode={'contain'}
              borderRadius={500}
              source={profileImg}
              alt="Profile imgage"
            />

            <Text my={1} bold>
              {profileData.name}
            </Text>

            <LabelText style={{marginTop: 0}}>Nome</LabelText>
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

            <LabelText>Email</LabelText>
            <Input
              w="100%"
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

            <LabelText>Telefone</LabelText>
            <Input
              w="100%"
              size="md"
              variant="outline"
              isDisabled={true}
              value={profileData.phoneNumber && ("" + profileData.phoneNumber) || ""}
              placeholder="Telefone"
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />

            <LabelText>Motorista Profisional</LabelText>
            <Input
              w="100%"
              size="md"
              isDisabled={true}
              variant="outline"
              value={
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

            <LabelText>CPF</LabelText>
            <Input
              w="100%"
              size="md"
              variant="outline"
              isDisabled={true}
              keyboardType="numbers-and-punctuation"
              value={profileData.documentNumber && ("" + profileData.documentNumber) || ""}
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />

            <LabelText>CNH</LabelText>
            <Input
              w="100%"
              size="md"
              variant="outline"
              isDisabled={true}
              keyboardType="numbers-and-punctuation"
              value={profileData.driversLicenseNumber && ("" + profileData.driversLicenseNumber) || ""}
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />

            <LabelText>Seguradora</LabelText>
            <Input
              w="100%"
              size="md"
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

          <Button
            onPress={() => {
              navigation.navigate('Sair');
            }}
            colorScheme="primary"
            size="lg"
            mx={4}
            my={4}
          >
            SAIR
          </Button>
        </Stack>
      </ScrollView>
    </>
  );
}
