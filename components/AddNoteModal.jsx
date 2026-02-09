import { buttonStyles, modalStyles } from '@/ui/styles';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
const AddNoteModal = ({
  modalVisible,
  setModalVisible,
  newNote,
  setNewNote,
  addNote,
}) => {
  return (
    <Modal
      visible={modalVisible}
      animationType='fade'
      transparent
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={modalStyles.overlay}>
        <View style={modalStyles.content}>
          <Text style={modalStyles.title}>Add New Note</Text>
          <TextInput
            style={modalStyles.input}
            value={newNote}
            onChangeText={setNewNote}
            placeholder='Enter your note...'
            placeholderTextColor='#99CC99'
          />
          <View style={buttonStyles.buttonContainer}>
            <TouchableOpacity
              style={buttonStyles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={buttonStyles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={buttonStyles.saveButton}
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
