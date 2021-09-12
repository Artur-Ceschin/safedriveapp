import { BorderlessButton } from 'react-native-gesture-handler';
import React from 'react';
import { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import profileImg from '../../assets/profile.jpg';
import { Image, Icon, IconButton, Avatar } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/core';
interface HeaderProps {
  title: string;
  action?: ReactNode;
}

export function Header({ title, action }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.toggleDrawer();
  }
  return (
    <LinearGradient colors={['#3F8AE0', '#326eb3']} style={styles.container}>
      <IconButton
        onPress={handleGoBack}
        icon={
          <Icon size="sm" as={<MaterialIcons name="menu" />} color="white" />
        }
      />
      <BorderlessButton>
        {/* <Feather name="arrow-left" size={24} color={'white'} /> */}
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>
      <Avatar source={profileImg}>GG</Avatar>
    </LinearGradient>
  );
}
