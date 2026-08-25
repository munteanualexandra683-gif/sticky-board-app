import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, StickyNote, Image as ImageIcon, Heart } from 'lucide-react';

export const Toolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="toolbar-container">
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
              style={{ paddingRight: 0 }} // overriding padding to keep divider tight
            >
              <button 
                className="toolbar-icon-btn" 
                onClick={() => {
                  console.log('Add sticky note');
                  setIsOpen(false);
                }}
                title="Add Sticky Note"
              >
                <StickyNote size={22} color="#EAB308" />
              </button>
              
              <button 
                className="toolbar-icon-btn" 
                onClick={() => {
                  console.log('Add picture');
                }}
                title="Add Picture"
              >
                <ImageIcon size={22} color="#8B5CF6" />
              </button>
              
              <button 
                className="toolbar-icon-btn" 
                onClick={() => {
                  console.log('Add sticker');
                }}
                title="Add Sticker"
              >
                <Heart size={22} color="#EF4444" />
              </button>
              
              <div className="toolbar-divider" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* The persistent toggle button */}
        <button
          className="toolbar-btn primary"
          onClick={() => setIsOpen(!isOpen)}
          style={{ width: 64, flexShrink: 0, borderRadius: '50%' }}
        >
          {/* We rotate the icon inside the button by 135 degrees to turn it into an X with a nice spin */}
          <motion.div
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Plus size={32} />
          </motion.div>
        </button>

      </motion.div>
    </div>
  );
};
