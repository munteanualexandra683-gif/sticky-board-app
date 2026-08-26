import React from 'react';
import { motion } from 'framer-motion';
import type { NoteData } from '../types';

interface Props {
  note: NoteData;
  updateNote: (id: string, data: Partial<NoteData>) => void;
  bringToFront: (id: string) => void;
}

export const StickyNote: React.FC<Props> = ({ note, updateNote, bringToFront }) => {
  return (
    <motion.div
      layoutId={note.id} // This connects it to the overlay note for the magic shrink animation
      className="sticky-note"
      // Drag configuration
      drag
      dragMomentum={true} // Lets you "throw" the note
      dragElastic={0.1}
      onPointerDown={() => bringToFront(note.id)}
      onDragEnd={(_, info) => {
        // Save the new position to state when drag finishes
        updateNote(note.id, {
          x: note.x + info.offset.x,
          y: note.y + info.offset.y
        });
      }}
      // Visual feedback while dragging
      whileDrag={{ 
        scale: 1.05, 
        boxShadow: "0 30px 40px -10px rgba(0, 0, 0, 0.2), 0 20px 20px -10px rgba(0, 0, 0, 0.15)",
        cursor: "grabbing"
      }}
      // Spawn animation and current position
      initial={{ x: note.x, y: note.y, scale: 0 }}
      animate={{ x: note.x, y: note.y, scale: 1 }}
      transition={{ 
         type: 'spring', 
         stiffness: 300, 
         damping: 25 
      }}
      style={{
          position: 'absolute',
          backgroundColor: note.color || '#FFF9B1' // Apply custom color
      }}
    >
      <textarea
        className="sticky-note-textarea"
        value={note.text}
        onChange={(e) => updateNote(note.id, { text: e.target.value })}
        placeholder="Type something..."
        spellCheck={false}
        style={{
            fontWeight: note.isBold ? 'bold' : 'normal',
            fontStyle: note.isItalic ? 'italic' : 'normal',
            textDecoration: note.isUnderline ? 'underline' : 'none',
            color: note.textColor || 'var(--text-main)',
        }}
        // Prevent pointer down from bubbling up to the drag handler if they just want to click and type
        onPointerDown={(e) => {
            bringToFront(note.id);
            e.stopPropagation();
        }}
      />
    </motion.div>
  );
};
