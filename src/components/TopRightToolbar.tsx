import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Focus, Paintbrush, Users, Settings } from 'lucide-react';

interface Props {
  onFitToScreen: () => void;
}

export const TopRightToolbar: React.FC<Props> = ({ onFitToScreen }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      style={{
        position: 'fixed',
        top: 32,
        right: 32,
        zIndex: 100
      }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <motion.div
        animate={{
          width: isOpen ? 260 : 64,
          height: 64,
          borderRadius: 32,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 400, 
          damping: 25 
        }}
        className="toolbar-bg"
        style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row-reverse' }}
      >
        <button
          className="toolbar-btn primary"
          onClick={() => {
            setIsOpen(!isOpen);
            setToastMessage(null);
          }}
          style={{ width: 64, flexShrink: 0, borderRadius: '50%' }}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Settings size={28} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="toolbar-menu"

              style={{ paddingRight: 0 }}
            >
              <button 
                className="toolbar-icon-btn" 
                onClick={() => {
                  onFitToScreen();
                  setIsOpen(false);
                  setToastMessage(null);
                }}
                title="Fit to Screen"
              >
                <Focus size={22} color="#3B82F6" />
              </button>
              
              <button 
                className="toolbar-icon-btn" 
                onClick={() => {
                  showToast(
                    <>Oops! This will let you customize <span style={{ color: '#8B5CF6', fontWeight: 'bold' }}>board themes</span>, but it's under development.</>
                  );
                }}
                title="Theme (Coming Soon)"
              >
                <Paintbrush size={22} color="#8B5CF6" />
              </button>
              
              <button 
                className="toolbar-icon-btn" 
                onClick={() => {
                  showToast(
                    <>Oops! This will let you <span style={{ color: '#10B981', fontWeight: 'bold' }}>collaborate</span> with others, but it's under development.</>
                  );
                }}
                title="Multiplayer (Coming Soon)"
              >
                <Users size={22} color="#10B981" />
              </button>

              <div className="toolbar-divider" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            style={{
              position: 'absolute',
              top: 80,
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
    </motion.div>
  );
};
