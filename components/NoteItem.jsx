import { useStyles } from '@/ui/styles';
import { useState, useRef } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';

const NoteItem = ({ note, onDelete, onEdit }) => {
  const styles = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);
  const inputRef = useRef(null);
  const handleSave = () => {
    onEdit(note.$id, editedText);
    setIsEditing(false);
  };

  return (
    <View style={styles.noteItem}>
      {isEditing ? (
        <TextInput
          testID='note-item-input'
          style={styles.input}
          value={editedText}
          onChangeText={setEditedText}
          ref={inputRef}
          autoFocus
          onSubmitEditing={handleSave}
          returnKeyType='done'
        />
      ) : (
        <Text testID='note-item-text' style={styles.noteText}>
          {note.text}
        </Text>
      )}
      <View style={styles.noteActions}>
        {isEditing ? (
          <TouchableOpacity
            testID='note-item-save'
            onPress={() => {
              handleSave(editedText);
              inputRef.current?.blur();
            }}
          >
            <Text style={styles.editNoteText}>💾</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            testID='note-item-edit'
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editNoteText}>✏️</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          testID='note-item-delete'
          onPress={() => onDelete(note.$id)}
        >
          <Text style={styles.deleteNoteText}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteItem;
