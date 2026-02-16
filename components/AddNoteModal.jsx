import { useTheme } from '@/contexts/ThemeContext';
import { useButtonStyles, useModalStyles } from '@/ui/styles';
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
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
            <TouchableOpacity
              testID='add-note-cancel'
              style={[
                buttonStyles.cancelButton,
                isLandscape && { maxHeight: 50 },
              ]}
              onPress={() => {
                setNewNote('');
                setModalVisible(false);
              }}
            >
              <Text style={buttonStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID='add-note-save'
              style={[
                buttonStyles.saveButton,
                isLandscape && { maxHeight: 50 },
              ]}
              onPress={() => {
                addNote();
              }}
            >
              <Text style={buttonStyles.buttonText}>Save Note</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddNoteModal;
