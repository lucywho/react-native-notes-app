import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import NoteScreen from '../index';
import { QueryProvider, ThemeProvider } from '@/contexts';

const mockMutateAsync = jest.fn();

jest.mock('@/hooks', () => ({
  useReadNotes: jest.fn(),
  useCreateNote: jest.fn(),
  useUpdateNote: jest.fn(),
  useDeleteNote: jest.fn(),
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({ replace: jest.fn(), push: jest.fn(), back: jest.fn() }),
}));

jest.spyOn(require('react-native').Alert, 'alert');

const {
  useReadNotes,
  useCreateNote,
  useUpdateNote,
  useDeleteNote,
} = require('@/hooks');
const { useAuth } = require('@/contexts/AuthContext');

const mockUser = { $id: 'user-1', email: 'test@test.com', emailVerification: true };

const wrapper = ({ children }) => (
  <ThemeProvider>
    <QueryProvider>{children}</QueryProvider>
  </ThemeProvider>
);

describe('NoteScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      user: mockUser,
      loading: false,
      resendVerification: jest.fn(),
      checkUser: jest.fn(),
    });
    useReadNotes.mockReturnValue({
      data: [],
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });
    useCreateNote.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });
    useUpdateNote.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });
    useDeleteNote.mockReturnValue({
      mutateAsync: jest.fn(),
      isPending: false,
    });
  });

  describe('loading state', () => {
    it('shows ActivityIndicator when notes are loading', () => {
      useReadNotes.mockReturnValue({
        data: undefined,
        isLoading: true,
        error: null,
        refetch: jest.fn(),
      });

      render(<NoteScreen />, { wrapper });

      expect(screen.getByTestId('notes-loading')).toBeOnTheScreen();
    });
  });

  describe('notes list', () => {
    it('shows empty state when no notes', () => {
      useReadNotes.mockReturnValue({
        data: [],
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      });

      render(<NoteScreen />, { wrapper });

      expect(screen.getByText('No notes found')).toBeOnTheScreen();
      expect(
        screen.getByText('Click the + button to start adding your own notes'),
      ).toBeOnTheScreen();
    });

    it('shows NoteList with notes when data is loaded', () => {
      const mockNotes = [
        { $id: 'note-1', text: 'First note' },
        { $id: 'note-2', text: 'Second note' },
      ];
      useReadNotes.mockReturnValue({
        data: mockNotes,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      });

      render(<NoteScreen />, { wrapper });

      expect(screen.getByText('First note')).toBeOnTheScreen();
      expect(screen.getByText('Second note')).toBeOnTheScreen();
    });
  });

  describe('error state', () => {
    it('shows error message when query fails', () => {
      useReadNotes.mockReturnValue({
        data: [],
        isLoading: false,
        error: new Error('Failed to fetch notes'),
        refetch: jest.fn(),
      });

      render(<NoteScreen />, { wrapper });

      expect(screen.getByText('Failed to fetch notes')).toBeOnTheScreen();
    });
  });

  describe('add note flow', () => {
    it('opens modal when Add Note button is pressed', () => {
      render(<NoteScreen />, { wrapper });

      fireEvent.press(screen.getByTestId('notes-add-button'));

      expect(screen.getByText('Add New Note')).toBeOnTheScreen();
      expect(screen.getByTestId('add-note-input')).toBeOnTheScreen();
    });

    it('calls createNote.mutateAsync when saving a new note', async () => {
      mockMutateAsync.mockResolvedValue(undefined);

      render(<NoteScreen />, { wrapper });

      fireEvent.press(screen.getByTestId('notes-add-button'));
      fireEvent.changeText(screen.getByTestId('add-note-input'), 'My new note');
      fireEvent.press(screen.getByTestId('add-note-save'));

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({ text: 'My new note' });
      });
    });
  });

  describe('edit note flow', () => {
    it('calls updateNote.mutateAsync when editing a note', async () => {
      const mockUpdateMutateAsync = jest.fn().mockResolvedValue(undefined);
      useUpdateNote.mockReturnValue({
        mutateAsync: mockUpdateMutateAsync,
        isPending: false,
      });
      useReadNotes.mockReturnValue({
        data: [{ $id: 'note-1', text: 'Original text' }],
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      });

      render(<NoteScreen />, { wrapper });

      fireEvent.press(screen.getByTestId('note-item-edit'));
      fireEvent.changeText(screen.getByTestId('note-item-input'), 'Updated text');
      fireEvent.press(screen.getByTestId('note-item-save'));

      await waitFor(() => {
        expect(mockUpdateMutateAsync).toHaveBeenCalledWith({
          id: 'note-1',
          text: 'Updated text',
        });
      });
    });
  });

  describe('delete note flow', () => {
    it('shows Alert and calls deleteNote.mutateAsync when Delete is confirmed', async () => {
      const mockDeleteMutateAsync = jest.fn().mockResolvedValue(undefined);
      useDeleteNote.mockReturnValue({
        mutateAsync: mockDeleteMutateAsync,
        isPending: false,
      });
      useReadNotes.mockReturnValue({
        data: [{ $id: 'note-1', text: 'Note to delete' }],
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      });

      const alertSpy = jest.spyOn(require('react-native').Alert, 'alert');

      render(<NoteScreen />, { wrapper });

      fireEvent.press(screen.getByTestId('note-item-delete'));

      expect(alertSpy).toHaveBeenCalledWith(
        'Delete Note',
        'are you sure you want to delete this note?',
        expect.any(Array),
      );

      const deleteButton = alertSpy.mock.calls[0][2].find(
        (btn) => btn.text === 'Delete',
      );
      await deleteButton.onPress();

      await waitFor(() => {
        expect(mockDeleteMutateAsync).toHaveBeenCalledWith('note-1');
      });
    });
  });

  describe('unverified user', () => {
    it('shows verification message when user email is not verified', () => {
      useAuth.mockReturnValue({
        user: { ...mockUser, emailVerification: false },
        loading: false,
        resendVerification: jest.fn(),
        checkUser: jest.fn(),
      });

      render(<NoteScreen />, { wrapper });

      expect(
        screen.getByText('Please verify your email to access your notes.'),
      ).toBeOnTheScreen();
      expect(screen.getByTestId('notes-resend-verification')).toBeOnTheScreen();
    });
  });

  describe('hooks integration', () => {
    it('calls useReadNotes with user id', () => {
      render(<NoteScreen />, { wrapper });

      expect(useReadNotes).toHaveBeenCalledWith('user-1');
    });

    it('calls useCreateNote, useUpdateNote, useDeleteNote with user id', () => {
      render(<NoteScreen />, { wrapper });

      expect(useCreateNote).toHaveBeenCalledWith('user-1');
      expect(useUpdateNote).toHaveBeenCalledWith('user-1');
      expect(useDeleteNote).toHaveBeenCalledWith('user-1');
    });
  });
});
