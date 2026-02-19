import NoteList from './NoteList';
import { View } from 'react-native';
import { fn } from 'storybook/test';

const meta = {
  title: 'Notes/NoteList',
  component: NoteList,
  args: {
    notes: [
      { $id: 'note-1', text: 'Test note content' },
      {
        $id: 'note-2',
        text: 'This is a longer note that might wrap across multiple lines.',
      },
    ],
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

export const Default = {};

export const Empty = {
  args: {
    notes: [],
  },
};

export const LongList = {
  args: {
    notes: Array.from({ length: 15 }, (_, index) => ({
      $id: `note-${index + 1}`,
      text: `Test note content ${index + 1}`,
    })),
  },
};
