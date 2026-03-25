'use client';

import { useState } from 'react';
import { useFreeformEditorStore } from '@/store/useFreeformEditorStore';
import { cinelovePreset } from '@/lib/freeform-templates/cinelovePreset';
import { template55Preset } from '@/lib/freeform-templates/template55Preset';
import { valentinePreset } from '@/lib/freeform-templates/valentinePreset';

const WIDGETS = [
  { type: 'text', label: 'Văn bản', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg> },
  { type: 'image', label: 'Hình ảnh', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { type: 'calendar', label: 'Lịch cưới', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { type: 'countdown', label: 'Đếm ngược', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { type: 'map', label: 'Bản đồ', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { type: 'gift', label: 'Mừng cưới', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-14 0h14" /></svg> },
  { type: 'gallery', label: 'Bộ sưu tập', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> },
];

const FREEFORM_PRESETS = [
  {
    id: 'cinelove',
    label: 'Cinelove Romantic',
    description: 'Phong bì hồng, chữ nghiêng, lịch cưới, bản đồ & album ảnh',
    emoji: '🌸',
    color: 'from-rose-100 to-pink-50',
    accentColor: 'text-rose-600',
    borderColor: 'border-rose-200',
    hoverBg: 'hover:bg-rose-50',
    config: cinelovePreset,
  },
  {
    id: 'template55',
    label: 'Cinelove Classic Green (Mẫu 55)',
    description: 'Tông xanh lá & beige cổ điển, phong cách trang nhã, đầy đủ tính năng',
    emoji: '🌿',
    color: 'from-green-100 to-emerald-50',
    accentColor: 'text-emerald-700',
    borderColor: 'border-green-200',
    hoverBg: 'hover:bg-green-50',
    config: template55Preset,
  },
  {
    id: 'valentine',
    label: 'Valentine Love Letter',
    description: 'Hồng maroon lãng mạn, ảnh Polaroid, thư tình, đếm ngược Valentine',
    emoji: '❤️',
    color: 'from-rose-100 to-red-50',
    accentColor: 'text-rose-800',
    borderColor: 'border-rose-300',
    hoverBg: 'hover:bg-rose-50',
    config: valentinePreset,
  },
];

export default function Sidebar() {
  const { addBlock, setBlocks, setGlobalStyles } = useFreeformEditorStore();
  const [confirmPreset, setConfirmPreset] = useState<(typeof FREEFORM_PRESETS)[0] | null>(null);

  const handleLoadPreset = (preset: (typeof FREEFORM_PRESETS)[0]) => {
    const hasBlocks = useFreeformEditorStore.getState().blocks.length > 0;
    if (hasBlocks) {
      setConfirmPreset(preset);
    } else {
      applyPreset(preset);
    }
  };

  const applyPreset = (preset: (typeof FREEFORM_PRESETS)[0]) => {
    setBlocks(preset.config.blocks as any);
    setGlobalStyles(preset.config.globalStyles);
    setConfirmPreset(null);
  };

  return (
    <div className="w-72 bg-white border-r h-full flex flex-col shadow-sm">
      <div className="p-6 border-b bg-gray-50/50">
        <h3 className="font-black text-gray-800 uppercase tracking-[0.15em] text-xs">Thêm thành phần</h3>
        <p className="text-[10px] text-gray-400 mt-1">Kéo hoặc nhấn để thêm vào thiệp</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-2 gap-4">
          {WIDGETS.map((w) => (
            <button
              key={w.type}
              onClick={() => addBlock(w.type as any)}
              className="group flex flex-col items-center justify-center p-4 border-2 border-transparent bg-gray-50 rounded-3xl hover:bg-rose-50 hover:border-rose-100 transition-all duration-300 gap-3 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl text-gray-400 group-hover:text-rose-500 shadow-sm transition-colors duration-300">
                {w.icon}
              </div>
              <span className="text-[11px] font-black text-gray-600 group-hover:text-rose-600 uppercase tracking-tight">{w.label}</span>
            </button>
          ))}
        </div>

        {/* ─── MẪU CÓ SẴN ─── */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-rose-400">🌸</span>
            <h4 className="text-[10px] font-black text-gray-700 uppercase tracking-[0.15em]">Mẫu có sẵn</h4>
          </div>
          <div className="flex flex-col gap-3">
            {FREEFORM_PRESETS.map((preset) => (
              <div key={preset.id}>
                <button
                  id={`preset-btn-${preset.id}`}
                  onClick={() => handleLoadPreset(preset)}
                  className={`group w-full text-left p-4 rounded-3xl bg-gradient-to-br ${preset.color} border-2 ${preset.borderColor} ${preset.hoverBg} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl">{preset.emoji}</span>
                    <div>
                      <div className={`text-xs font-black ${preset.accentColor} uppercase tracking-tight`}>
                        {preset.label}
                      </div>
                      <div className="text-[9px] text-gray-500 mt-0.5 leading-tight">{preset.description}</div>
                    </div>
                  </div>
                  <div className={`text-[9px] font-bold ${preset.accentColor} opacity-0 group-hover:opacity-100 transition-opacity mt-1`}>
                    ↗ Nhấn để tải mẫu này
                  </div>
                </button>

                {/* Inline confirmation — appears when user has existing blocks */}
                {confirmPreset?.id === preset.id && (
                  <div className="mt-2 p-3 bg-rose-50 border-2 border-rose-200 rounded-2xl">
                    <p className="text-[10px] text-rose-700 font-bold mb-2">
                      ⚠️ Tải mẫu sẽ xoá thiết kế hiện tại. Tiếp tục?
                    </p>
                    <div className="flex gap-2">
                      <button
                        id={`confirm-load-${preset.id}`}
                        onClick={() => applyPreset(preset)}
                        className="flex-1 py-1.5 bg-rose-500 text-white text-[10px] font-black rounded-xl hover:bg-rose-600 transition-colors"
                      >
                        Tải mẫu
                      </button>
                      <button
                        id={`cancel-load-${preset.id}`}
                        onClick={() => setConfirmPreset(null)}
                        className="flex-1 py-1.5 bg-gray-100 text-gray-600 text-[10px] font-bold rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Huỷ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-amber-50 rounded-3xl border border-amber-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-500">✨</span>
            <h4 className="text-[10px] font-bold text-amber-800 uppercase">Mẹo thiết kế</h4>
          </div>
          <p className="text-[10px] text-amber-700 leading-relaxed italic">
            Nhấp đúp chuột vào văn bản để chỉnh sửa trực tiếp trên khung hình.
          </p>
        </div>
      </div>
    </div>
  );
}
