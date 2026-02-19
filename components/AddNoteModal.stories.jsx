import React from 'react';
import { fn } from 'storybook/test';
import AddNoteModal from './AddNoteModal';
import { Text, TouchableOpacity, View } from 'react-native';

const AddNoteModalWithState = (args) => {
  const [modalVisible, setModalVisible] = React.useState(true);
  const [newNote, setNewNote] = React.useState('');

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          padding: 12,
          margin: 10,
          backgroundColor: '#007AFF',
          borderRadius: 8,
        }}
      >
        <Text style={{ color: '#fff' }}>Show Modal</Text>
      </TouchableOpacity>
      <AddNoteModal
        {...args}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
      />
    </View>
  );
};

const meta = {
  title: 'Notes/AddNoteModal',
  component: AddNoteModalWithState,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    addNote: fn(),
  },
};

export default meta;

export const Default = {};
