import React, { useState } from 'react';
import { View, Image, ActivityIndicator } from 'react-native';
import {
  Input,
  Button,
  useToast,
  Link,
  FormControl,
  Toast,
  Icon,
} from 'native-base';
import safedriveImage from '../../assets/safedriverLogo.png';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { loginApi } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

export function SignIn({ updateUserStatusCallback }: { updateUserStatusCallback: () => void }) {
  const navigation = useNavigation();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  
  function handleSignUp() {
    navigation.navigate('SingUp');
  }

  function handleSignIn() {
    setIsLoading(true);
    loginApi
      .post(``, {
        email,
        senha: password,
      })
      .then(async (response) => {
        const jsonResponse = JSON.stringify(response.data.driverUUID);
        await saveId(jsonResponse);
        updateUserStatusCallback();
        toast.show({
          title: 'Conta verificada',
          status: 'success',
        });
      })
      .catch((error) => {
        Toast.show({
          title: 'Aconteceu um erro',
          description: error.data?.message || error.message || "Não sabemos ainda o que houve, tente novamente.",
          status: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  }

  async function saveId(jsonResponse: any) {
    await AsyncStorage.setItem('@safeDriver:id', jsonResponse);
  }

  const handleHidePassword = () => setShow(!show);

  return (
    <View style={styles.container}>
      <Image source={safedriveImage} style={styles.banner} />
      <FormControl>
        <FormControl.Label
          _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
        >
          Email
        </FormControl.Label>
        <Input isDisabled={isLoading} onChangeText={(text) => setEmail(text.trim())}/>
      </FormControl>
      <FormControl mb={5}></FormControl>
      <FormControl mb={5}>
        <FormControl.Label
          _text={{ color: 'black', fontSize: 'sm', fontWeight: 600 }}
        >
          Senha
        </FormControl.Label>
        <Input
          type={show ? 'text' : 'password'}
          isDisabled={isLoading}
          onChangeText={(text) => setPassword(text.trim())}
          InputRightElement={
            <Icon size="sm" as={<Feather name={show ? 'eye-off' : 'eye'} />} color="#3F8AE0" marginRight={2} onPress={handleHidePassword} />
          } />
        <Link
          _text={{ fontSize: 'xs', fontWeight: '700', color: 'cyan.500', marginTop: 2 }}
          alignSelf="flex-end"
          mt={1}
        >
          Esqueceu sua senha ?
        </Link>
      </FormControl>
      {isLoading && (
        <View style={{ flex: 1, padding: 16 }}>
          <ActivityIndicator size={36} color="black" />
        </View>
      )}
      {!isLoading && (
        <Button.Group mt="5" variant="solid" space={4} alignItems="flex-end" justifyContent="flex-end">
          <Button
            onPress={handleSignUp}
            variant="outline"
            colorScheme="primary"
            size="lg"
            disabled={isLoading}
          >
            CADASTRAR
          </Button>
          <Button
            colorScheme="primary"
            size="lg"
            disabled={isLoading}
            onPress={() => {
              handleSignIn();
            }}
          >
            ENTRAR
          </Button>
        </Button.Group>
      )}
    </View>
  );
}
