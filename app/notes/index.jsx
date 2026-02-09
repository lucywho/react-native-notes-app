import { useState, useEffect } from 'react';
import NoteList from '@/components/NoteList';
import { buttonStyles, styles } from '@/ui/styles';
import AddNoteModal from '@/components/AddNoteModal';
import {
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import noteService from '@/services/noteService';

const NoteScreen = () => {
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);

    const response = await noteService.getNotes();

    if (response.error) {
      setError(response.error);
      Alert.alert('Error: ', response.error);
    } else {
      setNotes(response.data);
      setError(null);
    }

    setLoading(false);
  };

  const addNote = async () => {
    if (newNote.trim() === '') {
      return;
    }

    const response = await noteService.createNote(newNote);

    if (response.error) {
      Alert.alert('Error: ', response.error);
    } else {
      setNotes([...notes, response.data]);
    }

    setNewNote('');
    setModalVisible(false);
  };

  const deleteNote = async (id) => {
    Alert.alert('Delete Note', 'are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const response = await noteService.deleteNote(id);
          if (response.error) {
            Alert.alert('Error: ', response.error);
          } else {
            setNotes(notes.filter((note) => note.$id !== id));
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size='large' color='rebeccapurple' />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList notes={notes} onDelete={deleteNote} />
        </>
      )}
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
