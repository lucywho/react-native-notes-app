import { useTheme } from '@/contexts/ThemeContext';
import { useButtonStyles, useModalStyles } from '@/ui/styles';
import {
  Modal,
  Text,
  TextInput,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';

const AddNoteModal = ({
  modalVisible,
  setModalVisible,
  newNote,
  setNewNote,
  addNote,
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const buttonStyles = useButtonStyles();
  const modalStyles = useModalStyles();
  const { theme } = useTheme();

  return (
    <Modal
      visible={modalVisible}
      animationType='fade'
      transparent
      supportedOrientations={[
        'portrait',
        'portrait-upside-down',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={modalStyles.overlay}>
        <View
          style={
            isLandscape ? modalStyles.landscapeContent : modalStyles.content
          }
        >
          <View style={isLandscape ? { flex: 1 } : undefined}>
            <Text style={modalStyles.title}>Add New Note</Text>
            <TextInput
              testID='add-note-input'
              style={modalStyles.input}
              value={newNote}
              onChangeText={setNewNote}
              placeholder='Enter your note...'
              placeholderTextColor={theme.modalPlaceholderText}
              multiline={isLandscape}
            />
          </View>
          <View
            style={
              isLandscape
                ? buttonStyles.landscapeButtonContainer
                : buttonStyles.buttonContainer
            }
          >
            <Pressable
              testID='add-note-cancel'
              style={({ pressed }) => [
                buttonStyles.cancelButton,
                isLandscape && { maxHeight: 50 },
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => {
                setNewNote('');
                setModalVisible(false);
              }}
            >
              <Text style={buttonStyles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              testID='add-note-save'
              style={({ pressed }) => [
                buttonStyles.saveButton,
                isLandscape && { maxHeight: 50 },
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={() => {
                addNote();
              }}
            >
              <Text style={buttonStyles.buttonText}>Save Note</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddNoteModal;
