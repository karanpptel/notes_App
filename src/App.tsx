import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Note } from './types';
import { NoteCard } from './components/NoteCard';
import { NoteForm } from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();

  const handleCreateNote = (noteData: Partial<Note>) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: noteData.title!,
      content: noteData.content!,
      imageUrl: noteData.imageUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleUpdateNote = (noteData: Partial<Note>) => {
    if (!editingNote) return;
    setNotes((prev) =>
      prev.map((note) =>
        note.id === editingNote.id
          ? {
              ...note,
              ...noteData,
              updatedAt: new Date(),
            }
          : note
      )
    );
    setEditingNote(undefined);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    }
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus className="w-5 h-5" />
            New Note
          </button>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No notes yet. Click the "New Note" button to create one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}

        {isFormOpen && (
          <NoteForm
            note={editingNote}
            onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
            onClose={() => {
              setIsFormOpen(false);
              setEditingNote(undefined);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;