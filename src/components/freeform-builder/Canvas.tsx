'use client';

import { useFreeformEditorStore, Block } from '@/store/useFreeformEditorStore';
import { motion } from 'framer-motion';

export default function Canvas() {
  const { blocks, updateBlock, setSelectedBlockId, globalStyles, selectedBlockId } = useFreeformEditorStore();

  return (
    <div 
      className="relative mx-auto bg-white shadow-2xl overflow-hidden" 
      style={{ 
        width: '375px', 
        height: '812px', 
        backgroundColor: globalStyles.backgroundColor,
        position: 'relative'
      }}
      onClick={() => setSelectedBlockId(null)}
    >
      {blocks.map((block) => (
        <BlockItem key={block.id} block={block} isSelected={selectedBlockId === block.id} />
      ))}
    </div>
  );
}

function BlockItem({ block, isSelected }: { block: Block; isSelected: boolean }) {
  const { updateBlock, setSelectedBlockId } = useFreeformEditorStore();

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragEnd={(e, info) => {
        updateBlock(block.id, { x: block.x + info.offset.x, y: block.y + info.offset.y });
      }}
      onTap={() => setSelectedBlockId(block.id)}
      style={{
        position: 'absolute',
        left: block.x,
        top: block.y,
        width: block.width,
        height: block.height,
        zIndex: block.zIndex,
        outline: isSelected ? '2px solid #e11d48' : 'none',
        cursor: 'move',
        userSelect: 'none'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {renderBlockContent(block)}
    </motion.div>
  );
}

function renderBlockContent(block: Block) {
  switch (block.type) {
    case 'text':
      return (
        <div style={{ color: block.content.color, fontSize: block.content.fontSize, textAlign: block.content.textAlign, width: '100%' }}>
          {block.content.text}
        </div>
      );
    case 'image':
      return <img src={block.content.url || 'https://placehold.co/400x400?text=Image'} className="w-full h-full object-cover" />;
    case 'calendar':
      return (
        <div className="bg-white p-2 border rounded shadow-sm text-center">
          <div className="text-red-500 font-bold text-xs">Calendar Block</div>
          <div className="text-[10px]">28.02.2026</div>
        </div>
      );
    case 'countdown':
      return (
        <div className="bg-rose-500 p-2 text-white text-center rounded">
          <div className="text-[10px]">Lễ cưới diễn ra sau:</div>
          <div className="text-xs font-bold">128 Ngày 12:30:10</div>
        </div>
      );
    case 'map':
      return (
        <div className="bg-gray-100 p-2 border rounded text-center">
          <div className="text-[10px]">Bản đồ đường đi</div>
          <button className="bg-blue-500 text-white text-[8px] px-2 py-1 rounded mt-1">Mở Map</button>
        </div>
      );
    case 'gift':
      return (
        <div className="bg-amber-50 p-2 border border-amber-200 rounded text-center">
          <div className="text-[10px]">🎁 Mừng cưới</div>
          <div className="text-[8px] mt-1">Gửi lời chúc & quà tặng</div>
        </div>
      );
    default:
      return <div>Block: {block.type}</div>;
  }
}
