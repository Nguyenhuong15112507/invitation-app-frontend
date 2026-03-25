import { create } from 'zustand';

export interface Block {
  id: string;
  type: 'text' | 'image' | 'calendar' | 'countdown' | 'map' | 'gift' | 'gallery';
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  content: any; // Nội dung chính (text, image url, ...)
  styles?: {
    padding?: number;
    margin?: number;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: string;
    borderStyle?: string;
    shadowColor?: string;
    shadowBlur?: number;
    shadowX?: number;
    shadowY?: number;
    shadowSpread?: number;
    opacity?: number;
    backgroundColor?: string;
    color?: string; // Cho text
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    textAlign?: string;
    letterSpacing?: number;
    lineHeight?: number;
    textShadow?: string;
    rotate?: number;
  };
  effects?: {
    entry?: string; // fade, slide, etc.
    continuous?: string; // float, pulse, wiggle
    duration?: number;
    delay?: number;
    ease?: string;
  };
  interaction?: {
    type?: 'link' | 'none';
    url?: string;
    target?: '_blank' | '_self';
  };
}

interface FreeformEditorState {
  blocks: Block[];
  selectedBlockId: string | null;
  globalStyles: {
    backgroundColor: string;
    fontFamily: string;
    musicUrl?: string;
    canvasHeight?: number;
    isAutoHeight?: boolean;
  };
  setBlocks: (blocks: Block[]) => void;
  addBlock: (type: Block['type']) => void;
  updateBlock: (id: string, updates: Partial<Block>) => void;
  deleteBlock: (id: string) => void;
  setSelectedBlockId: (id: string | null) => void;
  setGlobalStyles: (styles: Partial<FreeformEditorState['globalStyles']>) => void;
  loadConfig: (config: string) => void;
}

export const useFreeformEditorStore = create<FreeformEditorState>((set) => ({
  blocks: [],
  selectedBlockId: null,
  globalStyles: {
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
    isAutoHeight: true,
    canvasHeight: 812,
  },
  setBlocks: (blocks) => set({ blocks }),
  addBlock: (type) => set((state) => {
    let content: any = {};
    let styles: Block['styles'] = {
      opacity: 1,
      padding: 0,
      borderRadius: 0,
    };

    switch (type) {
      case 'text':
        content = { text: 'Nhập nội dung...' };
        styles.fontSize = 18;
        styles.textAlign = 'center';
        break;
      case 'image':
        content = { url: 'https://placehold.co/400x600?text=Image', objectFit: 'cover' };
        break;
      case 'calendar':
        content = {
          date: '2026-05-28',
          showLunar: false,
          style: 'classic',
          colors: { highlight: '#e11d48', text: '#000000', bg: '#ffffff' }
        };
        break;
      case 'countdown':
        content = {
          targetDate: '2026-05-28T18:00:00',
          labels: { d: 'Ngày', h: 'Giờ', m: 'Phút', s: 'Giây' }
        };
        break;
      case 'map':
        content = {
          address: 'Hà Nội, Việt Nam',
          placeName: 'Địa điểm tổ chức',
          mapUrl: 'https://maps.google.com',
          buttonText: 'Xem bản đồ'
        };
        break;
      case 'gift':
        content = {
          title: 'Gửi lời chúc & Quà tặng',
          message: 'Sự hiện diện của bạn là món quà lớn nhất với chúng tôi',
          bankName: '',
          accountNumber: '',
          accountHolder: '',
          qrUrl: '',
          buttonTitle: 'Mừng cưới'
        };
        break;
      case 'gallery':
        content = {
          images: [
            'https://placehold.co/400x600?text=Photo+1',
            'https://placehold.co/400x600?text=Photo+2',
            'https://placehold.co/400x600?text=Photo+3'
          ],
          columns: 3,
          gap: 10
        };
        break;
    }

    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 50,
      y: 50,
      width: type === 'text' ? 200 : (type === 'image' ? 150 : (type === 'calendar' ? 260 : 300)),
      height: type === 'text' ? 50 : (type === 'image' ? 150 : (type === 'calendar' ? 200 : 150)),
      zIndex: state.blocks.length + 1,
      content,
      styles,
      effects: {
        entry: 'none',
        continuous: 'none',
        duration: 0.8,
        delay: 0,
        ease: 'easeOut',
      },
      interaction: {
        type: 'none',
      }
    };
    return { blocks: [...state.blocks, newBlock], selectedBlockId: newBlock.id };
  }),
  updateBlock: (id, updates) => set((state) => ({
    blocks: state.blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)),
  })),
  deleteBlock: (id) => set((state) => ({
    blocks: state.blocks.filter((b) => b.id !== id),
    selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
  })),
  setSelectedBlockId: (id) => set({ selectedBlockId: id }),
  setGlobalStyles: (styles) => set((state) => ({
    globalStyles: { ...state.globalStyles, ...styles },
  })),
  loadConfig: (config) => {
    try {
      const data = JSON.parse(config);
      set({
        blocks: data.blocks || [],
        globalStyles: data.globalStyles || { backgroundColor: '#ffffff', fontFamily: 'Inter', isAutoHeight: true, canvasHeight: 812 }
      });
    } catch (e) {
      console.error('Failed to load freeform config', e);
    }
  },
}));
