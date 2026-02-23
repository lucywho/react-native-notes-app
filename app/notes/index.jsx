import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import NoteList from '@/components/NoteList';
import noteService from '@/services/noteService';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import AddNoteModal from '@/components/AddNoteModal';
import { useButtonStyles, useStyles } from '@/ui/styles';
import {
  Text,
  Pressable,
  View,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';

const NoteScreen = () => {
  const router = useRouter();
  const {
    user,
    loading: authLoading,
    resendVerification,
    checkUser,
  } = useAuth();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const styles = useStyles();
  const buttonStyles = useButtonStyles();
  const { theme } = useTheme();

  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resending, setResending] = useState(false);

  const isUnverified = user && user.emailVerification === false;

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth');
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user && user.emailVerification !== false) {
      fetchNotes();
    }
  }, [user]);

  const handleResendVerification = async () => {
    setResending(true);
    const response = await resendVerification();
    setResending(false);
    if (response?.error) {
      Alert.alert('Error', response.error);
    } else {
      Alert.alert('Success', 'Verification email sent. Check your inbox.');
    }
  };

  const handleRefreshAfterVerify = () => {
    checkUser();
  };

  const fetchNotes = async () => {
    setLoading(true);

    const response = await noteService.getNotes(user.$id);

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

    const response = await noteService.createNote(user.$id, newNote);

    if (response.error) {
      Alert.alert('Error: ', response.error);
    } else {
      setNotes([response.data, ...notes]);
    }

    setNewNote('');
    setModalVisible(false);
  };

  const editNote = async (id, newText) => {
    if (!newText.trim()) {
      Alert.alert('Error: ', 'Note text cannot be empty');
      return;
    }

    const response = await noteService.updateNote(id, newText);
    if (response?.error) {
      Alert.alert('Error: ', response.error);
    } else {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.$id === id ? { ...note, text: response.data.text } : note,
        ),
      );
    }
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

  if (isUnverified) {
    return (
      <View
        style={[styles.container, { justifyContent: 'center', padding: 24 }]}
      >
        <Text
          style={[styles.errorText, { textAlign: 'center', marginBottom: 16 }]}
        >
          Please verify your email to access your notes.
        </Text>
        <Text
          style={[styles.subTitle, { textAlign: 'center', marginBottom: 24 }]}
        >
          Check your inbox for the verification link we sent you.
        </Text>
        <Pressable
          testID='notes-resend-verification'
          style={({ pressed }) => [
            ...buttonStyles.button,
            { backgroundColor: theme.primaryButtonBackground },
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleResendVerification}
          disabled={resending}
        >
          <Text style={buttonStyles.buttonText}>
            {resending ? 'Sending...' : 'Resend verification email'}
          </Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.subTitle,
            { marginTop: 16, opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleRefreshAfterVerify}
        >
          <Text style={styles.linkText}>I&apos;ve verified my email</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={isLandscape ? styles.landscapeContainer : styles.container}>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator size='large' color={theme.activityIndicator} />
        ) : (
          <>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {notes.length === 0 ? (
              <>
                <Text style={styles.errorText}>No notes found</Text>
                <Text style={styles.successText}>
                  Click the + button to start adding your own notes
                </Text>
              </>
            ) : (
              <NoteList notes={notes} onDelete={deleteNote} onEdit={editNote} />
            )}
          </>
        )}
      </View>
      <Pressable
        testID='notes-add-button'
        style={({ pressed }) => ({
          ...(isLandscape
            ? buttonStyles.landscapeAddButton
            : buttonStyles.addButton),
          opacity: pressed ? 0.7 : 1,
        })}
        onPress={() => setModalVisible(true)}
      >
        <Text style={buttonStyles.addButtonText}>+ Add Note</Text>
      </Pressable>

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
