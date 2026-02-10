import databaseService from './databaseService';
import { Query } from 'react-native-appwrite';

//appwrite db and collection (table) id

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  //Read notes
  async getNotes(userId) {
    if (!userId) {
      console.error('Error: missing user Id in getNotes');
      return { error: 'Missing user Id in getNotes' };
    }

    try {
      const response = await databaseService.listDocuments(dbId, colId, [
        Query.equal('user_id', userId),
      ]);
      return response;
    } catch (error) {
      console.error('Error fetching notes: ', error.message);
      return { data: [], error: error.message };
    }
  },

  //Create
  async createNote(user_id, text) {
    if (!text) {
      return { error: 'Note text cannot be empty' };
    }

    const data = {
      text,
      user_id,
    };

    const response = await databaseService.createDocument(dbId, colId, data);

    if (response?.error) {
      return { error: response.error };
    }

    return { data: response };
  },

  //Update
  async updateNote(id, text) {
    const response = await databaseService.updateDocument(dbId, colId, id, {
      text,
    });
    if (response?.error) {
      return { error: response.error };
    }
    return { data: response };
  },

  //Delete
  async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);

    if (response?.error) {
      return { error: response.error };
    }
    return { success: true };
  },
};

export default noteService;
