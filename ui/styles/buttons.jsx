import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  button: {
    backgroundColor: 'rebeccapurple',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'antiquewhite',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'antiquewhite',
    fontSize: 16,
    fontWeight: 'bold',
  },
  landscapeAddButton: {
    position: 'relative',
    height: 50,
    backgroundColor: 'green',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: '#ba1745',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'antiquewhite',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'antiquewhite',
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
