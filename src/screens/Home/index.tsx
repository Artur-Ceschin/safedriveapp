import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import cardImage from '../../assets/card.png';
import { homeApi } from '../../api';
import { Stack, Center, Image, Box, Text } from 'native-base';
import axios from 'axios';

interface Home {
  driverScore: number;
  tripsCompleted: number;
  achievements: number;
  bonusesAvailable: number;
  registeredAlerts: number;
}

export function Home() {
  const [homeData, setHomeData] = useState<Home>({});
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  useEffect(() => {
    homeApi
      .get('/9ac3a29c-a0e8-4107-a540-005bdab6a7ac/statistics')
      .then((response) => {
        setHomeData(response.data);
      });
  }, []);

  return (
    <>
      <Header title="Home" />
      <Stack alignItems="center" mt={10}>
        <Stack
          direction="row"
          space={3}
          mb={3}
          alignItems="center"
          style={{ flexWrap: 'wrap' }}
          justifyContent="center"
        >
          <Center
            width="40%"
            height={150}
            shadow={1}
            _light={{
              backgroundColor: 'gray.100',
            }}
          >
            <Text fontSize="xl" bold style={{ color: '#3f8ae0' }}>
              Seus pontos
            </Text>
            <Text fontSize="2xl" bold>
              {homeData.driverScore}
            </Text>
          </Center>
          <Center
            width="40%"
            height={150}
            shadow={1}
            _light={{
              backgroundColor: 'gray.100',
            }}
          >
            <Text fontSize="xl" bold style={{ color: '#3f8ae0' }}>
              Bônus Disponíveis
            </Text>
            <Text fontSize="2xl" bold>
              {homeData.bonusesAvailable}
            </Text>
          </Center>
        </Stack>
        <Stack
          direction="row"
          space={3}
          mb={3}
          alignItems="center"
          style={{ flexWrap: 'wrap' }}
          justifyContent="center"
        >
          <Center
            width="40%"
            height={150}
            shadow={1}
            _light={{
              backgroundColor: 'gray.100',
            }}
          >
            <Text fontSize="xl" bold style={{ color: '#3f8ae0' }}>
              Conquistas
            </Text>
            <Text fontSize="2xl" bold>
              {homeData.achievements}
            </Text>
          </Center>
          <Center
            width="40%"
            height={150}
            shadow={1}
            _light={{
              backgroundColor: 'gray.100',
            }}
          >
            <Text fontSize="xl" bold style={{ color: '#3f8ae0' }}>
              Viagens finalizadas
            </Text>
            <Text fontSize="2xl" bold>
              {homeData.tripsCompleted}
            </Text>
          </Center>
        </Stack>
        <Stack
          direction="row"
          space={3}
          mb={3}
          alignItems="center"
          style={{ flexWrap: 'wrap' }}
          justifyContent="center"
        >
          <Center
            width="40%"
            height={150}
            shadow={1}
            _light={{
              backgroundColor: 'gray.100',
            }}
          >
            <Text fontSize="xl" bold style={{ color: '#3f8ae0' }}>
              Registro de alertas
            </Text>
            <Text fontSize="2xl" bold>
              {homeData.registeredAlerts}
            </Text>
          </Center>
        </Stack>
      </Stack>
    </>
  );
}
