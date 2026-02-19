import NoteItem from './NoteItem';
import { View } from 'react-native';
import { fn } from 'storybook/test';

const meta = {
  title: 'Notes/NoteItem',
  component: NoteItem,
  args: {
    onDelete: fn(),
    onEdit: fn(),
  },
  decorators: [
    (Story) => (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    note: { $id: 'note-1', text: 'Test note content' },
  },
};

export const LongText = {
  args: {
    note: { $id: 'note-2', text: 'This is a longer note that might wrap across multiple lines.' },
  },
};
