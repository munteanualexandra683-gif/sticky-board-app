const svgToDataUrl = (svg: string) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

export const STICKERS = [
  // Heart
  svgToDataUrl(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 88 C 15 55, 0 35, 15 15 C 25 2, 45 10, 50 25 C 55 10, 75 2, 85 15 C 100 35, 85 55, 50 88" fill="#FF6B6B" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
  </svg>`),
  // Star
  svgToDataUrl(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L60 40 L95 40 L65 60 L75 95 L50 75 L25 95 L35 60 L5 40 L40 40 Z" fill="#FFD93D" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
  </svg>`),
  // Flower
  svgToDataUrl(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="20" r="15" fill="#FF8C42" stroke="#ffffff" stroke-width="3"/>
    <circle cx="80" cy="50" r="15" fill="#FF8C42" stroke="#ffffff" stroke-width="3"/>
    <circle cx="50" cy="80" r="15" fill="#FF8C42" stroke="#ffffff" stroke-width="3"/>
    <circle cx="20" cy="50" r="15" fill="#FF8C42" stroke="#ffffff" stroke-width="3"/>
    <circle cx="71" cy="29" r="15" fill="#FF8C42" stroke="#ffffff" stroke-width="3"/>
    <circle cx="29" cy="29" r="15" fill="#FF8C42" stroke="#ffffff" stroke-width="3"/>
    <circle cx="29" cy="71" r="15" fill="#FF8C42" stroke="#ffffff" stroke-width="3"/>
    <circle cx="71" cy="71" r="15" fill="#FF8C42" stroke="#ffffff" stroke-width="3"/>
    <circle cx="50" cy="50" r="20" fill="#FFD93D" stroke="#ffffff" stroke-width="3"/>
  </svg>`),
  // Smiley
  svgToDataUrl(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#4D96FF" stroke="#ffffff" stroke-width="4"/>
    <circle cx="35" cy="40" r="5" fill="#ffffff"/>
    <circle cx="65" cy="40" r="5" fill="#ffffff"/>
    <path d="M 30 65 Q 50 85 70 65" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
  </svg>`),
  // Sparkle
  svgToDataUrl(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 10 C 50 35, 35 50, 10 50 C 35 50, 50 65, 50 90 C 50 65, 65 50, 90 50 C 65 50, 50 35, 50 10 Z" fill="#6BCB77" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
  </svg>`),
  // Pushpin
  svgToDataUrl(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(30 50 50)">
      <!-- White outline for sticker effect -->
      <path d="M50 50 L50 90" stroke="#ffffff" stroke-width="12" stroke-linecap="round" />
      <path d="M35 15 L65 15 L65 30 L75 40 L75 55 L25 55 L25 40 L35 30 Z" fill="#ffffff" stroke="#ffffff" stroke-width="6" stroke-linejoin="round"/>
      
      <!-- Actual Pin -->
      <path d="M50 50 L50 88" stroke="#9CA3AF" stroke-width="6" stroke-linecap="round" />
      <path d="M35 15 L65 15 L65 30 L75 40 L75 55 L25 55 L25 40 L35 30 Z" fill="#EF4444" stroke="#B91C1C" stroke-width="2" stroke-linejoin="round"/>
      <!-- Highlight -->
      <path d="M32 40 L40 32" stroke="#FCA5A5" stroke-width="4" stroke-linecap="round" />
    </g>
  </svg>`),
  // Scotch Tape
  svgToDataUrl(`<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-15 50 50)">
      <path d="M15 35 L18 36 L15 38 L18 41 L15 44 L18 47 L15 50 L18 53 L15 56 L18 59 L15 62 L18 64 
               L85 64 L82 62 L85 59 L82 56 L85 53 L82 50 L85 47 L82 44 L85 41 L82 38 L85 36 L82 35 Z" 
            fill="rgba(255, 255, 255, 0.6)" 
            stroke="rgba(255, 255, 255, 0.9)" 
            stroke-width="1" 
            stroke-linejoin="round"
            filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.15))" />
      <line x1="20" y1="40" x2="80" y2="40" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
      <line x1="20" y1="58" x2="80" y2="58" stroke="rgba(255, 255, 255, 0.4)" stroke-width="2" />
    </g>
  </svg>`),
];
