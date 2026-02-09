import { useState } from 'react';
import NoteList from '@/components/NoteList';
import { buttonStyles, styles } from '@/ui/styles';
import AddNoteModal from '@/components/AddNoteModal';
import { Text, TouchableOpacity, View } from 'react-native';

const NoteScreen = () => {
  const [notes, setNotes] = useState([
    { id: '1', text: 'This is the first note' },
    { id: '2', text: 'This is the second note' },
    { id: '3', text: 'This is the third note' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim() === '') {
      return;
    }
    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Date.now().toString(), text: newNote },
    ]);

    setNewNote('');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <NoteList notes={notes} />
      <TouchableOpacity
        style={buttonStyles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={buttonStyles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

export default NoteScreen;
