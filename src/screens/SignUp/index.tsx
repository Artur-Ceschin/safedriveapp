import {
  Box,
  Center,
  Input,
  Stack,
  Select,
  CheckIcon,
  Button,
  Image,
  Heading,
  Text,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { Header } from '../../components/Header';
import profileImg from '../../assets/profile.jpg';
import { profileApi } from '../../api/index';

export function SignUp() {
  let [language, setLanguage] = React.useState('');
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Header title="Cadastro de motoristas" />
      <ScrollView>
        <Stack space={4} w="100%" mt={10} my={10}>
          <Center mx={30}>
            <Input
              w="100%"
              size="md"
              variant="outline"
              placeholder="Digite seu nome"
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
              placeholder="Email"
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
              placeholder="Data de Nascimento"
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
              placeholder="Você é um motorista profissional ?"
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
            <Select
              selectedValue={language}
              mt={3}
              minWidth={335}
              placeholder="Você dirige profissionalmente?"
              onValueChange={(itemValue) => setLanguage(itemValue)}
              _selectedItem={{
                bg: 'cyan.600',
                endIcon: <CheckIcon size={4} />,
              }}
            >
              <Select.Item label="Sim" value="true" />
              <Select.Item label="Não" value="false" />
            </Select>
            <Input
              w="100%"
              size="md"
              mt={3}
              variant="outline"
              keyboardType="numbers-and-punctuation"
              placeholder="CPF"
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
              keyboardType="numbers-and-punctuation"
              placeholder="CNH"
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
              keyboardType="numeric"
              variant="outline"
              placeholder="Validade da CNH"
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
              placeholder="Seguradora"
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
              placeholder="Empresa"
              _light={{
                placeholderTextColor: 'blueGray.400',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />

            <Input
              mt={3}
              type={show ? 'text' : 'password'}
              InputRightElement={
                <Button
                  ml={1}
                  roundedLeft={0}
                  roundedRight="md"
                  onPress={handleClick}
                >
                  {show ? 'Esconder' : 'Mostrar'}
                </Button>
              }
              placeholder="Senha"
            />
          </Center>
          <Button.Group mx={30} mt="5" variant="solid" isAttached space={6}>
            <Button colorScheme="primary" mr={2}>
              Salvar
            </Button>
          </Button.Group>
        </Stack>
      </ScrollView>
    </>
  );
}
