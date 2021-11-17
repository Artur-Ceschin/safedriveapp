import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { driverApi } from '../../api';
import { Stack, Text, Box, IBoxProps, Toast } from 'native-base';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { IStackProps } from 'native-base/lib/typescript/components/primitives/Stack/Stack';
import { useNavigation, useRoute } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Home {
  driverScore: number;
  tripsCompleted: number;
  achievements: number;
  bonusesAvailable: number;
  registeredAlerts: number;
  news: number;
}

interface NavigationHomeParams {
  fromSignUp?: boolean;
  uuid?: string;
}

export function Home() {
  const [homeData, setHomeData] = useState<Home>();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();

  async function fetchData(uuid: string) {
    const response = await driverApi.get(`/${uuid}/statistics`);
    setHomeData(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);

    const { params }: {
      params?: NavigationHomeParams;
    } = route;

    if (params) {
      if (params.fromSignUp) {
        Toast.show({
          title: 'Conta criada com sucesso!',
          status: 'success',
        });
      }
    }
    
    AsyncStorage.getItem('@safeDriver:id').then(result => {
      result && fetchData(result);
    });
  }, []);

  if (isLoading) {
    return (
      <>
        <Header title="Home" />
        <Stack alignItems="center" justifyContent="center" height="80%" mt={10}>
          <ActivityIndicator size={36} color="black" />
        </Stack>
      </>
    )
  }

  return (
    <>
      <Header title="Home" />
      <Stack>
        <Row>
          <Card onPress={() => navigation.navigate('Bonus Disponíveis')}>
            <CardTitle>
              Bônus
            </CardTitle>
            <CardValue>
              {homeData?.bonusesAvailable}
            </CardValue>
          </Card>
          <Card onPress={() => { }}>
            <CardTitle>
              Score
            </CardTitle>
            <CardValue>
              {homeData?.driverScore}
            </CardValue>
          </Card>
        </Row>
        <Row>
          <Card onPress={() => { }}>
            <CardTitle>
              Viagens
            </CardTitle>
            <CardValue>
              {homeData?.tripsCompleted}
            </CardValue>
          </Card>
          <Card onPress={() => { }}>
            <CardTitle>
              Conquistas
            </CardTitle>
            <CardValue>
              {homeData?.achievements}
            </CardValue>
          </Card>
        </Row>
        <Row rowProps={{ width: '47%' }}>
          <Card onPress={() => navigation.navigate('Relatório de alertas')}>
            <CardTitle>
              Alertas
            </CardTitle>
            <CardValue>
              {homeData?.registeredAlerts}
            </CardValue>
          </Card>
        </Row>
      </Stack>
    </>
  );
}

const Row = ({ children, rowProps }: { children: React.ReactNode, rowProps?: IStackProps }) => (
  <Stack
    direction="row"
    space={2}
    marginTop={2}
    marginLeft={2}
    marginRight={2}
    marginBottom={0}
    {...rowProps}
  >
    {children}
  </Stack>
);

const Card = ({ children, boxProps, onPress }: { children: React.ReactNode, boxProps?: IBoxProps<null>, onPress: () => void }) => (
  <Box
    height="100%"
    flex={1}
    padding={8}
    rounded="lg"
    overflow="hidden"
    shadow={1}
    _light={{
      backgroundColor: 'gray.100',
    }}
    {...boxProps}
  >
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  </Box>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="md" fontWeight="400" style={{ color: '#6C6C6C' }}>
    {children}
  </Text>
);

const CardValue = ({ children }: { children: React.ReactNode }) => (
  <Text fontSize="4xl">
    {children}
  </Text>
);
