import React, { useRef } from 'react';
import { motion, useSpring, MotionValue } from 'framer-motion';
import { useGesture } from '@use-gesture/react';
import type { NoteData } from '../types';
import { StickyNote } from './StickyNote';

interface Props {
  cameraX: MotionValue<number>;
  cameraY: MotionValue<number>;
  cameraScale: MotionValue<number>;
  notes: NoteData[];
  updateNote: (id: string, data: Partial<NoteData>) => void;
  bringToFront: (id: string) => void;
  selectedNoteId: string | null;
  onSelectNote: (id: string | null) => void;
  onEditNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export const Board: React.FC<Props> = ({ 
  cameraX, cameraY, cameraScale, 
  notes, updateNote, bringToFront,
  selectedNoteId, onSelectNote, onEditNote, onDeleteNote
}) => {
  const containerRef = useRef<HTMLDivElement>(null);


  const springConfig = { damping: 40, stiffness: 100 };
  const springX = useSpring(cameraX, springConfig);
  const springY = useSpring(cameraY, springConfig);
  const springScale = useSpring(cameraScale, springConfig);

  useGesture(
    {
      onDrag: ({ delta: [dx, dy] }) => {

        cameraX.set(cameraX.get() + (dx * 0.25));
        cameraY.set(cameraY.get() + (dy * 0.25));
      },
      onPinch: ({ offset: [s] }) => {
        cameraScale.set(s);
      },
      onWheel: ({ event, delta: [dx, dy], ctrlKey }) => {
        event.preventDefault();
        
        if (ctrlKey) {
            const currentScale = cameraScale.get();

            const zoomFactor = Math.exp(-dy * 0.0005);
            const newScale = Math.max(0.1, Math.min(currentScale * zoomFactor, 5));
            cameraScale.set(newScale);
        } else {
            cameraX.set(cameraX.get() - (dx * 0.25));
            cameraY.set(cameraY.get() - (dy * 0.25));
        }
      }
    },
    {
      target: containerRef,
      eventOptions: { passive: false },
      drag: {
         from: () => [cameraX.get(), cameraY.get()]
      },
      pinch: {
         from: () => [cameraScale.get(), 0],
         scaleBounds: { min: 0.1, max: 5 },
      }
    }
  );

  return (
    <div 
        ref={containerRef} 
        className="board-container"
        style={{ touchAction: 'none' }}
    >
      <motion.div
        className="board-canvas"
        style={{
          x: springX,
          y: springY,
          scale: springScale,
        }}
        onPointerDown={(e) => {
          if (e.target === e.currentTarget) {
             onSelectNote(null);
          }
        }}
      >
        {notes.map(note => (
           <StickyNote 
              key={note.id} 
              note={note} 
              updateNote={updateNote} 
              bringToFront={bringToFront} 
              isSelected={note.id === selectedNoteId}
              onSelect={() => onSelectNote(note.id)}
              onEdit={() => onEditNote(note.id)}
              onDelete={() => onDeleteNote(note.id)}
           />
        ))}
      </motion.div>
    </div>
  );
};
