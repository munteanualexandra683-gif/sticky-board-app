import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useGesture } from '@use-gesture/react';

export const Board: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for pan and zoom
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Add some spring physics to the panning for a smoother feel
  const springConfig = { damping: 25, stiffness: 120 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        x.set(dx);
        y.set(dy);
      },
      onPinch: ({ offset: [s] }) => {
        scale.set(s);
      },
      onWheel: ({ event, delta: [dx, dy], ctrlKey }) => {
        // Prevent default browser scrolling/zooming
        event.preventDefault();
        
        if (ctrlKey) {
            // Zooming (using pinch-to-zoom on trackpad sends wheel with ctrlKey)
            const currentScale = scale.get();
            // Using a smaller multiplier and multiplicative scaling makes zooming much smoother
            const zoomFactor = Math.exp(-dy * 0.002);
            const newScale = Math.max(0.1, Math.min(currentScale * zoomFactor, 5));
            scale.set(newScale);
        } else {
            // Panning
            x.set(x.get() - dx);
            y.set(y.get() - dy);
        }
      }
    },
    {
      target: containerRef,
      eventOptions: { passive: false },
      drag: {
         from: () => [x.get(), y.get()]
      },
      pinch: {
         from: () => [scale.get(), 0],
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
        <div className="demo-note">
           <h1>Welcome to Sticky Board!</h1>
           <p>Pan around by dragging, zoom with pinch or ctrl+scroll.</p>
        </div>
      </motion.div>
    </div>
  );
};
