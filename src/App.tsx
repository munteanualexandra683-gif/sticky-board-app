import { useState, useEffect } from 'react';
import { useMotionValue, AnimatePresence, animate } from 'framer-motion';
import { Board } from './components/Board';
import { Toolbar } from './components/Toolbar';
import { TopRightToolbar } from './components/TopRightToolbar';
import { NoteEditorOverlay } from './components/NoteEditorOverlay';
import { WelcomeModal } from './components/WelcomeModal';
import type { NoteData } from './types';

function App() {
  const [notes, setNotes] = useState<NoteData[]>(() => {
    const saved = localStorage.getItem('stickee_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notes from local storage', e);
      }
    }
    return [];
  });
  const [editingNote, setEditingNote] = useState<NoteData | null>(null);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(() => {
    return localStorage.getItem('stickee_welcome_seen') !== 'true';
  });
  
  const cameraX = useMotionValue(0);
  const cameraY = useMotionValue(0);
  const cameraScale = useMotionValue(1);

  useEffect(() => {
    localStorage.setItem('stickee_notes', JSON.stringify(notes));
  }, [notes]);

  const handleCloseWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('stickee_welcome_seen', 'true');
  };

  const startAddingNote = () => {



    const worldX = -cameraX.get() / cameraScale.get();
    const worldY = -cameraY.get() / cameraScale.get();

    setEditingNote({
      id: Math.random().toString(36).substr(2, 9),
      x: worldX, 
      y: worldY,
      text: '',
      color: '#FFF9B1'
    });
    setSelectedNoteId(null);
  };

  const handleEditNote = (id: string) => {
    const noteToEdit = notes.find(n => n.id === id);
    if (noteToEdit) {
      setEditingNote(noteToEdit);
      setSelectedNoteId(null);
    }
  };

  const commitNote = () => {
    if (editingNote) {
      if (editingNote.text.trim() !== '') {
         const exists = notes.some(n => n.id === editingNote.id);
         if (exists) {
            setNotes(notes.map(n => n.id === editingNote.id ? editingNote : n));
         } else {
            setNotes([...notes, editingNote]);
         }
      } else {
         setNotes(notes.filter(n => n.id !== editingNote.id));
      }
      setEditingNote(null);
    }
  };

  const updateNote = (id: string, data: Partial<NoteData>) => {
    setNotes(notes.map(note => note.id === id ? { ...note, ...data } : note));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  };

  const bringToFront = (id: string) => {
    setNotes(prev => {
      const noteToMove = prev.find(n => n.id === id);
      if (!noteToMove) return prev;
      return [...prev.filter(n => n.id !== id), noteToMove];
    });
  };

  const handleFitToScreen = () => {
    if (notes.length === 0) {
      animate(cameraX, 0, { type: 'spring', damping: 30, stiffness: 100 });
      animate(cameraY, 0, { type: 'spring', damping: 30, stiffness: 100 });
      animate(cameraScale, 1, { type: 'spring', damping: 30, stiffness: 100 });
      return;
    }

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;

    notes.forEach(note => {
      if (note.x < minX) minX = note.x;
      if (note.x > maxX) maxX = note.x;
      if (note.y < minY) minY = note.y;
      if (note.y > maxY) maxY = note.y;
    });

    const noteWidth = 240;
    const noteHeight = 240;
    const padding = Math.min(window.innerWidth, window.innerHeight) * 0.1;

    const bboxWidth = (maxX - minX) + noteWidth + padding * 2;
    const bboxHeight = (maxY - minY) + noteHeight + padding * 2;

    const scaleX = window.innerWidth / bboxWidth;
    const scaleY = window.innerHeight / bboxHeight;
    const requiredScale = Math.min(scaleX, scaleY, 2);

    const targetWorldCenterX = (minX + maxX) / 2;
    const targetWorldCenterY = (minY + maxY) / 2;

    const targetCameraX = -targetWorldCenterX * requiredScale;
    const targetCameraY = -targetWorldCenterY * requiredScale;

    animate(cameraX, targetCameraX, { type: 'spring', damping: 30, stiffness: 100 });
    animate(cameraY, targetCameraY, { type: 'spring', damping: 30, stiffness: 100 });
    animate(cameraScale, requiredScale, { type: 'spring', damping: 30, stiffness: 100 });
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

      <div 
        className="app-content"
        style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
            setSelectedNoteId(null);
          }
        }}
      >
        <Board 
          cameraX={cameraX} 
          cameraY={cameraY} 
          cameraScale={cameraScale}
          notes={notes}
          updateNote={updateNote}
          bringToFront={bringToFront}
          selectedNoteId={selectedNoteId}
          onSelectNote={setSelectedNoteId}
          onEditNote={handleEditNote}
          onDeleteNote={deleteNote}
        />
        
        <AnimatePresence>
          {!editingNote && (
            <>
              <Toolbar onAddNote={startAddingNote} />
              <TopRightToolbar onFitToScreen={handleFitToScreen} />
            </>
          )}
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

        <AnimatePresence>
          {showWelcome && <WelcomeModal onClose={handleCloseWelcome} />}
        </AnimatePresence>
      </div>
    </>
  )
}

export default App;
