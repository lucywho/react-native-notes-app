import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import NoteItem from '../NoteItem';

describe('NoteItem', () => {
  const mockNote = { $id: 'note-1', text: 'Test note content' };
  const mockOnDelete = jest.fn();
  const mockOnEdit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders note text in view mode', () => {
    render(
      <NoteItem note={mockNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />,
    );

    expect(screen.getByTestId('note-item-text')).toHaveTextContent(
      'Test note content',
    );
  });

  it('switches to edit mode when edit button is pressed', () => {
    render(
      <NoteItem note={mockNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />,
    );

    fireEvent.press(screen.getByTestId('note-item-edit'));

    const input = screen.getByTestId('note-item-input');
    expect(input).toHaveProp('value', 'Test note content');
  });

  it('calls onEdit with note id and edited text when save is pressed', () => {
    render(
      <NoteItem note={mockNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />,
    );

    fireEvent.press(screen.getByTestId('note-item-edit'));
    fireEvent.changeText(screen.getByTestId('note-item-input'), 'Updated text');
    fireEvent.press(screen.getByTestId('note-item-save'));

    expect(mockOnEdit).toHaveBeenCalledWith('note-1', 'Updated text');
  });

  it('exits edit mode after save', () => {
    render(
      <NoteItem note={mockNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />,
    );

    fireEvent.press(screen.getByTestId('note-item-edit'));
    expect(screen.getByTestId('note-item-input')).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId('note-item-save'));

    expect(screen.getByTestId('note-item-text')).toBeOnTheScreen();
    expect(screen.queryByTestId('note-item-input')).toBeNull();
  });

  it('calls onDelete with note id when delete button is pressed', () => {
    render(
      <NoteItem note={mockNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />,
    );

    fireEvent.press(screen.getByTestId('note-item-delete'));

    expect(mockOnDelete).toHaveBeenCalledWith('note-1');
  });

  it('calls onEdit when submitting via keyboard', () => {
    render(
      <NoteItem note={mockNote} onDelete={mockOnDelete} onEdit={mockOnEdit} />,
    );

    fireEvent.press(screen.getByTestId('note-item-edit'));
    fireEvent.changeText(screen.getByTestId('note-item-input'), 'New text');
    fireEvent(screen.getByTestId('note-item-input'), 'submitEditing');

    expect(mockOnEdit).toHaveBeenCalledWith('note-1', 'New text');
  });
});
