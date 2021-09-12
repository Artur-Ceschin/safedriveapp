import React from 'react';
import { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import profileImg from '../../assets/profile.jpg';
import { Image, Center, NativeBaseProvider } from 'native-base';
interface HeaderProps {
  title: string;
  action?: ReactNode;
}
export function Header({ title, action }: HeaderProps) {
  return (
    <LinearGradient colors={['#3F8AE0', '#326eb3']} style={styles.container}>
      <BorderlessButton>
        <Feather name="arrow-left" size={24} color={'white'} />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      <Image
        size={50}
        resizeMode={'contain'}
        borderRadius={500}
        source={profileImg}
        alt="Profile imgage"
      />
    </LinearGradient>
  );
}
