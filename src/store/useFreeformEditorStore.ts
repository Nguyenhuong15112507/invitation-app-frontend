import { create } from 'zustand';

export interface Block {
  id: string;
  type: 'text' | 'image' | 'calendar' | 'countdown' | 'map' | 'gift' | 'gallery';
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  content: any;
}

interface FreeformEditorState {
  blocks: Block[];
  selectedBlockId: string | null;
  globalStyles: {
    backgroundColor: string;
    fontFamily: string;
    musicUrl?: string;
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
  },
  setBlocks: (blocks) => set({ blocks }),
  addBlock: (type) => set((state) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 50,
      y: 50,
      width: type === 'text' ? 200 : 150,
      height: type === 'text' ? 50 : 150,
      zIndex: state.blocks.length + 1,
      content: type === 'text' ? { text: 'Nhập nội dung...', fontSize: 16, color: '#000000', textAlign: 'center' } : {},
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
        globalStyles: data.globalStyles || { backgroundColor: '#ffffff', fontFamily: 'Inter' } 
      });
    } catch (e) {
      console.error('Failed to load freeform config', e);
    }
  },
}));
