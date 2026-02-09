import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'antiquewhite',
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
    color: 'rebeccapurple',
  },
  subTitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8040bf',
    marginBottom: 20,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'rgba(128, 64, 191, 0.1)',
    borderRadius: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#8040bf',
    marginVertical: 5,
  },
  noteText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  errorText: {
    color: '#ba1745',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  deleteNoteText: {
    color: '#ba1745',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  updateNoteText: {
    color: '#007380',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
