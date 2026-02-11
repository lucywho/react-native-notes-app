import databaseService from '../databaseService';
import { database } from '../appwrite';
import { ID } from 'react-native-appwrite';

describe('databaseService', () => {
  let consoleErrorSpy;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe('listDocuments', () => {
    it('returns documents and null error on success', async () => {
      const mockDocuments = [
        { $id: 'doc-1', text: 'Note 1' },
        { $id: 'doc-2', text: 'Note 2' },
      ];
      database.listDocuments.mockResolvedValue({ documents: mockDocuments });

      const result = await databaseService.listDocuments('db-1', 'col-1');

      expect(result).toEqual({ data: mockDocuments, error: null });
      expect(database.listDocuments).toHaveBeenCalledWith('db-1', 'col-1', []);
    });

    it('passes queries to database.listDocuments', async () => {
      const queries = [{ field: 'user_id', value: 'user-1' }];
      database.listDocuments.mockResolvedValue({ documents: [] });

      await databaseService.listDocuments('db-1', 'col-1', queries);

      expect(database.listDocuments).toHaveBeenCalledWith(
        'db-1',
        'col-1',
        queries,
      );
    });

    it('returns empty array when response has no documents', async () => {
      database.listDocuments.mockResolvedValue({});

      const result = await databaseService.listDocuments('db-1', 'col-1');

      expect(result).toEqual({ data: [], error: null });
    });

    it('returns error on failure', async () => {
      database.listDocuments.mockRejectedValue(new Error('Network error'));

      const result = await databaseService.listDocuments('db-1', 'col-1');

      expect(result).toEqual({ error: 'Network error' });
    });
  });

  describe('createDocument', () => {
    it('creates document with ID.unique() when no id provided', async () => {
      const mockDoc = { $id: 'unique-id-123', text: 'New note' };
      database.createDocument.mockResolvedValue(mockDoc);

      const result = await databaseService.createDocument(
        'db-1',
        'col-1',
        { text: 'New note' },
      );

      expect(result).toEqual(mockDoc);
      expect(database.createDocument).toHaveBeenCalledWith(
        'db-1',
        'col-1',
        'unique-id-123',
        { text: 'New note' },
      );
      expect(ID.unique).toHaveBeenCalled();
    });

    it('uses provided id when given', async () => {
      const mockDoc = { $id: 'custom-id', text: 'New note' };
      database.createDocument.mockResolvedValue(mockDoc);

      const result = await databaseService.createDocument(
        'db-1',
        'col-1',
        { text: 'New note' },
        'custom-id',
      );

      expect(result).toEqual(mockDoc);
      expect(database.createDocument).toHaveBeenCalledWith(
        'db-1',
        'col-1',
        'custom-id',
        { text: 'New note' },
      );
      expect(ID.unique).not.toHaveBeenCalled();
    });

    it('returns error on failure', async () => {
      database.createDocument.mockRejectedValue(new Error('Permission denied'));

      const result = await databaseService.createDocument(
        'db-1',
        'col-1',
        { text: 'New note' },
      );

      expect(result).toEqual({ error: 'Permission denied' });
    });
  });

  describe('updateDocument', () => {
    it('updates document and returns response on success', async () => {
      const mockDoc = { $id: 'doc-1', text: 'Updated text' };
      database.updateDocument.mockResolvedValue(mockDoc);

      const result = await databaseService.updateDocument(
        'db-1',
        'col-1',
        'doc-1',
        { text: 'Updated text' },
      );

      expect(result).toEqual(mockDoc);
      expect(database.updateDocument).toHaveBeenCalledWith(
        'db-1',
        'col-1',
        'doc-1',
        { text: 'Updated text' },
      );
    });

    it('returns error on failure', async () => {
      database.updateDocument.mockRejectedValue(
        new Error('Document not found'),
      );

      const result = await databaseService.updateDocument(
        'db-1',
        'col-1',
        'doc-1',
        { text: 'Updated' },
      );

      expect(result).toEqual({ error: 'Document not found' });
    });
  });

  describe('deleteDocument', () => {
    it('deletes document and returns success', async () => {
      database.deleteDocument.mockResolvedValue(undefined);

      const result = await databaseService.deleteDocument('db-1', 'col-1', 'doc-1');

      expect(result).toEqual({ success: true });
      expect(database.deleteDocument).toHaveBeenCalledWith(
        'db-1',
        'col-1',
        'doc-1',
      );
    });

    it('returns error on failure', async () => {
      database.deleteDocument.mockRejectedValue(new Error('Network error'));

      const result = await databaseService.deleteDocument(
        'db-1',
        'col-1',
        'doc-1',
      );

      expect(result).toEqual({ error: 'Network error' });
    });
  });
});
