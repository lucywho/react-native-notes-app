import { account } from './appwrite';
import { ID } from 'react-native-appwrite';

const authService = {
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password);
      return response;
    } catch (error) {
      return {
        error: error.message || 'Registration failed. Please try agian',
      };
    }
  },
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession({
        email,
        password,
      });
      return response;
    } catch (error) {
      return { error: error.message || 'Login failed. Please try again.' };
    }
  },

  async getCurrentUser() {
    try {
      const response = await account.get();
      return response;
    } catch (error) {
      return { error: error.message || 'Failed to get current user.' };
    }
  },

  async logout() {
    try {
      await account.deleteSessions('current');
      return { success: true };
    } catch (error) {
      return { error: error.message || 'Failed to logout.' };
    }
  },
};

export default authService;
