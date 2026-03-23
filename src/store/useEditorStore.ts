import { create } from 'zustand';
import { InvitationConfig } from '../lib/schema';

interface EditorState {
  config: InvitationConfig;
  updateConfig: (newConfig: Partial<InvitationConfig>) => void;
  isSaving: boolean;
  setSaving: (status: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  config: {
    groomName: '',
    brideName: '',
    date: '',
    time: '',
    location: '',
  },
  updateConfig: (newConfig) => set((state) => ({ 
    config: { ...state.config, ...newConfig } 
  })),
  isSaving: false,
  setSaving: (isSaving) => set({ isSaving }),
}));
