import React from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDeleteNote } from '../useDeleteNote';
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

describe('useDeleteNote', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls noteService.deleteNote with id on success', async () => {
    noteService.deleteNote.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useDeleteNote('user-1'), {
      wrapper: createWrapper(),
    });

    result.current.mutate('note-1');

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(noteService.deleteNote).toHaveBeenCalledWith('note-1');
  });

  it('throws when service returns error', async () => {
    noteService.deleteNote.mockResolvedValue({ error: 'Network error' });

    const { result } = renderHook(() => useDeleteNote('user-1'), {
      wrapper: createWrapper(),
    });

    result.current.mutate('note-1');

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error?.message).toBe('Network error');
  });
});
