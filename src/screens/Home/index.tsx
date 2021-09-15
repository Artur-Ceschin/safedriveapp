import React, { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Text } from 'react-native';
import cardImage from '../../assets/card.png';
import api from '../../api';
import { Stack, Center, Image, Box } from 'native-base';
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

  useEffect(() => {
    api
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
              backgroundColor: 'gray.300',
            }}
          >
            <Text>{homeData.driverScore}</Text>
          </Center>
          <Center
            width="40%"
            height={150}
            shadow={1}
            _light={{
              backgroundColor: 'gray.300',
            }}
          >
            <Text>{homeData.bonusesAvailable}</Text>
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
              backgroundColor: 'gray.300',
            }}
          >
            <Text>{homeData.achievements}</Text>
          </Center>
          <Center
            width="40%"
            height={150}
            shadow={1}
            _light={{
              backgroundColor: 'gray.300',
            }}
          >
            <Text>{homeData.tripsCompleted}</Text>
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
              backgroundColor: 'gray.300',
            }}
          >
            <Text>{homeData.registeredAlerts}</Text>
          </Center>
          <Center
            width="40%"
            height={150}
            shadow={1}
            _light={{
              backgroundColor: 'gray.300',
            }}
          >
            Teste
          </Center>
        </Stack>
      </Stack>
    </>
  );
}
