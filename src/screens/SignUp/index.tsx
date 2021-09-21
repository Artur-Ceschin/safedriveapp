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
// import profileImg from '../../assets/profile.jpg';
//import uuid from 'react-native-uuid';
import { profileApi } from '../../api/index';
import { useNavigation } from '@react-navigation/native';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';

interface SignUp {
  emailAddress: string;
  password: string;
  name: string;
  phoneNumber: string;
  birthDate: string;
  documentNumber: string;
  driversLicenseNumber: string;
  driverLicenseExpireDate: string;
  isProfessionalDriver: boolean;
  automotiveInsuranceProvider: string;
}

export function SignUp() {
  let [language, setLanguage] = React.useState('');
  const { navigate } = useNavigation();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: '' });
  const [birthDate, setBirthDate] = useState({ value: '', error: '' });
  const [documentNumber, setDocumentNumber] = useState({
    value: '',
    error: '',
  });
  const [driverLicense, setDriverLicense] = useState({ value: '', error: '' });
  const [driverLicenseDate, setDriverLicenseDate] = useState({
    value: '',
    error: '',
  });
  const [insuranceCompany, setInsuranceCompany] = useState({
    value: '',
    error: '',
  });

  const SignUpRequest = () => {
    try {
      console.log(
        `DADOS: ${name.value}, ${email.value}, ${password.value}, ${phoneNumber.value},
          ${documentNumber.value}, ${driverLicense.value},
        ${insuranceCompany.value}`
      );
      profileApi
        .post(``, {
          name: name.value,
          emailAddress: email.value,
          password: password.value,
          phoneNumber: phoneNumber.value,
          birthDate: '2021-09-20T23:57:10.583Z',
          documentNumber: documentNumber.value,
          driversLicenseNumber: driverLicense.value,
          driverLicenseExpireDate: '2021-09-20T23:57:10.583Z',
          isProfessionalDriver: true,
          automotiveInsuranceProvider: insuranceCompany.value,
        })
        .then((response) => {
          console.log(response.data.driverUUID);
          navigate('Profile', { uuid: response.data.driverUUID });
        });
    } catch (error) {
      console.log(error);
    }
  };

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
  };

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
              onChangeText={(text) => setName({ value: text, error: '' })}
              error={!!name.error}
              errorText={name.error}
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
              onChangeText={(text) => setEmail({ value: text, error: '' })}
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
              onChangeText={(text) =>
                setPhoneNumber({ value: text, error: '' })
              }
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
              mt={3}
              size="md"
              variant="outline"
              onChangeText={(text) =>
                setBirthDate({ value: new Date(text).toISOString(), error: '' })
              }
              placeholder="Data de Nascimento"
              keyboardType="phone-pad"
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
              onChangeText={(text) =>
                setDocumentNumber({ value: text, error: '' })
              }
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
              onChangeText={(text) =>
                setDriverLicense({ value: text, error: '' })
              }
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
              onChangeText={(text) =>
                setDriverLicenseDate({
                  value: new Date(text).toISOString(),
                  error: '',
                })
              }
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
              onChangeText={(text) =>
                setInsuranceCompany({ value: text, error: '' })
              }
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
              value={password.value}
              onChangeText={(text) => setPassword({ value: text, error: '' })}
              error={!!password.error}
              errorText={password.error}
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
            <Button colorScheme="primary" onPress={SignUpRequest} mr={2}>
              Salvar
            </Button>
          </Button.Group>
        </Stack>
      </ScrollView>
    </>
  );
}
