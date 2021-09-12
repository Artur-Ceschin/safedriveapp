import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  Input,
  Button,
  Center,
  useToast,
  Link,
  FormControl,
} from 'native-base';
import safedriveImage from '../../assets/safedriverLogo.png';
import styles from './styles';
import { Header } from '../../components/Header';
import { useNavigation } from '@react-navigation/native';

export function SignIn() {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  const navigation = useNavigation();
  function handleSignUp() {
    navigation.navigate('Profile');
  }
  function handleSignIn() {
    navigation.navigate('Home');
  }
  const toast = useToast();
  return (
    <View style={styles.container}>
      <Image source={safedriveImage} style={styles.banner} />
      <FormControl>
        <FormControl.Label
          _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
        >
          Email
        </FormControl.Label>
        <Input />
      </FormControl>
      <FormControl mb={5}></FormControl>
      <FormControl mb={5}>
        <FormControl.Label
          _text={{ color: 'black', fontSize: 'sm', fontWeight: 600 }}
        >
          Senha
        </FormControl.Label>
        <Input type="password" />
        <Link
          _text={{ fontSize: 'xs', fontWeight: '700', color: 'cyan.500' }}
          alignSelf="flex-end"
          mt={1}
        >
          Esqueceu sua senha ?
        </Link>
      </FormControl>
      <Button.Group mt="5" variant="solid" isAttached space={6}>
        <Button
          variant="outline"
          colorScheme="primary"
          mr={2}
          onPress={() => {
            handleSignIn();
            toast.show({
              title: 'Conta verficada',
              status: 'success',
            });
          }}
        >
          Entrar
        </Button>
        <Button
          onPress={handleSignUp}
          colorScheme="primary"
          _text={{
            color: 'white',
          }}
        >
          Cadastrar
        </Button>
      </Button.Group>
    </View>
  );
}
