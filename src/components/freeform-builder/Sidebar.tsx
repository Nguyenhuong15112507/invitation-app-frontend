'use client';

import { useFreeformEditorStore } from '@/store/useFreeformEditorStore';

const WIDGETS = [
  { type: 'text', label: 'Văn bản', icon: 'T' },
  { type: 'image', label: 'Hình ảnh', icon: '🖼️' },
  { type: 'calendar', label: 'Lịch cưới', icon: '📅' },
  { type: 'countdown', label: 'Đếm ngược', icon: '⏲️' },
  { type: 'map', label: 'Bản đồ', icon: '📍' },
  { type: 'gift', label: 'Mừng cưới', icon: '🎁' },
  { type: 'gallery', label: 'Bộ sưu tập', icon: '🎞️' },
];

export default function Sidebar() {
  const { addBlock } = useFreeformEditorStore();

  return (
    <div className="w-72 bg-white border-r h-full overflow-y-auto p-4 flex flex-col gap-4">
      <h3 className="font-bold text-gray-700">Thêm thành phần</h3>
      <div className="grid grid-cols-2 gap-3">
        {WIDGETS.map((w) => (
          <button
            key={w.type}
            onClick={() => addBlock(w.type as any)}
            className="flex flex-col items-center justify-center p-4 border rounded-xl hover:border-rose-400 hover:bg-rose-50 transition-all gap-2 shadow-sm"
          >
            <span className="text-2xl">{w.icon}</span>
            <span className="text-xs font-semibold text-gray-600">{w.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
