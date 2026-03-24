'use client';

interface Block {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  content: any;
}

export default function FreeformViewer({ config }: { config: any }) {
  const { blocks = [], globalStyles = {} } = config;

  return (
    <div 
      className="relative shadow-2xl overflow-hidden" 
      style={{ 
        width: '100%',
        maxWidth: '375px', 
        minHeight: '812px', 
        backgroundColor: globalStyles.backgroundColor || '#ffffff',
        fontFamily: globalStyles.fontFamily || 'Inter',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {blocks.map((block: Block) => (
        <div
          key={block.id}
          style={{
            position: 'absolute',
            top: block.y,
            left: block.x,
            width: block.width,
            height: block.height,
            zIndex: block.zIndex,
          }}
        >
          {renderBlockContent(block)}
        </div>
      ))}
    </div>
  );
}

function renderBlockContent(block: Block) {
  switch (block.type) {
    case 'text':
      return (
        <div style={{ 
          color: block.content.color, 
          fontSize: block.content.fontSize, 
          textAlign: block.content.textAlign, 
          width: '100%',
          wordBreak: 'break-word'
        }}>
          {block.content.text}
        </div>
      );
    case 'image':
      return <img src={block.content.url || 'https://placehold.co/400x400?text=Image'} className="w-full h-full object-cover" />;
    case 'calendar':
      return (
        <div className="bg-white p-2 border rounded shadow-sm text-center">
            <div className="text-red-500 font-bold text-xs">THÁNG 05.2026</div>
            <div className="text-[10px] text-gray-400"> Wedding Day </div>
            <div className="grid grid-cols-7 gap-1 mt-1 text-[8px]">
                {Array.from({ length: 31 }).map((_, i) => (
                    <div key={i} className={i + 1 === 28 ? 'bg-rose-500 text-white rounded-full' : ''}>{i + 1}</div>
                ))}
            </div>
        </div>
      );
    case 'countdown':
      return (
        <div className="bg-rose-600 p-3 text-white text-center rounded-2xl shadow-lg">
          <div className="text-[10px] uppercase tracking-widest opacity-80 mb-1">Đếm ngược</div>
          <div className="flex justify-around items-center">
             <div><div className="font-bold text-lg">128</div><div className="text-[8px]">Ngày</div></div>
             <div><div className="font-bold text-lg">12</div><div className="text-[8px]">Giờ</div></div>
             <div><div className="font-bold text-lg">30</div><div className="text-[8px]">Phút</div></div>
          </div>
        </div>
      );
    case 'map':
      return (
        <div className="bg-white p-3 border rounded-2xl text-center shadow-md">
          <div className="text-xs font-bold text-gray-700 mb-2">📍 Vị trí sảnh tiệc</div>
          <button className="w-full bg-blue-500 text-white text-[10px] font-bold py-2 rounded-xl">Chỉ đường Google Maps</button>
        </div>
      );
    case 'gift':
      return (
        <div className="bg-amber-50 p-3 border border-amber-200 rounded-2xl text-center shadow-inner">
          <div className="text-xs font-bold text-amber-700">🎁 Mừng cưới online</div>
          <div className="text-[9px] text-amber-600 mt-1">Gửi quà cưới tới đôi bạn trẻ</div>
          <button className="mt-2 bg-amber-500 text-white text-[9px] px-3 py-1.5 rounded-lg font-bold">Gửi quà</button>
        </div>
      );
    default:
      return null;
  }
}
