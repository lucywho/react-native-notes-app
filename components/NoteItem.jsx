import { styles } from '@/ui/styles';
import { Text, TouchableOpacity, View } from 'react-native';

const NoteItem = ({ note, onDelete }) => {
  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>
      <TouchableOpacity onPress={() => onDelete(note.$id)}>
        <Text style={styles.deleteNoteText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteItem;
