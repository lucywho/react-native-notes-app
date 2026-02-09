import { database } from './appwrite';

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

  //Update

  //Delete
};

export default databaseService;
