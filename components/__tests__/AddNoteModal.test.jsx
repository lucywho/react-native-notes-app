import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import AddNoteModal from '../AddNoteModal';

describe('AddNoteModal', () => {
  const mockSetModalVisible = jest.fn();
  const mockSetNewNote = jest.fn();
  const mockAddNote = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and input when visible', () => {
    render(
      <AddNoteModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        newNote=''
        setNewNote={mockSetNewNote}
        addNote={mockAddNote}
      />,
    );

    expect(screen.getByText('Add New Note')).toBeOnTheScreen();
    expect(screen.getByTestId('add-note-input')).toBeOnTheScreen();
  });

  it('shows input value from newNote prop', () => {
    render(
      <AddNoteModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        newNote='Draft note'
        setNewNote={mockSetNewNote}
        addNote={mockAddNote}
      />,
    );

    expect(screen.getByTestId('add-note-input')).toHaveProp('value', 'Draft note');
  });

  it('calls setNewNote when typing in input', () => {
    render(
      <AddNoteModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        newNote=''
        setNewNote={mockSetNewNote}
        addNote={mockAddNote}
      />,
    );

    fireEvent.changeText(screen.getByTestId('add-note-input'), 'New note text');

    expect(mockSetNewNote).toHaveBeenCalledWith('New note text');
  });

  it('calls setNewNote with empty string and setModalVisible with false when Cancel is pressed', () => {
    render(
      <AddNoteModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        newNote='Unfinished note'
        setNewNote={mockSetNewNote}
        addNote={mockAddNote}
      />,
    );

    fireEvent.press(screen.getByTestId('add-note-cancel'));

    expect(mockSetNewNote).toHaveBeenCalledWith('');
    expect(mockSetModalVisible).toHaveBeenCalledWith(false);
  });

  it('calls addNote when Save is pressed', () => {
    render(
      <AddNoteModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        newNote='My note'
        setNewNote={mockSetNewNote}
        addNote={mockAddNote}
      />,
    );

    fireEvent.press(screen.getByTestId('add-note-save'));

    expect(mockAddNote).toHaveBeenCalled();
  });

});
