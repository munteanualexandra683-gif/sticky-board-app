import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Move, Trash2, Maximize2, RotateCw } from 'lucide-react';
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
  const [activeSubMenu, setActiveSubMenu] = useState<'none' | 'scale' | 'rotate'>('none');

  useEffect(() => {
    if (!isSelected) {
      setIsMoving(false);
      setActiveSubMenu('none');
    }
  }, [isSelected]);

  const baseColor = note.color || '#FFF9B1';
  const outlineColor = note.type === 'image' || note.type === 'polaroid' ? '#8B5CF6' : getDarkerShade(baseColor);
  
  const isImageNode = note.type === 'image';
  const isPolaroidNode = note.type === 'polaroid';
  const isStickerNode = note.type === 'sticker';
  const isTextNode = !note.type || note.type === 'text';

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
        zIndex: 100,
        cursor: "grabbing"
      }}
      initial={{ x: note.x, y: note.y }}
      animate={{ 
        x: note.x, 
        y: note.y, 
        zIndex: isSelected ? 9999 : (note.zIndex || 1)
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
        layoutId={isTextNode ? note.id : undefined}
        initial={{ scale: 0, rotate: note.rotation || 0 }}
        animate={{ 
          scale: note.scale || 1,
          rotate: note.rotation || 0
        }}
        whileDrag={{
          scale: (note.scale || 1) * 1.08,
          rotate: note.rotation || 0
        }}
        className={
          isPolaroidNode ? "polaroid-note" : 
          isImageNode ? "image-note" : 
          isStickerNode ? "sticker-node" :
          "sticky-note"
        }
        style={{
            backgroundColor: isTextNode ? baseColor : isPolaroidNode ? '#fff' : 'transparent',
            outline: isMoving ? `3px solid ${outlineColor}` : `0px solid ${outlineColor}`,
            outlineOffset: '2px',
            cursor: isMoving ? 'grab' : 'default',
            transition: 'outline 0.2s, outline-offset 0.2s',
            boxShadow: isSelected && !isStickerNode ? '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)' : (isImageNode || isStickerNode ? 'none' : 'var(--shadow-md)')
        }}
      >
        {isTextNode ? (
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
        ) : isStickerNode ? (
          <img 
            src={note.imageUrl} 
            alt="Sticker" 
            className="sticker-img" 
            draggable={false}
          />
        ) : (
          <img 
            src={note.imageUrl} 
            alt="Board Item" 
            className={isPolaroidNode ? "polaroid-img" : "normal-img"} 
            draggable={false}
          />
        )}
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
            {isTextNode && (
              <>
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
              </>
            )}
            
            <button 
              className="editor-icon-btn" 
              style={{ backgroundColor: activeSubMenu === 'rotate' ? 'var(--canvas-bg)' : 'transparent' }}
              title="Rotate"
              onClick={(e) => {
                e.stopPropagation();
                setActiveSubMenu(prev => prev === 'rotate' ? 'none' : 'rotate');
              }}
            >
              <RotateCw size={20} />
            </button>
            <button 
              className="editor-icon-btn" 
              style={{ backgroundColor: activeSubMenu === 'scale' ? 'var(--canvas-bg)' : 'transparent' }}
              title="Scale"
              onClick={(e) => {
                e.stopPropagation();
                setActiveSubMenu(prev => prev === 'scale' ? 'none' : 'scale');
              }}
            >
              <Maximize2 size={20} />
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

      <AnimatePresence>
        {isSelected && activeSubMenu !== 'none' && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="editor-toolbar-submenu"
            style={{
              position: 'absolute',
              bottom: -136,
              left: '50%',
              x: '-50%',
              padding: '0 20px',
              height: 48,
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              cursor: 'default',
              boxShadow: 'var(--shadow-md)',
              zIndex: 9
            }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            {activeSubMenu === 'scale' && (
              <input 
                type="range" 
                className="custom-range" 
                min="0.3" 
                max="3" 
                step="0.05" 
                value={note.scale || 1}
                onChange={(e) => updateNote(note.id, { scale: parseFloat(e.target.value) })}
              />
            )}
            {activeSubMenu === 'rotate' && (
              <input 
                type="range" 
                className="custom-range" 
                min="-180" 
                max="180" 
                step="1" 
                value={note.rotation || 0}
                onChange={(e) => updateNote(note.id, { rotation: parseInt(e.target.value) })}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
