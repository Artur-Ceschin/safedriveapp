import { BorderlessButton } from 'react-native-gesture-handler';
import React from 'react';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import profileImg from '../../assets/profile.jpg';
import { Icon, IconButton, Avatar } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  action?: ReactNode;
  leftButtonCallback?: () => void;
}

export function Header({ title, leftButtonCallback }: HeaderProps) {
  const router = useRoute();
  const navigation = useNavigation();

  function handleToggleDrawer() {
    navigation.toggleDrawer();
  }

  function handleGoBack() {
    if (leftButtonCallback) {
      leftButtonCallback();
    }
    else {
      navigation.navigate('Home');
    }
  }

  return (
    <LinearGradient colors={['#3F8AE0', '#3F8AE0']} style={styles.container}>
      <View style={styles.leftIconContainer}>
        {router.name === 'Home' ? (
          <TouchableOpacity
            onPress={handleToggleDrawer}
          >
            <Icon size="sm" as={<MaterialIcons name="menu" />} color="white" />
          </TouchableOpacity>
        ) : (
          <BorderlessButton>
            <Feather
              name="arrow-left"
              size={24}
              color={'white'}
              onPress={handleGoBack}
            />
          </BorderlessButton>
        )}
      </View>

      <Text style={styles.title}>{title}</Text>

      {router.name === 'SingUp' ? null : (
        <View style={styles.avatarContainer}>
          <Avatar source={profileImg}>GG</Avatar>
        </View>
      )}
    </LinearGradient>
  );
}
