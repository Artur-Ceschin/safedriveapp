import React from 'react';
import { Header } from '../../components/Header';
import { Text } from 'react-native';
import cardImage from '../../assets/card.png';
import { Stack, Center, Image, Box } from 'native-base';
export function Home() {
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
            Teste
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
            Teste
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
            Teste
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