import { useFreeformEditorStore, Block } from '@/store/useFreeformEditorStore';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FileUploader from '@/components/builder/FileUploader';
import axiosClient from '@/api/axiosClient';

export default function PropertiesPanel() {
  const { selectedBlockId, blocks, updateBlock, deleteBlock, globalStyles, setGlobalStyles } = useFreeformEditorStore();

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-white border-l h-full flex flex-col shadow-2xl z-10 overflow-hidden">
        <div className="p-4 border-b bg-gray-50/30 shrink-0">
          <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider flex items-center gap-2">
            <span className="w-1.5 h-4 bg-rose-500 rounded-full"></span>
            Cài đặt trang
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 custom-scrollbar pb-32">
          <Section title="Nền & Chiều cao" defaultOpen={true}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-2 uppercase">Màu nền trang</label>
                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100">
                  <input
                    type="color"
                    value={globalStyles.backgroundColor}
                    onChange={(e) => setGlobalStyles({ backgroundColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-2 border-white shadow-sm"
                  />
                  <input
                    type="text"
                    value={globalStyles.backgroundColor.toUpperCase()}
                    onChange={(e) => setGlobalStyles({ backgroundColor: e.target.value })}
                    className="flex-1 bg-transparent text-xs font-mono border-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="pt-2 border-t">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] font-bold text-gray-400 uppercase">Tự động dài ra</label>
                  <button
                    onClick={() => setGlobalStyles({ isAutoHeight: !globalStyles.isAutoHeight })}
                    className={`w-10 h-5 rounded-full transition-all duration-300 relative ${globalStyles.isAutoHeight ? 'bg-rose-500' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${globalStyles.isAutoHeight ? 'left-6' : 'left-1'}`} />
                  </button>
                </div>

                {!globalStyles.isAutoHeight && (
                  <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                    <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Chiều cao trang (px)</label>
                    <input
                      type="number"
                      value={globalStyles.canvasHeight || 812}
                      onChange={(e) => setGlobalStyles({ canvasHeight: Number(e.target.value) })}
                      className="w-full p-2 bg-gray-50 border rounded-xl text-sm"
                    />
                  </div>
                )}

                {globalStyles.isAutoHeight && (
                  <p className="text-[10px] text-gray-400 italic">
                    Trang sẽ tự động kéo dài dựa trên khối thấp nhất.
                  </p>
                )}
              </div>
            </div>
          </Section>

          <Section title="Kiểu chữ & Nhạc" defaultOpen={true}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Font chữ mặc định</label>
                <select
                  value={globalStyles.fontFamily}
                  onChange={(e) => setGlobalStyles({ fontFamily: e.target.value })}
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none"
                >
                  <option value="Inter">Inter</option>
                  <option value="Dancing Script">Dancing Script</option>
                  <option value="Cormorant Garamond">Cormorant Garamond</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Roboto">Roboto</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Link nhạc nền (URL)</label>
                <input
                  type="text"
                  value={globalStyles.musicUrl || ''}
                  onChange={(e) => setGlobalStyles({ musicUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-xs outline-none"
                />
              </div>
            </div>
          </Section>
        </div>
      </div>
    );
  }

  const updateStyle = (key: string, value: any) => {
    updateBlock(selectedBlock.id, {
      styles: { ...selectedBlock.styles, [key]: value }
    });
  };

  const updateContent = (updates: any) => {
    updateBlock(selectedBlock.id, {
      content: { ...selectedBlock.content, ...updates }
    });
  };

  const updateEffect = (key: string, value: any) => {
    updateBlock(selectedBlock.id, {
      effects: { ...selectedBlock.effects, [key]: value }
    });
  };

  const updateInteraction = (key: string, value: any) => {
    updateBlock(selectedBlock.id, {
      interaction: { ...selectedBlock.interaction, [key]: value }
    });
  };

  return (
    <div className="w-80 bg-white border-l h-full flex flex-col shadow-2xl z-10 overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between bg-gray-50/30 shrink-0">
        <div className="flex flex-col">
          <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-0.5">Editor</span>
          <h3 className="font-bold text-gray-800 text-sm">
            {selectedBlock.type === 'text' ? 'Chỉnh sửa chữ' : (selectedBlock.type.toUpperCase())}
          </h3>
        </div>
        <button
          onClick={() => deleteBlock(selectedBlock.id)}
          className="p-2 hover:bg-rose-50 text-rose-400 hover:text-rose-500 rounded-2xl transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 custom-scrollbar pb-32">

        {selectedBlock.type === 'text' && (
          <Section title="Kiểu chữ" defaultOpen={true} icon="Tt">
            <div className="flex flex-col gap-4">
              <textarea
                value={selectedBlock.content.text}
                onChange={(e) => updateContent({ text: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm min-h-[100px] focus:ring-2 focus:ring-rose-100 outline-none transition-all placeholder:text-gray-300"
                placeholder="Nhập nội dung chữ..."
              />

              <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
                {['left', 'center', 'right', 'justify'].map(align => (
                  <button
                    key={align}
                    onClick={() => updateStyle('textAlign', align)}
                    className={`flex-1 p-2 rounded-lg text-xs transition-all ${selectedBlock.styles?.textAlign === align ? 'bg-white shadow-sm text-rose-500' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <span className="capitalize">{align.charAt(0)}</span>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Cỡ chữ</label>
                  <input
                    type="number"
                    value={selectedBlock.styles?.fontSize || 16}
                    onChange={(e) => updateStyle('fontSize', Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Màu chữ</label>
                  <input
                    type="color"
                    value={selectedBlock.styles?.color || '#000000'}
                    onChange={(e) => updateStyle('color', e.target.value)}
                    className="w-full h-9 p-1 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider">Font chữ</label>
                <select
                  value={selectedBlock.styles?.fontFamily || 'inherit'}
                  onChange={(e) => updateStyle('fontFamily', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-100 transition-all font-medium"
                >
                  <option value="inherit">Mặc định</option>
                  <option value="Dancing Script">Dancing Script</option>
                  <option value="Cormorant Garamond">Cormorant Garamond</option>
                  <option value="Playfair Display">Playfair Display</option>
                  <option value="Great Vibes">Great Vibes</option>
                </select>
              </div>
            </div>
          </Section>
        )}

        {selectedBlock.type === 'calendar' && (
          <Section title="Cài đặt lịch" defaultOpen={true}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Ngày tổ chức</label>
                <input
                  type="date"
                  value={selectedBlock.content.date}
                  onChange={(e) => updateContent({ date: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-100 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Màu Highlight</label>
                  <input
                    type="color"
                    value={selectedBlock.content.colors?.highlight || '#e11d48'}
                    onChange={(e) => updateContent({ colors: { ...selectedBlock.content.colors, highlight: e.target.value } })}
                    className="w-full h-9 p-1 bg-gray-50 border rounded-xl cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2 mt-5">
                  <input
                    type="checkbox"
                    checked={selectedBlock.content.showLunar}
                    onChange={(e) => updateContent({ showLunar: e.target.checked })}
                    className="accent-rose-500"
                  />
                  <span className="text-[10px] font-bold text-gray-600">Lịch âm</span>
                </div>
              </div>
            </div>
          </Section>
        )}

        {selectedBlock.type === 'countdown' && (
          <Section title="Cài đặt đếm ngược" defaultOpen={true}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Ngày giờ kết thúc</label>
                <input
                  type="datetime-local"
                  value={selectedBlock.content.targetDate}
                  onChange={(e) => updateContent({ targetDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-100 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['d', 'h', 'm', 's'].map(key => (
                  <div key={key}>
                    <label className="text-[8px] font-bold text-gray-400 uppercase">{key === 'd' ? 'Ngày' : (key === 'h' ? 'Giờ' : (key === 'm' ? 'Phút' : 'Giây'))}</label>
                    <input
                      type="text"
                      value={selectedBlock.content.labels?.[key] || ''}
                      onChange={(e) => updateContent({ labels: { ...selectedBlock.content.labels, [key]: e.target.value } })}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-rose-100 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Section>
        )}

        {selectedBlock.type === 'map' && (
          <Section title="Cài đặt bản đồ" defaultOpen={true}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Tên địa điểm</label>
                <input
                  type="text"
                  value={selectedBlock.content.placeName}
                  onChange={(e) => updateContent({ placeName: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Địa chỉ</label>
                <textarea
                  value={selectedBlock.content.address}
                  onChange={(e) => updateContent({ address: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-xl text-xs min-h-[60px]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Link Google Maps</label>
                <input
                  type="text"
                  value={selectedBlock.content.mapUrl}
                  onChange={(e) => updateContent({ mapUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-rose-100 outline-none"
                  placeholder="https://goo.gl/maps/..."
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Text nút bấm</label>
                <input
                  type="text"
                  value={selectedBlock.content.buttonText}
                  onChange={(e) => updateContent({ buttonText: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-xl text-sm"
                />
              </div>
            </div>
          </Section>
        )}

        {selectedBlock.type === 'gift' && (
          <Section title="Thông tin mừng cưới" defaultOpen={true}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Tiêu đề</label>
                <input
                  type="text"
                  value={selectedBlock.content.title}
                  onChange={(e) => updateContent({ title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Tên ngân hàng</label>
                <input
                  type="text"
                  value={selectedBlock.content.bankName}
                  onChange={(e) => updateContent({ bankName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Số tài khoản</label>
                  <input
                    type="text"
                    value={selectedBlock.content.accountNumber}
                    onChange={(e) => updateContent({ accountNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Chủ tài khoản</label>
                  <input
                    type="text"
                    value={selectedBlock.content.accountHolder}
                    onChange={(e) => updateContent({ accountHolder: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  />
                </div>
              </div>
              <FileUploader
                label="Mã QR (Ảnh)"
                value={selectedBlock.content.qrUrl}
                onChange={(url) => updateContent({ qrUrl: url })}
              />
            </div>
          </Section>
        )}

        {selectedBlock.type === 'gallery' && (
          <Section title="Bộ sưu tập ảnh" defaultOpen={true}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-2">
                {selectedBlock.content.images?.map((img: string, idx: number) => (
                  <div key={idx} className="aspect-square relative group rounded-lg overflow-hidden border">
                    <img src={img} className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        const newImgs = [...selectedBlock.content.images];
                        newImgs.splice(idx, 1);
                        updateContent({ images: newImgs });
                      }}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-x-1"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = async (e: any) => {
                      const file = e.target.files[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append('file', file);
                      try {
                        const res = await axiosClient.post('/uploads', formData);
                        const urlPart = res.data.url;
                        const apiBase = axiosClient.defaults.baseURL || 'http://127.0.0.1:4000';
                        const cleanBase = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;
                        const cleanUrl = urlPart.startsWith('/') ? urlPart : '/' + urlPart;
                        const finalUrl = cleanBase + cleanUrl;
                        updateContent({ images: [...(selectedBlock.content.images || []), finalUrl] });
                      } catch (err) { alert('Upload lỗi'); }
                    };
                    input.click();
                  }}
                  className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 hover:border-rose-300 hover:text-rose-500 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Số cột</label>
                  <input type="number" value={selectedBlock.content.columns || 3} onChange={(e) => updateContent({ columns: Number(e.target.value) })} className="w-full p-2 bg-gray-50 border rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Khoảng cách</label>
                  <input type="number" value={selectedBlock.content.gap || 10} onChange={(e) => updateContent({ gap: Number(e.target.value) })} className="w-full p-2 bg-gray-50 border rounded-xl text-sm" />
                </div>
              </div>
            </div>
          </Section>
        )}

        {selectedBlock.type === 'image' && (
          <Section title="Cài đặt ảnh" defaultOpen={true}>
            <div className="flex flex-col gap-4">
              <FileUploader
                label="Hình ảnh"
                value={selectedBlock.content.url}
                onChange={(url) => updateContent({ url: url })}
              />
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Chế độ hiển thị</label>
                <select
                  value={selectedBlock.content.objectFit || 'cover'}
                  onChange={(e) => updateContent({ objectFit: e.target.value })}
                  className="w-full p-2 bg-gray-50 border rounded-xl text-sm"
                >
                  <option value="cover">Phủ kín (Cover)</option>
                  <option value="contain">Vừa vặn (Contain)</option>
                  <option value="fill">Kéo giãn (Fill)</option>
                </select>
              </div>
            </div>
          </Section>
        )}

        <Section title="Vị trí & Kích thước">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">X</label>
                <input type="number" value={Math.round(selectedBlock.x)} onChange={(e) => updateBlock(selectedBlock.id, { x: Number(e.target.value) })} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-100 outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Y</label>
                <input type="number" value={Math.round(selectedBlock.y)} onChange={(e) => updateBlock(selectedBlock.id, { y: Number(e.target.value) })} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-100 outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Rộng</label>
                <input type="number" value={Math.round(selectedBlock.width)} onChange={(e) => updateBlock(selectedBlock.id, { width: Number(e.target.value) })} className="w-full p-2 bg-gray-50 border rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase tracking-wider ml-1">Cao</label>
                <input type="number" value={Math.round(selectedBlock.height)} onChange={(e) => updateBlock(selectedBlock.id, { height: Number(e.target.value) })} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-rose-100 outline-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Góc xoay: {selectedBlock.styles?.rotate || 0}°</label>
              <input type="range" min="-180" max="180" value={selectedBlock.styles?.rotate || 0} onChange={(e) => updateStyle('rotate', Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
          </div>
        </Section>

        <Section title="Đường viền & Bo góc">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Bo góc</label>
                <input type="number" value={selectedBlock.styles?.borderRadius || 0} onChange={(e) => updateStyle('borderRadius', Number(e.target.value))} className="w-full p-2 bg-gray-50 border rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Độ dày</label>
                <input type="number" value={selectedBlock.styles?.borderWidth || 0} onChange={(e) => updateStyle('borderWidth', Number(e.target.value))} className="w-full p-2 bg-gray-50 border rounded-xl text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Kiểu viền</label>
                <select
                  value={selectedBlock.styles?.borderStyle || 'solid'}
                  onChange={(e) => updateStyle('borderStyle', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-100"
                >
                  <option value="solid">Liền (Solid)</option>
                  <option value="dashed">Đứt quãng (Dashed)</option>
                  <option value="dotted">Chấm (Dotted)</option>
                  <option value="double">Kép (Double)</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Màu viền</label>
                <input type="color" value={selectedBlock.styles?.borderColor || '#000000'} onChange={(e) => updateStyle('borderColor', e.target.value)} className="w-full h-9 p-1 bg-gray-50 border rounded-xl cursor-pointer" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Đổ bóng">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">X Offset</label>
                <input type="number" value={selectedBlock.styles?.shadowX || 0} onChange={(e) => updateStyle('shadowX', Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-rose-100 outline-none" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Y Offset</label>
                <input type="number" value={selectedBlock.styles?.shadowY || 0} onChange={(e) => updateStyle('shadowY', Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-rose-100 outline-none" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Độ nhòe (Blur)</label>
                <input type="number" value={selectedBlock.styles?.shadowBlur || 0} onChange={(e) => updateStyle('shadowBlur', Number(e.target.value))} className="w-full p-2 bg-gray-50 border rounded-xl text-xs" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 block mb-1 uppercase">Độ rộng (Spread)</label>
                <input type="number" value={selectedBlock.styles?.shadowSpread || 0} onChange={(e) => updateStyle('shadowSpread', Number(e.target.value))} className="w-full p-2 bg-gray-50 border rounded-xl text-xs" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Màu đổ bóng</label>
              <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 border border-gray-100 rounded-xl">
                <input type="color" value={selectedBlock.styles?.shadowColor || '#00000033'} onChange={(e) => updateStyle('shadowColor', e.target.value)} className="w-8 h-8 rounded-lg cursor-pointer border-2 border-white shadow-sm" />
                <input type="text" value={(selectedBlock.styles?.shadowColor || '#00000033').toUpperCase()} onChange={(e) => updateStyle('shadowColor', e.target.value)} className="bg-transparent text-xs font-mono border-none focus:ring-0 flex-1" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Hiệu ứng & Chuyển động">
          <div className="flex flex-col gap-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 block mb-2 uppercase">Trong suốt: {Math.round((selectedBlock.styles?.opacity ?? 1) * 100)}%</label>
              <input type="range" min="0" max="1" step="0.01" value={selectedBlock.styles?.opacity ?? 1} onChange={(e) => updateStyle('opacity', Number(e.target.value))} className="w-full accent-rose-500" />
            </div>

            <div className="border-t pt-4">
              <label className="text-[10px] font-bold text-gray-400 block mb-2 uppercase tracking-widest">Hiệu ứng xuất hiện</label>
              <div className="flex flex-col gap-3">
                <select
                  value={selectedBlock.effects?.entry || 'none'}
                  onChange={(e) => updateEffect('entry', e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-rose-100 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat transition-all"
                >
                  <option value="none">Không có</option>
                  <option value="fade">Hiện dần (Fade)</option>
                  <option value="slideUp">Trượt lên (Slide Up)</option>
                  <option value="slideDown">Trượt xuống (Slide Down)</option>
                  <option value="slideLeft">Trượt trái (Slide Left)</option>
                  <option value="slideRight">Trượt phải (Slide Right)</option>
                  <option value="zoomIn">Thu nhỏ (Zoom In)</option>
                  <option value="zoomOut">Phóng to (Zoom Out)</option>
                  <option value="rotateIn">Xoay vào (Rotate In)</option>
                </select>

                {selectedBlock.effects?.entry !== 'none' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase">Thời gian (s)</label>
                      <input type="number" step="0.1" value={selectedBlock.effects?.duration || 0.8} onChange={(e) => updateEffect('duration', Number(e.target.value))} className="w-full p-2 bg-gray-50 border rounded-xl text-xs" />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-gray-400 uppercase">Độ trễ (s)</label>
                      <input type="number" step="0.1" value={selectedBlock.effects?.delay || 0} onChange={(e) => updateEffect('delay', Number(e.target.value))} className="w-full p-2 bg-gray-50 border rounded-xl text-xs" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <label className="text-[10px] font-bold text-gray-400 block mb-2 uppercase tracking-widest">Chuyển động liên tục</label>
              <select
                value={selectedBlock.effects?.continuous || 'none'}
                onChange={(e) => updateEffect('continuous', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-rose-100 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22currentColor%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%20%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat transition-all"
              >
                <option value="none">Không có</option>
                <option value="float">Bay lơ lửng (Float)</option>
                <option value="pulse">Nhịp đập (Pulse)</option>
                <option value="bounce">Nảy (Bounce)</option>
                <option value="spin">Xoay tròn (Spin)</option>
                <option value="flash">Nhấp nháy (Flash)</option>
                <option value="wiggle">Lắc (Wiggle)</option>
              </select>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children, defaultOpen = false, icon }: { title: string; children: React.ReactNode; defaultOpen?: boolean; icon?: string }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-gray-100 rounded-[2rem] bg-white shadow-sm hover:shadow-md transition-shadow duration-300 relative ${isOpen ? 'ring-1 ring-rose-50' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors ${isOpen ? 'border-b border-gray-50 bg-gray-50/30' : ''}`}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="w-6 h-6 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl font-bold text-[10px]">{icon}</span>}
          <span className="text-[12px] font-black text-gray-700 uppercase tracking-tight">{title}</span>
        </div>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
