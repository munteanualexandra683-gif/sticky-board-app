import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, StickyNote, Image as ImageIcon, Heart, ChevronLeft } from 'lucide-react';
import { STICKERS } from '../data/stickers';

const PolaroidIcon = ({ size = 20, color = 'currentColor' }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <rect x="7" y="5" width="10" height="10" />
  </svg>
);

interface Props {
  onAddNote: () => void;
  onAddPicture: (type: 'image' | 'polaroid') => void;
  onAddSticker: (url: string) => void;
}

export const Toolbar: React.FC<Props> = ({ onAddNote, onAddPicture, onAddSticker }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPictureMenuOpen, setIsPictureMenuOpen] = useState(false);
  const [isStickerMenuOpen, setIsStickerMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<React.ReactNode | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (message: React.ReactNode) => {
    setToastMessage(message);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const handlePointerDown = () => {
      setToastMessage(null);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    const timer = setTimeout(() => {
      window.addEventListener('pointerdown', handlePointerDown);
    }, 10);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [toastMessage]);

  return (
    <motion.div 
      className="toolbar-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <motion.div
        animate={{
          width: isOpen ? (isPictureMenuOpen ? 380 : 260) : 64,
          height: 64,
          borderRadius: 32,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 25 
        }}
        className="toolbar-bg"
        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="toolbar-menu"
              style={{ paddingRight: 0 }}
            >
            <AnimatePresence mode="wait">
              {!isPictureMenuOpen ? (
                <motion.div
                  key="main-menu"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 0 }}
                >
                  <button 
                    className="toolbar-icon-btn" 
                    onClick={() => {
                      onAddNote();
                      setIsOpen(false);
                      setToastMessage(null);
                    }}
                    title="Add Sticky Note"
                  >
                    <StickyNote size={22} color="#EAB308" />
                  </button>
                  
                  <button 
                    className="toolbar-icon-btn" 
                    onClick={() => {
                      setIsPictureMenuOpen(true);
                      setToastMessage(null);
                    }}
                    title="Add Picture"
                  >
                    <ImageIcon size={22} color="#8B5CF6" />
                  </button>
                  
                  <button 
                    className="toolbar-icon-btn" 
                    onClick={() => {
                      setIsStickerMenuOpen(!isStickerMenuOpen);
                      setToastMessage(null);
                    }}
                    title="Add Sticker"
                  >
                    <Heart size={22} color="#EF4444" />
                  </button>
                  <div className="toolbar-divider" />
                </motion.div>
              ) : (
                <motion.div
                  key="picture-menu"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.15 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', paddingLeft: '8px' }}
                >
                  <button 
                    className="toolbar-icon-btn" 
                    onClick={() => setIsPictureMenuOpen(false)}
                    title="Back"
                    style={{ color: '#9CA3AF', flexShrink: 0 }}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button 
                    className="toolbar-text-btn" 
                    onClick={() => {
                      onAddPicture('polaroid');
                      setIsOpen(false);
                      setIsPictureMenuOpen(false);
                    }}
                    title="Polaroid Frame"
                  >
                    <PolaroidIcon size={20} color="#8B5CF6" />
                    <span style={{ color: '#8B5CF6' }}>Polaroid</span>
                  </button>
                  
                  <button 
                    className="toolbar-text-btn" 
                    onClick={() => {
                      onAddPicture('image');
                      setIsOpen(false);
                      setIsPictureMenuOpen(false);
                    }}
                    title="Plain Image"
                  >
                    <ImageIcon size={20} color="#6366F1" />
                    <span style={{ color: '#6366F1' }}>Plain</span>
                  </button>
                  <div className="toolbar-divider" />
                </motion.div>
              )}
            </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="toolbar-btn primary"
          onClick={() => {
            if (isOpen) {
              setIsOpen(false);
              setIsPictureMenuOpen(false);
              setIsStickerMenuOpen(false);
            } else {
              setIsOpen(true);
            }
            setToastMessage(null);
          }}
          style={{ width: 64, flexShrink: 0, borderRadius: '50%' }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Plus size={32} />
          </motion.div>
        </button>

      </motion.div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            style={{
              position: 'absolute',
              bottom: 80,
              right: 0,
              backgroundColor: '#ffffff',
              padding: '12px 20px',
              borderRadius: 24,
              boxShadow: 'var(--shadow-lg)',
              color: 'var(--text-main)',
              fontSize: 14,
              fontWeight: 500,
              pointerEvents: 'none',
              maxWidth: 300,
              lineHeight: 1.4,
              textAlign: 'center'
            }}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isStickerMenuOpen && isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="sticker-menu-popup"
          >
            {STICKERS.map((sticker, idx) => (
              <button
                key={idx}
                className="sticker-option-btn"
                onClick={() => {
                  onAddSticker(sticker);
                  setIsStickerMenuOpen(false);
                  setIsOpen(false);
                }}
              >
                <img src={sticker} alt="Sticker" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
