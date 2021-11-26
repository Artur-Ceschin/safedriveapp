import React from 'react';
import { StyleProp, TextStyle } from "react-native";
import { Text } from 'native-base';

export default ({ children, style }: {
  children: React.ReactNode, style?: StyleProp<TextStyle>
}) => {
  return (
    <Text style={[{ fontSize: 12, color: '#3F8AE0', alignSelf: 'flex-start', marginTop: 8 }, style]}>
      {children}
    </Text>
  );
}