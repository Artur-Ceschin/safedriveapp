import { StyleSheet } from 'react-native';
import { flex } from 'styled-system';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIconContainer: {
    padding: 16,
  },
  avatarContainer: {
    margin: 8,
  },
  title: {
    flex: 1,
    marginTop: 4,
    marginLeft: 16,
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
    color: 'white',
  },
});
