import { StyleSheet } from 'react-native';
import { COLOURS } from './colours';

export const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.modalOverlay,
  },
  content: {
    backgroundColor: COLOURS.modalContentBackground,
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  landscapeContent: {
    backgroundColor: COLOURS.modalContentBackground,
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    width: '90%',
    maxHeight: '70%',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLOURS.modalTitle,
  },
  input: {
    borderWidth: 1,
    borderColor: COLOURS.modalInputBorder,
    borderRadius: 5,
    padding: 10,
  },
});
