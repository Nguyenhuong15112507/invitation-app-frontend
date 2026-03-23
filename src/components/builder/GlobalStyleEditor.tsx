'use client';
import { GlobalConfig } from '@/lib/sections';
import FileUploader from './FileUploader';

interface Props {
  config: GlobalConfig;
  onChange: (config: GlobalConfig) => void;
}

export default function GlobalStyleEditor({ config, onChange }: Props) {
  const handleChange = (field: keyof GlobalConfig, value: string) => {
    onChange({ ...config, [field]: value });
  };

  const fonts = [
    { label: 'Sans Serif (Mặc định)', value: 'font-sans' },
    { label: 'Serif (Cổ điển)', value: 'font-serif' },
    { label: 'Mono (Hiện đại)', value: 'font-mono' },
  ];

  return (
    <div className="space-y-6 px-6 py-6 font-sans">
      <div className="bg-white p-5 rounded-2xl border shadow-sm">
        <h3 className="text-sm font-bold mb-4 text-gray-800">Cấu Hình Nhạc Nền</h3>
        <FileUploader 
          label="File nhạc cưới (.mp3)"
          accept="audio/*"
          value={config.musicUrl || ''} 
          onChange={url => handleChange('musicUrl', url)}
        />
        <p className="text-[10px] text-gray-400 mt-2">Tính năng phát nhạc tự động chạy khi khách mở thiệp tùy thuộc vào chế độ trình duyệt.</p>
      </div>

      <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
        <h3 className="text-sm font-bold mb-2 text-gray-800">Tùy Chỉnh Giao Diện</h3>
        
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Kiểu chữ chủ đạo</label>
          <select 
            value={config.fontFamily || 'font-serif'} 
            onChange={(e) => handleChange('fontFamily', e.target.value)}
            className="w-full border p-2 rounded-lg text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
          >
            {fonts.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Mã màu Chính (Màu nền, Buttons...)</label>
          <div className="flex items-center gap-2">
             <input type="color" value={config.primaryColor || '#D4AF37'} onChange={e => handleChange('primaryColor', e.target.value)} className="w-8 h-8 rounded shrink-0 cursor-pointer" />
             <input type="text" value={config.primaryColor || '#D4AF37'} onChange={e => handleChange('primaryColor', e.target.value)} className="flex-1 border p-2 text-sm rounded-lg" />
          </div>
        </div>
        
        <div>
          <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">Màu chữ (Title)</label>
          <div className="flex items-center gap-2">
             <input type="color" value={config.textColor || '#8B0000'} onChange={e => handleChange('textColor', e.target.value)} className="w-8 h-8 rounded shrink-0 cursor-pointer" />
             <input type="text" value={config.textColor || '#8B0000'} onChange={e => handleChange('textColor', e.target.value)} className="flex-1 border p-2 text-sm rounded-lg" />
          </div>
        </div>

      </div>
    </div>
  );
}
