import { styles } from '@/ui/styles';
import { Text, View } from 'react-native';

const NoteItem = ({ note }) => {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>
    </View>
  );
};

export default NoteItem;
