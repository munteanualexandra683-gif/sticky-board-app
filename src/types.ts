export interface NoteData {
  id: string;
  x: number;
  y: number;
  text: string;
  color?: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  textColor?: string;
  type?: 'text' | 'image' | 'polaroid' | 'sticker';
  imageUrl?: string;
  zIndex?: number;
  scale?: number;
  rotation?: number;
}
