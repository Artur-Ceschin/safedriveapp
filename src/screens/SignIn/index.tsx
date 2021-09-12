import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Input, Button, Center } from 'native-base';
import safedriveImage from '../../assets/safedriverLogo.png';
import styles from './styles';
import { Header } from '../../components/Header';
export function SignIn() {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  return (
    <View style={styles.container}>
      <Header title="Cadastro" />
      <Image source={safedriveImage} style={styles.banner} />
      <Input
        w="100%"
        mt="10"
        placeholder="Email"
        _light={{
          placeholderTextColor: 'blueGray.400',
        }}
      />
      <Input
        mt="5"
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
      <Button.Group mt="5" variant="solid" isAttached space={6}>
        <Button variant="outline" colorScheme="primary" mr={2}>
          Entrar
        </Button>
        <Button
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
