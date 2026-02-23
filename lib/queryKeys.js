export const queryKeys = {
  notes: (userId) => ['notes', userId],
  noteDetail: (noteId) => ['notes', 'detail', noteId],
};
