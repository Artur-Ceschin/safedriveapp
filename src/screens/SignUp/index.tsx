import {
  Center, Input, Stack, Select, CheckIcon, Button, HStack, Text, Switch, Icon, Toast, View
} from 'native-base';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '../../components/Header';

import { driverApi } from '../../api/index';
import { useNavigation } from '@react-navigation/native';

import DatePicker from 'react-native-datepicker';
import { Feather } from '@expo/vector-icons';
import moment from 'moment';
import LabelText from '../../components/LabelText';

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

export function SignUp({ updateUserStatusCallback }: { updateUserStatusCallback: () => void }) {
  const navigation = useNavigation();
  const [show, setShow] = React.useState(false);

  const [name, setName] = useState({ value: '', error: false });
  const [email, setEmail] = useState({ value: '', error: false });
  const [password, setPassword] = useState({ value: '', error: false });
  const [phoneNumber, setPhoneNumber] = useState({ value: '', error: false });
  const [documentNumber, setDocumentNumber] = useState({
    value: '',
    error: false,
  });
  const [driverLicense, setDriverLicense] = useState({ value: '', error: false });
  const [insuranceCompany, setInsuranceCompany] = useState({
    value: '',
    error: false,
  });
  const [birthDate, setBirthDate] = useState<{ value?: Date, error: boolean }>();
  const [driverLicenseExpire, setDriverLicenseExpire] = useState<{ value?: Date, error: boolean }>();

  const [isProfessionalDriver, setIsProfessionalData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleHidePassword = () => setShow(!show);

  async function saveId(jsonResponse: any) {
    await AsyncStorage.setItem('@safeDriver:id', jsonResponse);
  }

  function isMailValid(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function isBetweenRange(stringToTest: string, floor: number, roof: number) {
    return stringToTest && stringToTest.length > floor && stringToTest.length < roof;
  }

  const handleSignUp = () => {
    try {
      const nameError = !isBetweenRange(name.value, 5, 25);
      const birthDateError = !birthDate?.value;
      const documentNumberError = !isBetweenRange(documentNumber.value, 5, 25);
      const driverLicenseError = !isBetweenRange(driverLicense.value, 5, 41);
      const driverLicenseExpireDateError = !driverLicenseExpire?.value || moment(driverLicenseExpire?.value, "DD/MM/YYYY") < moment();
      const insuranceCompanyError = !isBetweenRange(insuranceCompany.value, 1, 256);
      const emailError = !isMailValid(email.value);
      const phoneNumberError = !isBetweenRange(phoneNumber.value, 5, 25);
      const passwordError = !isBetweenRange(password.value, 0, 64);

      const hasError = nameError ||
        birthDateError ||
        documentNumberError ||
        driverLicenseError ||
        driverLicenseExpireDateError ||
        insuranceCompanyError ||
        emailError ||
        phoneNumberError ||
        passwordError;

      if (hasError) {
        setName({ ...name, error: nameError });
        setBirthDate({ ...birthDate, error: birthDateError });
        setDocumentNumber({ ...documentNumber, error: documentNumberError });
        setDriverLicense({ ...driverLicense, error: driverLicenseError });
        setDriverLicenseExpire({ ...driverLicenseExpire, error: driverLicenseExpireDateError });
        setInsuranceCompany({ ...insuranceCompany, error: insuranceCompanyError });
        setEmail({ ...email, error: emailError });
        setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
        setPassword({ ...password, error: passwordError });
        return;
      }

      setIsLoading(true);
      driverApi
        .post(``, {
          name: name.value,
          emailAddress: email.value,
          password: password.value,
          phoneNumber: phoneNumber.value,
          birthDate: birthDate?.value?.toISOString(),
          documentNumber: documentNumber.value,
          driversLicenseNumber: driverLicense.value,
          driverLicenseExpireDate: driverLicenseExpire?.value?.toISOString(),
          isProfessionalDriver,
          automotiveInsuranceProvider: insuranceCompany.value,
        })
        .then((response) => {
          const jsonResponse = JSON.stringify(response.data.driverUUID);
          saveId(jsonResponse);
          updateUserStatusCallback();
        })
        .catch((error) => {
          Toast.show({
            title: 'Aconteceu um erro durante o cadastro',
            description: error.data?.message || error.message || "Não sabemos ainda o que houve, tente novamente.",
            status: 'error',
          });
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header title="Cadastro de motoristas" leftButtonCallback={() => navigation.goBack()} />
        <Stack alignItems="center" justifyContent="center" height="80%" mt={10}>
          <ActivityIndicator size={36} color="black" />
        </Stack>
      </>
    )
  }

  return (
    <>
      <Header title="Cadastro de motoristas" leftButtonCallback={() => navigation.goBack()} />
      <ScrollView>
        <Stack space={4} my={8} mx={4}>
          <View>
            <LabelText>Nome</LabelText>
            <Input
              isFullWidth
              size="lg"
              variant="outline"
              placeholder="Digite seu nome"
              isInvalid={name.error}
              onChangeText={(text) => {
                const isValid = isBetweenRange(text, 5, 25);
                setName({ value: text, error: !isValid });
              }}
              onBlur={() => {
                const isValid = isBetweenRange(name.value, 5, 25);
                setName({ ...name, error: !isValid });
              }}
              _light={{
                placeholderTextColor: '#A0A0A0',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
          </View>

          <View>
            <LabelText>Data de nascimento</LabelText>
            <DatePicker
              style={{
                width: '100%',
              }}
              date={birthDate?.value} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="Data de nascimento"
              format="DD/MM/YYYY"
              maxDate={moment().subtract(18, 'years').toDate()}
              customStyles={{
                dateIcon: {
                  left: 4,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  height: 48,
                  borderColor: birthDate?.error ? 'red' : '#E0E0E0',
                  borderRadius: 4,
                  alignItems: 'flex-start',
                  padding: 8,
                },
                placeholderText: {
                  color: '#A0A0A0',
                  fontSize: 16,
                },
                dateText: {
                  fontSize: 16,
                }
              }}
              onDateChange={(date: string) => {
                const selectedMoment = moment(date, "DD/MM/YYYY");
                setBirthDate({ value: selectedMoment.toDate(), error: false });
              }}
            />
          </View>

          <View>
            <LabelText>CPF</LabelText>
            <Input
              isFullWidth
              size="lg"
              variant="outline"
              keyboardType="phone-pad"
              placeholder="CPF"
              value={documentNumber.value}
              isInvalid={documentNumber.error}
              onChangeText={(text) => {
                const isValid = isBetweenRange(text, 5, 25);
                setDocumentNumber({ value: text.replace(/[^0-9]/g, ''), error: !isValid });
              }
              }
              onBlur={() => {
                const isValid = isBetweenRange(documentNumber.value, 5, 25);
                setDocumentNumber({ ...documentNumber, error: !isValid });
              }}
              _light={{
                placeholderTextColor: '#A0A0A0',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
          </View>

          <View>
            <LabelText>CNH</LabelText>
            <Input
              isFullWidth
              size="lg"
              variant="outline"
              keyboardType="phone-pad"
              placeholder="CNH"
              value={driverLicense.value}
              isInvalid={driverLicense.error}
              onChangeText={(text) => {
                const isValid = isBetweenRange(text, 5, 41);
                setDriverLicense({ value: text.replace(/[^0-9]/g, ''), error: !isValid })
              }}
              onBlur={() => {
                const isValid = isBetweenRange(driverLicense.value, 5, 41);
                setDriverLicense({ ...driverLicense, error: !isValid });
              }}
              _light={{
                placeholderTextColor: '#A0A0A0',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
          </View>

          <View>
            <LabelText>Validade CNH</LabelText>
            <DatePicker
              style={{
                width: '100%',
              }}
              date={driverLicenseExpire?.value} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="Validade CNH"
              format="DD/MM/YYYY"
              customStyles={{
                dateIcon: {
                  left: 4,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  height: 48,
                  borderColor: driverLicenseExpire?.error ? 'red' : '#E0E0E0',
                  borderRadius: 4,
                  alignItems: 'flex-start',
                  padding: 8,
                },
                placeholderText: {
                  color: '#A0A0A0',
                  fontSize: 16,
                },
                dateText: {
                  fontSize: 16,
                }
              }}
              onDateChange={(date: string) => {
                const selectedMoment = moment(date, "DD/MM/YYYY");
                const isValid = selectedMoment > moment();
                setDriverLicenseExpire({ value: selectedMoment.toDate(), error: !isValid });
              }}
            />
          </View>

          <View>
            <LabelText>Seguradora</LabelText>
            <Input
              isFullWidth
              size="lg"
              variant="outline"
              placeholder="Seguradora"
              value={insuranceCompany.value}
              isInvalid={insuranceCompany.error}
              onChangeText={(text) => {
                const isValid = isBetweenRange(text, 1, 256);
                setInsuranceCompany({ value: text, error: !isValid });
              }}
              onBlur={() => {
                const isValid = isBetweenRange(insuranceCompany.value, 1, 256);
                setInsuranceCompany({ ...insuranceCompany, error: !isValid });
              }}
              _light={{
                placeholderTextColor: '#A0A0A0',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
          </View>

          <View>
            <LabelText>Email</LabelText>
            <Input
              isFullWidth
              size="lg"
              variant="outline"
              placeholder="Email"
              value={email.value}
              isInvalid={email.error}
              onChangeText={(text) => {
                const isValid = isMailValid(text);
                setEmail({ value: text, error: !isValid });
              }}
              onBlur={() => {
                const isValid = isMailValid(email.value);
                setEmail({ ...email, error: !isValid });
              }}
              keyboardType="email-address"
              _light={{
                placeholderTextColor: '#A0A0A0',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
          </View>

          <View>
            <LabelText>Telefone</LabelText>
            <Input
              isFullWidth
              size="lg"
              variant="outline"
              keyboardType="phone-pad"
              type="number"
              value={phoneNumber.value}
              isInvalid={phoneNumber.error}
              onChangeText={(text) => {
                const isValid = isBetweenRange(text, 5, 25);
                setPhoneNumber({ value: text.replace(/[^0-9]/g, ''), error: !isValid });
              }}
              onBlur={() => {
                const isValid = isBetweenRange(phoneNumber.value, 5, 25);
                setPhoneNumber({ ...phoneNumber, error: !isValid });
              }}
              placeholder="Telefone"
              _light={{
                placeholderTextColor: '#A0A0A0',
              }}
              _dark={{
                placeholderTextColor: 'blueGray.50',
              }}
            />
          </View>

          <View>
            <LabelText>Senha</LabelText>
            <Input
              isFullWidth
              size="lg"
              type={show ? 'text' : 'password'}
              value={password.value}
              isInvalid={password.error}
              onChangeText={(text) => {
                const isValid = isBetweenRange(text, 0, 64);
                setPassword({ value: text, error: !isValid });
              }}
              onBlur={() => {
                const isValid = isBetweenRange(password.value, 0, 64);
                setPassword({ ...password, error: !isValid });
              }}
              InputRightElement={
                <Icon size="sm" as={<Feather name={show ? 'eye-off' : 'eye'} />} color="#3F8AE0" marginRight={2} onPress={handleHidePassword} />
              }
              placeholder="Senha"
            />
          </View>

          <View>
            <HStack alignItems="center" justifyContent="space-between" marginLeft={2}>
              <Text>Você dirige profissionalmente?</Text>
              <Switch size="lg" isChecked={isProfessionalDriver} onToggle={() => setIsProfessionalData(!isProfessionalDriver)} />
            </HStack>
          </View>

          <View>
            <HStack alignItems="center" justifyContent="flex-end" my={4}>
              <Button colorScheme="primary" onPress={handleSignUp} size="lg">
                SALVAR
              </Button>
            </HStack>
          </View>
        </Stack>
      </ScrollView>
    </>
  );
}
