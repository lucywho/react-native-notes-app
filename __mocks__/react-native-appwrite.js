const mockClient = {
  setEndpoint: jest.fn().mockReturnThis(),
  setProject: jest.fn().mockReturnThis(),
  setPlatform: jest.fn().mockReturnThis(),
};

export const Client = jest.fn(() => mockClient);

export class Databases {
  constructor() {
    this.listDocuments = jest.fn().mockResolvedValue({ documents: [] });
    this.createDocument = jest.fn().mockResolvedValue({ $id: 'doc-1' });
    this.updateDocument = jest.fn().mockResolvedValue({ $id: 'doc-1', text: '' });
    this.deleteDocument = jest.fn().mockResolvedValue(undefined);
  }
}

export class Account {
  constructor() {
    this.create = jest.fn().mockResolvedValue({ $id: 'user-1', email: 'test@test.com' });
    this.createEmailPasswordSession = jest.fn().mockResolvedValue({ userId: 'user-1' });
    this.get = jest.fn().mockResolvedValue({ $id: 'user-1', email: 'test@test.com' });
    this.deleteSessions = jest.fn().mockResolvedValue(undefined);
  }
}

export const ID = {
  unique: jest.fn(() => 'unique-id-123'),
};

export const Query = {
  equal: jest.fn((field, value) => ({ field, value })),
};
