import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Move, Trash2 } from 'lucide-react';
import type { NoteData } from '../types';

interface Props {
  note: NoteData;
  updateNote: (id: string, data: Partial<NoteData>) => void;
  bringToFront: (id: string) => void;
  isSelected: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
}


function getDarkerShade(hex: string): string {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  let r = parseInt(hex.substring(0, 2), 16) || 0;
  let g = parseInt(hex.substring(2, 4), 16) || 0;
  let b = parseInt(hex.substring(4, 6), 16) || 0;


  r = Math.max(0, r - 50);
  g = Math.max(0, g - 50);
  b = Math.max(0, b - 50);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const StickyNote: React.FC<Props> = ({ note, updateNote, bringToFront, isSelected, onSelect, onEdit, onDelete }) => {
  const [isMoving, setIsMoving] = useState(false);


  useEffect(() => {
    if (!isSelected) {
      setIsMoving(false);
    }
  }, [isSelected]);

  const baseColor = note.color || '#FFF9B1';
  const outlineColor = getDarkerShade(baseColor);

  return (
    <motion.div

      drag
      dragListener={isMoving} 
      dragMomentum={true}
      dragElastic={0.1}
      onPointerDown={(e) => {
        bringToFront(note.id);
        onSelect();
        e.stopPropagation();
      }}
      onDragEnd={(_, info) => {
        updateNote(note.id, {
          x: note.x + info.offset.x,
          y: note.y + info.offset.y
        });
      }}
      whileDrag={{ 
        scale: 1.08, 
        zIndex: 100,
        cursor: "grabbing"
      }}
      initial={{ x: note.x, y: note.y, scale: 0 }}
      animate={{ 
        x: note.x, 
        y: note.y, 
        scale: isSelected && !isMoving ? 1.03 : 1,
        zIndex: isSelected ? 50 : 1
      }}
      transition={{ 
         type: 'spring', 
         stiffness: 300, 
         damping: 25 
      }}
      style={{
          position: 'absolute',
      }}
    >
      <motion.div
        layoutId={note.id}
        className="sticky-note"
        style={{
            backgroundColor: baseColor,
            outline: isMoving ? `3px solid ${outlineColor}` : `0px solid ${outlineColor}`,
            outlineOffset: '2px',
            cursor: isMoving ? 'grab' : 'default',
            transition: 'outline 0.2s, outline-offset 0.2s',
            boxShadow: isSelected ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' : 'var(--shadow-md)'
        }}
      >
        <textarea
          className="sticky-note-textarea"
          value={note.text}
          readOnly
          placeholder="Type something..."
          spellCheck={false}
          style={{
              fontWeight: note.isBold ? 'bold' : 'normal',
              fontStyle: note.isItalic ? 'italic' : 'normal',
              textDecoration: note.isUnderline ? 'underline' : 'none',
              color: note.textColor || 'var(--text-main)',
              pointerEvents: 'none' 
          }}
        />
      </motion.div>

      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="editor-toolbar"
            style={{
              position: 'absolute',
              bottom: -72,
              left: '50%',
              x: '-50%',
              padding: '0 16px',
              minHeight: 56,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              cursor: 'default',
              boxShadow: 'var(--shadow-md)',
              zIndex: 10
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <button 
              className="editor-icon-btn" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }} 
              title="Edit Note"
            >
              <Pencil size={20} />
            </button>
            
            <div className="toolbar-divider" />
            
            <button 
              className="editor-icon-btn" 
              style={{ backgroundColor: isMoving ? 'var(--canvas-bg)' : 'transparent' }}
              title="Toggle Move Mode"
              onClick={(e) => {
                e.stopPropagation();
                setIsMoving(!isMoving);
              }}
            >
              <Move size={20} />
            </button>
            
            <div className="toolbar-divider" />
            
            <button 
              className="editor-icon-btn" 
              style={{ color: '#EF4444' }}
              title="Delete Note"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
