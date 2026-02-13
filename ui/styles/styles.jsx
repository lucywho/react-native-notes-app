import { StyleSheet } from 'react-native';
import { COLOURS } from './colours';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLOURS.primaryBackground,
  },
  landscapeContainer: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLOURS.primaryText,
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: COLOURS.secondaryText,
    marginBottom: 20,
  },
  linkText: {
    color: COLOURS.linkText,
    textDecorationLine: 'underline',
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: COLOURS.noteItemBackground,
    borderRadius: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.inputBorder,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  errorText: {
    color: COLOURS.errorText,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  successText: {
    color: COLOURS.successText,
  },
  noteActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 70,
  },
  deleteNoteText: {
    color: COLOURS.errorText,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  editNoteText: {
    color: COLOURS.editNoteText,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: COLOURS.inputBorder,
    borderRadius: 4,
  },
  authInputField: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLOURS.inputBorder,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
    width: '70%',
  },
});
