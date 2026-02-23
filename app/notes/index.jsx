import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import NoteList from '@/components/NoteList';
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
import {
  useReadNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
} from '@/hooks';

const NoteScreen = () => {
  const router = useRouter();
  const {
    user,
    loading: authLoading,
    resendVerification,
    checkUser,
  } = useAuth();
  const { width, height } = useWindowDimensions();
  const styles = useStyles();
  const buttonStyles = useButtonStyles();
  const { theme } = useTheme();
  const { data: notes = [], isLoading, error } = useReadNotes(user?.$id);
  const createNote = useCreateNote(user?.$id);
  const updateNote = useUpdateNote(user?.$id);
  const deleteNote = useDeleteNote(user?.$id);

  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [resending, setResending] = useState(false);

  const isLandscape = width > height;
  const isUnverified = user && user.emailVerification === false;

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/auth');
    }
  }, [user, authLoading]);

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

  const addNote = async () => {
    if (newNote.trim() === '') {
      return;
    }

    try {
      await createNote.mutateAsync({ text: newNote.trim() });
      setNewNote('');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error: ', error.message);
    }
  };

  const editNote = async (id, newText) => {
    if (!newText.trim()) {
      Alert.alert('Error: ', 'Note text cannot be empty');
      return;
    }

    try {
      await updateNote.mutateAsync({ id, text: newText.trim() });
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  const removeNote = (id) => {
    Alert.alert('Delete Note', 'are you sure you want to delete this note?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteNote.mutateAsync(id);
          } catch (err) {
            Alert.alert('Error', err.message);
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
            buttonStyles.button,
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
        {isLoading ? (
          <View testID='notes-loading'>
            <ActivityIndicator size='large' color={theme.activityIndicator} />
          </View>
        ) : (
          <>
            {error && <Text style={styles.errorText}>{error?.message}</Text>}
            {notes.length === 0 ? (
              <>
                <Text style={styles.errorText}>No notes found</Text>
                <Text style={styles.successText}>
                  Click the + button to start adding your own notes
                </Text>
              </>
            ) : (
              <NoteList notes={notes} onDelete={removeNote} onEdit={editNote} />
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
