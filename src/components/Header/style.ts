import { StyleSheet } from 'react-native';
import { flex } from 'styled-system';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 95,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    color: 'white',
  },
});
