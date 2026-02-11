import noteService from '../noteService';
import { database } from '../appwrite';
import { Query } from 'react-native-appwrite';

describe('noteService', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('getNotes', () => {
    it('returns notes for user', async () => {
      const mockNotes = [
        { $id: 'note-1', text: 'First note', user_id: 'user-1' },
        { $id: 'note-2', text: 'Second note', user_id: 'user-1' },
      ];
      database.listDocuments.mockResolvedValue({ documents: mockNotes });

      const result = await noteService.getNotes('user-1');

      expect(result).toEqual({ data: mockNotes, error: null });
      expect(database.listDocuments).toHaveBeenCalled();
      expect(Query.equal).toHaveBeenCalledWith('user_id', 'user-1');
    });

    it('returns empty array when user has no notes', async () => {
      database.listDocuments.mockResolvedValue({ documents: [] });

      const result = await noteService.getNotes('user-1');

      expect(result).toEqual({ data: [], error: null });
    });

    it('returns error when userId is missing', async () => {
      const result = await noteService.getNotes();

      expect(result).toEqual({ error: 'Missing user Id in getNotes' });
      expect(database.listDocuments).not.toHaveBeenCalled();
    });

    it('returns error on fetch failure', async () => {
      database.listDocuments.mockRejectedValue(new Error('Network error'));

      const result = await noteService.getNotes('user-1');

      expect(result).toHaveProperty('error');
      expect(result.error).toBe('Network error');
    });
  });

  describe('createNote', () => {
    it('creates note successfully', async () => {
      const mockNote = { $id: 'note-1', text: 'New note', user_id: 'user-1' };
      database.createDocument.mockResolvedValue(mockNote);

      const result = await noteService.createNote('user-1', 'New note');

      expect(result).toEqual({ data: mockNote });
      expect(database.createDocument).toHaveBeenCalled();
    });

    it('returns error when text is empty', async () => {
      const result = await noteService.createNote('user-1', '');

      expect(result).toEqual({ error: 'Note text cannot be empty' });
      expect(database.createDocument).not.toHaveBeenCalled();
    });

    it('returns error on create failure', async () => {
      database.createDocument.mockRejectedValue(new Error('Permission denied'));

      const result = await noteService.createNote('user-1', 'New note');

      expect(result).toHaveProperty('error');
      expect(result.error).toBe('Permission denied');
    });
  });

  describe('updateNote', () => {
    it('updates note successfully', async () => {
      const mockNote = { $id: 'note-1', text: 'Updated text' };
      database.updateDocument.mockResolvedValue(mockNote);

      const result = await noteService.updateNote('note-1', 'Updated text');

      expect(result).toEqual({ data: mockNote });
      expect(database.updateDocument).toHaveBeenCalledWith(
        undefined,
        undefined,
        'note-1',
        { text: 'Updated text' },
      );
    });

    it('returns error on update failure', async () => {
      database.updateDocument.mockRejectedValue(new Error('Document not found'));

      const result = await noteService.updateNote('note-1', 'Updated text');

      expect(result).toHaveProperty('error');
      expect(result.error).toBe('Document not found');
    });
  });

  describe('deleteNote', () => {
    it('deletes note successfully', async () => {
      database.deleteDocument.mockResolvedValue(undefined);

      const result = await noteService.deleteNote('note-1');

      expect(result).toEqual({ success: true });
      expect(database.deleteDocument).toHaveBeenCalledWith(
        undefined,
        undefined,
        'note-1',
      );
    });

    it('returns error on delete failure', async () => {
      database.deleteDocument.mockRejectedValue(new Error('Network error'));

      const result = await noteService.deleteNote('note-1');

      expect(result).toHaveProperty('error');
      expect(result.error).toBe('Network error');
    });
  });
});
