import React, { useState } from 'react';
import { useMotionValue, AnimatePresence } from 'framer-motion';
import { Board } from './components/Board';
import { Toolbar } from './components/Toolbar';
import { NoteEditorOverlay } from './components/NoteEditorOverlay';
import type { NoteData } from './types';

function App() {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [editingNote, setEditingNote] = useState<NoteData | null>(null);
  
  const cameraX = useMotionValue(0);
  const cameraY = useMotionValue(0);
  const cameraScale = useMotionValue(1);

  const startAddingNote = () => {
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    
    const worldX = (screenCenterX - cameraX.get()) / cameraScale.get();
    const worldY = (screenCenterY - cameraY.get()) / cameraScale.get();

    setEditingNote({
      id: Math.random().toString(36).substr(2, 9),
      x: worldX - 120, // Center the 240px wide note
      y: worldY - 120,
      text: '',
      color: '#FFF9B1' // Default yellow
    });
  };

  const commitNote = () => {
    if (editingNote) {
      if (editingNote.text.trim() !== '') {
         // Only save it to the board if they actually typed something
         setNotes([...notes, editingNote]);
      }
      setEditingNote(null);
    }
  };

  const updateNote = (id: string, data: Partial<NoteData>) => {
    setNotes(notes.map(note => note.id === id ? { ...note, ...data } : note));
  };

  const bringToFront = (id: string) => {
    setNotes(prev => {
      const noteToMove = prev.find(n => n.id === id);
      if (!noteToMove) return prev;
      return [...prev.filter(n => n.id !== id), noteToMove];
    });
  };

  return (
    <>
      <div className="mobile-overlay">
        <div className="mobile-message">
          <h2>Oops!</h2>
          <div className="text-content">
            <p>Sorry, no phones allowed!</p>
            <div className="expandable">
              <div className="just-kidding">
                <br/>
                <p>Just kidding, I just haven't built it yet.</p>
                <p>See you on desktop! 😊</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="app-content">
        <Board 
          cameraX={cameraX} 
          cameraY={cameraY} 
          cameraScale={cameraScale}
          notes={notes}
          updateNote={updateNote}
          bringToFront={bringToFront}
        />
        
        {/* Hide the main toolbar if we are editing */}
        <AnimatePresence>
          {!editingNote && <Toolbar onAddNote={startAddingNote} />}
        </AnimatePresence>

        <AnimatePresence>
          {editingNote && (
             <NoteEditorOverlay 
                note={editingNote} 
                onChange={(data) => setEditingNote({ ...editingNote, ...data })} 
                onCommit={commitNote} 
             />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default App;
