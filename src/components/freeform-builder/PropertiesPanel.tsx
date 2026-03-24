'use client';

import { useFreeformEditorStore } from '@/store/useFreeformEditorStore';

export default function PropertiesPanel() {
  const { selectedBlockId, blocks, updateBlock, deleteBlock, globalStyles, setGlobalStyles } = useFreeformEditorStore();
  
  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-white border-l h-full p-4">
        <h3 className="font-bold text-gray-700 mb-4">Cài đặt chung</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">Màu nền thiệp</label>
            <input 
              type="color" 
              value={globalStyles.backgroundColor}
              onChange={(e) => setGlobalStyles({ backgroundColor: e.target.value })}
              className="w-full h-10 rounded cursor-pointer"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">Font chữ</label>
            <select 
              value={globalStyles.fontFamily}
              onChange={(e) => setGlobalStyles({ fontFamily: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="Inter">Inter</option>
              <option value="Dancing Script">Dancing Script</option>
              <option value="Playfair Display">Playfair Display</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l h-full p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-700 uppercase text-xs tracking-widest">Chỉnh sửa {selectedBlock.type}</h3>
        <button 
          onClick={() => deleteBlock(selectedBlock.id)}
          className="text-red-500 hover:text-red-700 text-xs font-bold"
        >
          Xóa
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {selectedBlock.type === 'text' && (
          <>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-2">Nội dung</label>
              <textarea 
                value={selectedBlock.content.text}
                onChange={(e) => updateBlock(selectedBlock.id, { content: { ...selectedBlock.content, text: e.target.value } })}
                className="w-full p-2 border rounded-xl text-sm min-h-[100px]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-2">Cỡ chữ (px)</label>
              <input 
                type="number"
                value={selectedBlock.content.fontSize}
                onChange={(e) => updateBlock(selectedBlock.id, { content: { ...selectedBlock.content, fontSize: Number(e.target.value) } })}
                className="w-full p-2 border rounded-xl text-sm"
              />
            </div>
          </>
        )}

        {selectedBlock.type === 'image' && (
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">URL Hình ảnh</label>
            <input 
              value={selectedBlock.content.url}
              onChange={(e) => updateBlock(selectedBlock.id, { content: { ...selectedBlock.content, url: e.target.value } })}
              className="w-full p-2 border rounded-xl text-sm"
              placeholder="https://..."
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">Vị trí X</label>
            <input 
              type="number"
              value={Math.round(selectedBlock.x)}
              onChange={(e) => updateBlock(selectedBlock.id, { x: Number(e.target.value) })}
              className="w-full p-2 border rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">Vị trí Y</label>
            <input 
              type="number"
              value={Math.round(selectedBlock.y)}
              onChange={(e) => updateBlock(selectedBlock.id, { y: Number(e.target.value) })}
              className="w-full p-2 border rounded-xl text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">Rộng</label>
            <input 
              type="number"
              value={selectedBlock.width}
              onChange={(e) => updateBlock(selectedBlock.id, { width: Number(e.target.value) })}
              className="w-full p-2 border rounded-xl text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-2">Cao</label>
            <input 
              type="number"
              value={selectedBlock.height}
              onChange={(e) => updateBlock(selectedBlock.id, { height: Number(e.target.value) })}
              className="w-full p-2 border rounded-xl text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
