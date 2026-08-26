import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink, Briefcase, Globe } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const WelcomeModal: React.FC<Props> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      className="editor-overlay"
      style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 20, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          backgroundColor: '#FDF2F8',
          borderRadius: 32,
          padding: '32px 40px',
          maxWidth: 720,
          boxShadow: '0 25px 50px -12px rgba(219, 39, 119, 0.15)',
          color: 'var(--text-main)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#EC4899',
            padding: 8,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s, color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(236, 72, 153, 0.1)';
            e.currentTarget.style.color = '#BE185D';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#EC4899';
          }}
        >
          <X size={24} />
        </button>

        <h1 style={{ margin: '0 0 16px 0', fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#DB2777' }}>
          Welcome to Stickee!
        </h1>

        <div style={{ fontSize: '0.95rem', lineHeight: 1.5, color: '#333', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <p style={{ margin: 0 }}>Hi there, and thank you for stopping by!</p>

          <p style={{ margin: 0 }}>
            Stickee was born as a <strong style={{ color: '#DB2777' }}>passion project</strong> to dive deep into modern web development. I built this from scratch as a hands-on way to learn and master <strong style={{ color: '#DB2777' }}>React</strong>, <strong style={{ color: '#DB2777' }}>TypeScript</strong>, <strong style={{ color: '#DB2777' }}>Node.js</strong>, and <strong style={{ color: '#DB2777' }}>Framer Motion</strong>. Alongside building the app, I am writing detailed <strong style={{ color: '#DB2777' }}>code documentation</strong> and <strong style={{ color: '#DB2777' }}>learning notes</strong> covering everything from the absolute basics of the languages all the way up to deploying the app. I will be publishing this entire learning journey along with the finished project!
          </p>

          <p style={{ margin: 0 }}>
            Because this is a live project that is still under active development, you might stumble across a few bugs or buttons that don't quite do anything yet. Don't worry, I'm actively working on them!
          </p>

          <div style={{ display: 'flex', gap: '24px', marginTop: '8px', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '16px', borderRadius: '16px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#111' }}>Here is what you can do right now:</h3>
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong style={{ color: '#DB2777' }}>Infinite Canvas:</strong> Pan and zoom freely across an endless workspace.</li>
                <li><strong style={{ color: '#DB2777' }}>Smart Notes:</strong> Create, edit, and color-code your digital sticky notes.</li>
                <li><strong style={{ color: '#DB2777' }}>Tactile Physics:</strong> Drag and drop elements with highly satisfying interactions.</li>
              </ul>
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.05rem', color: '#111' }}>Sneak peek at the roadmap:</h3>
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong style={{ color: '#DB2777' }}>Scrapbooking:</strong> Add photos, pins, and stickers.</li>
                <li><strong style={{ color: '#DB2777' }}>Drawing:</strong> Draw freely directly on your notes.</li>
                <li><strong style={{ color: '#DB2777' }}>Multiplayer:</strong> Collaborate in real-time.</li>
                <li><strong style={{ color: '#DB2777' }}>Custom Themes:</strong> Personalize your workspace.</li>
                <li><strong style={{ color: '#DB2777' }}>Native Apps:</strong> Support for Mac and Windows.</li>
              </ul>
            </div>
          </div>

          <p style={{ margin: '8px 0 0 0', textAlign: 'center' }}>
            I'm so excited to keep building this! Feel free to play around, and you can check out the source code, connect with me on LinkedIn, or view my other work below:
          </p>
        </div>

        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href="https://github.com/munteanualexandra683-gif"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#DB2777',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '24px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 10px 15px -3px rgba(219, 39, 119, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = '#BE185D';
              e.currentTarget.style.boxShadow = '0 15px 20px -3px rgba(219, 39, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#DB2777';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(219, 39, 119, 0.3)';
            }}
          >
            <ExternalLink size={18} />
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/alexandra-munteanu-5aa485291/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#DB2777',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '24px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 10px 15px -3px rgba(219, 39, 119, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = '#BE185D';
              e.currentTarget.style.boxShadow = '0 15px 20px -3px rgba(219, 39, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#DB2777';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(219, 39, 119, 0.3)';
            }}
          >
            <Briefcase size={18} />
            LinkedIn
          </a>

          <a
            href="https://alexandra-munteanu-portfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#DB2777',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '24px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 10px 15px -3px rgba(219, 39, 119, 0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = '#BE185D';
              e.currentTarget.style.boxShadow = '0 15px 20px -3px rgba(219, 39, 119, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#DB2777';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(219, 39, 119, 0.3)';
            }}
          >
            <Globe size={18} />
            Portfolio
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};
