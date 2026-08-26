import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Type, Check, ArrowLeft, Plus, Bold, Italic, Underline } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
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

const TEXT_COLORS = [
  '#2C2A26', // Default Dark
  '#EF4444', // Red
  '#3B82F6', // Blue
  '#10B981', // Green
];

export const NoteEditorOverlay: React.FC<Props> = ({ note, onChange, onCommit }) => {
  const [toolbarMode, setToolbarMode] = useState<'main' | 'colors' | 'custom' | 'text' | 'custom-text'>('main');

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
          animate={{
            scale: toolbarMode === 'custom' || toolbarMode === 'custom-text' ? 0.85 : 1,
          }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          style={{ backgroundColor: note.color || COLORS[0], transformOrigin: 'center' }}
        >
          <textarea
            autoFocus
            className="sticky-note-textarea"
            value={note.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Type your brilliant idea..."
            spellCheck={false}
            style={{
                fontWeight: note.isBold ? 'bold' : 'normal',
                fontStyle: note.isItalic ? 'italic' : 'normal',
                textDecoration: note.isUnderline ? 'underline' : 'none',
                color: note.textColor || 'var(--text-main)',
            }}
          />
        </motion.div>
      </div>

      <div className="editor-toolbar-wrapper">
        <motion.div 
          className="editor-toolbar"
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ padding: '0 24px', overflow: 'hidden' }}
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
                <button 
                  className="editor-icon-btn" 
                  onClick={() => setToolbarMode('text')} 
                  title="Text Style"
                >
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', minHeight: 64, padding: '24px 0' }}
              >
                <HexColorPicker 
                  color={note.color || '#FFF9B1'} 
                  onChange={(c) => onChange({ color: c })} 
                />
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', width: '100%', padding: '0 8px' }}>
                  <div className="hex-input-wrapper" style={{ margin: 0, width: 120 }}>
                    <span className="hex-hash">#</span>
                    <input 
                      value={(note.color || '').replace('#', '')} 
                      onChange={(e) => onChange({ color: '#' + e.target.value })} 
                      className="hex-input"
                      maxLength={6}
                      spellCheck={false}
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

            {toolbarMode === 'text' && (
              <motion.div 
                key="text"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                style={{ display: 'flex', gap: 12, alignItems: 'center', minHeight: 64 }}
              >
                <button
                  className="editor-icon-btn"
                  style={{ backgroundColor: note.isBold ? 'var(--canvas-bg)' : 'transparent' }}
                  onClick={() => onChange({ isBold: !note.isBold })}
                  title="Bold"
                >
                  <Bold size={20} />
                </button>
                <button
                  className="editor-icon-btn"
                  style={{ backgroundColor: note.isItalic ? 'var(--canvas-bg)' : 'transparent' }}
                  onClick={() => onChange({ isItalic: !note.isItalic })}
                  title="Italic"
                >
                  <Italic size={20} />
                </button>
                <button
                  className="editor-icon-btn"
                  style={{ backgroundColor: note.isUnderline ? 'var(--canvas-bg)' : 'transparent' }}
                  onClick={() => onChange({ isUnderline: !note.isUnderline })}
                  title="Underline"
                >
                  <Underline size={20} />
                </button>
                
                <div className="toolbar-divider" />
                
                {TEXT_COLORS.map(c => (
                  <button
                    key={c}
                    className="color-swatch"
                    style={{ 
                      backgroundColor: c, 
                      border: note.textColor === c || (!note.textColor && c === '#2C2A26') ? '2px solid rgba(0,0,0,0.2)' : '2px solid transparent',
                      width: 24,
                      height: 24
                    }}
                    onClick={() => onChange({ textColor: c })}
                  />
                ))}

                <button 
                  className="custom-color-wrapper" 
                  title="Custom Text Color"
                  onClick={() => setToolbarMode('custom-text')}
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

            {toolbarMode === 'custom-text' && (
              <motion.div 
                key="custom-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, delay: 0.15 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', minHeight: 64, padding: '24px 0' }}
              >
                <HexColorPicker 
                  color={note.textColor || '#2C2A26'} 
                  onChange={(c) => onChange({ textColor: c })} 
                />
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', width: '100%', padding: '0 8px' }}>
                  <div className="hex-input-wrapper" style={{ margin: 0, width: 120 }}>
                    <span className="hex-hash">#</span>
                    <input 
                      value={(note.textColor || '').replace('#', '')} 
                      onChange={(e) => onChange({ textColor: '#' + e.target.value })} 
                      className="hex-input"
                      maxLength={6}
                      spellCheck={false}
                    />
                  </div>

                  <button 
                    className="editor-icon-btn" 
                    onClick={() => setToolbarMode('text')}
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
