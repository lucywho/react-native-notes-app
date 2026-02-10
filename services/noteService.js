import databaseService from './databaseService';

//appwrite db and collection (table) id

const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  //Read notes
  async getNotes() {
    const response = await databaseService.listDocuments(dbId, colId);
    if (response.error) {
      return { error: response.error };
    }
    return { data: response.documents };
  },

  //Create
  async createNote(text) {
    if (!text) {
      return { error: 'Note text cannot be empty' };
    }

    const data = {
      text,
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
