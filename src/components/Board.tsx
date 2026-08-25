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
}

export const Board: React.FC<Props> = ({ 
  cameraX, cameraY, cameraScale, 
  notes, updateNote, bringToFront 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Add some spring physics to the panning for a smoother feel
  const springConfig = { damping: 40, stiffness: 100 }; // Slower, heavier spring
  const springX = useSpring(cameraX, springConfig);
  const springY = useSpring(cameraY, springConfig);
  const springScale = useSpring(cameraScale, springConfig);

  useGesture(
    {
      onDrag: ({ delta: [dx, dy] }) => {
        // Reduced pan sensitivity for heavy feel
        cameraX.set(cameraX.get() + (dx * 0.5));
        cameraY.set(cameraY.get() + (dy * 0.5));
      },
      onPinch: ({ offset: [s] }) => {
        cameraScale.set(s);
      },
      onWheel: ({ event, delta: [dx, dy], ctrlKey }) => {
        event.preventDefault();
        
        if (ctrlKey) {
            const currentScale = cameraScale.get();
            // Greatly reduced zoom sensitivity
            const zoomFactor = Math.exp(-dy * 0.001);
            const newScale = Math.max(0.1, Math.min(currentScale * zoomFactor, 5));
            cameraScale.set(newScale);
        } else {
            cameraX.set(cameraX.get() - (dx * 0.5));
            cameraY.set(cameraY.get() - (dy * 0.5));
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
      >
        {notes.map(note => (
           <StickyNote 
              key={note.id} 
              note={note} 
              updateNote={updateNote} 
              bringToFront={bringToFront} 
           />
        ))}
      </motion.div>
    </div>
  );
};
