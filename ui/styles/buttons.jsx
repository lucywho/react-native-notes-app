import { StyleSheet } from 'react-native';
import { COLOURS } from './colours';

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: COLOURS.primaryButtonBackground,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: COLOURS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: COLOURS.secondaryButtonBackground,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: COLOURS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  landscapeAddButton: {
    position: 'relative',
    height: 50,
    backgroundColor: COLOURS.secondaryButtonBackground,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: COLOURS.cancelText,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: COLOURS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: COLOURS.secondaryButtonBackground,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: COLOURS.buttonText,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 20,
  },
  landscapeButtonContainer: {
    flexDirection: 'column',
    flex: 0,
    gap: 5,
    justifyContent: 'flex-end',
  },
});
