import { HeaderLogout } from './HeaderLogout';
import { View } from 'react-native';

const meta = {
  title: 'Header/HeaderLogout',
  component: HeaderLogout,
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
