import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Type, Check, ArrowLeft, Plus } from 'lucide-react';
import type { NoteData } from '../types';

interface Props {
  note: NoteData;
  onChange: (data: Partial<NoteData>) => void;
  onCommit: () => void;
}

const COLORS = [
  '#FFF9B1', // Yellow
  '#F4CFDF', // Pink
  '#D4E4E6', // Blue
  '#D7ECD9', // Mint
];

export const NoteEditorOverlay: React.FC<Props> = ({ note, onChange, onCommit }) => {
  const [toolbarMode, setToolbarMode] = useState<'main' | 'colors' | 'custom'>('main');

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(4px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      className="editor-overlay"
    >
      <div className="editor-content">
        <motion.div
          layoutId={note.id}
          className="sticky-note editor-note"
          style={{ backgroundColor: note.color || COLORS[0] }}
        >
          <textarea
            autoFocus
            className="sticky-note-textarea"
            value={note.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Type your brilliant idea..."
          />
        </motion.div>
      </div>

      <div className="editor-toolbar-wrapper">
        <motion.div 
          className="editor-toolbar"
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ padding: '0 24px' }}
        >
          <AnimatePresence mode="popLayout">
            {toolbarMode === 'main' && (
              <motion.div 
                key="main"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', gap: 16, alignItems: 'center', minHeight: 64 }}
              >
                <button 
                  className="editor-icon-btn" 
                  onClick={() => setToolbarMode('colors')}
                  title="Change Color"
                >
                  <Palette size={24} />
                </button>
                <button className="editor-icon-btn" onClick={() => {}} title="Text Style (Coming Soon)">
                  <Type size={24} />
                </button>
                <div className="toolbar-divider" />
                <button className="editor-icon-btn primary" onClick={onCommit} title="Done">
                  <Check size={28} />
                </button>
              </motion.div>
            )}

            {toolbarMode === 'colors' && (
              <motion.div 
                key="colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', gap: 16, alignItems: 'center', minHeight: 64 }}
              >
                {COLORS.map(c => (
                  <button
                    key={c}
                    className="color-swatch"
                    style={{ 
                      backgroundColor: c, 
                      border: note.color === c ? '2px solid var(--text-main)' : '2px solid transparent'
                    }}
                    onClick={() => onChange({ color: c })}
                  />
                ))}
                
                <button 
                  className="custom-color-wrapper" 
                  title="Custom Color"
                  onClick={() => setToolbarMode('custom')}
                >
                  <div className="custom-color-icon">
                    <Plus size={20} />
                  </div>
                </button>
                
                <div className="toolbar-divider" />
                
                <button 
                  className="editor-icon-btn" 
                  onClick={() => setToolbarMode('main')}
                  title="Back"
                >
                  <ArrowLeft size={24} />
                </button>
              </motion.div>
            )}

            {toolbarMode === 'custom' && (
              <motion.div 
                key="custom"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', gap: 16, alignItems: 'center', minHeight: 64 }}
              >
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div className="hex-input-wrapper" style={{ margin: 0, width: 120 }}>
                    <span className="hex-hash">#</span>
                    <input 
                      value={(note.color || '').replace('#', '')} 
                      onChange={(e) => onChange({ color: '#' + e.target.value })} 
                      className="hex-input"
                      maxLength={6}
                      autoFocus
                    />
                  </div>

                  <button 
                    className="editor-icon-btn" 
                    onClick={() => setToolbarMode('colors')}
                    title="Back"
                  >
                    <ArrowLeft size={24} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};
