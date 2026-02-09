import { database } from './appwrite';
import { ID } from 'react-native-appwrite';

const databaseService = {
  //Read
  async listDocuments(dbId, colId, queries = []) {
    try {
      const response = await database.listDocuments(dbId, colId, queries);
      return { documents: response.documents };
    } catch (error) {
      console.error('Error listing documents:', error.message);
      return { error: error.message };
    }
  },

  //Create
  async createDocument(dbId, colId, data, id = null) {
    try {
      // Appwrite requires documentId - use ID.unique() when not provided
      const documentId = id || ID.unique();
      return await database.createDocument(dbId, colId, documentId, data);
    } catch (error) {
      console.error('Error creating document:', error.message);
      return { error: error.message };
    }
  },

  //Update

  //Delete
  async deleteDocument(dbId, colId, id) {
    try {
      await database.deleteDocument(dbId, colId, id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting document:', error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;
