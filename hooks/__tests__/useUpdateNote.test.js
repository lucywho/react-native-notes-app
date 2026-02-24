import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUpdateNote } from '../useUpdateNote';
import noteService from '@/services/noteService';

jest.mock('@/services/noteService');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { gcTime: Infinity },
      mutations: { gcTime: Infinity },
    },
  });
  return function Wrapper({ children }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

describe('useUpdateNote', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls noteService.updateNote with id and text on success', async () => {
    const mockNote = { $id: 'note-1', text: 'Updated text' };
    noteService.updateNote.mockResolvedValue({ data: mockNote });

    const { result } = renderHook(() => useUpdateNote('user-1'), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ id: 'note-1', text: 'Updated text' });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(noteService.updateNote).toHaveBeenCalledWith('note-1', 'Updated text');
    expect(result.current.data).toEqual(mockNote);
  });

  it('throws when service returns error', async () => {
    noteService.updateNote.mockResolvedValue({
      error: 'Document not found',
    });

    const { result } = renderHook(() => useUpdateNote('user-1'), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ id: 'note-1', text: 'Updated' });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Document not found');
  });
});
