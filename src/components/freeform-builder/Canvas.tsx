'use client';

import { useFreeformEditorStore, Block } from '@/store/useFreeformEditorStore';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

export default function Canvas() {
  const { blocks, setSelectedBlockId, globalStyles, selectedBlockId } = useFreeformEditorStore();

  const calculateHeight = () => {
    if (blocks.length === 0) return '812px';

    // Find bottom-most point
    const maxBottom = Math.max(...blocks.map(b => b.y + b.height));
    const autoHeight = Math.max(812, maxBottom + 60); // 60px padding bottom

    if (globalStyles.isAutoHeight === false && globalStyles.canvasHeight) {
      return `${globalStyles.canvasHeight}px`;
    }

    return `${autoHeight}px`;
  };

  const finalHeight = calculateHeight();

  return (
    <div
      className="relative mx-auto bg-white shadow-2xl transition-[height] duration-300 ease-in-out"
      style={{
        width: '375px',
        height: finalHeight,
        minHeight: '812px',
        backgroundColor: globalStyles.backgroundColor,
        fontFamily: globalStyles.fontFamily,
        position: 'relative'
      }}
      onClick={() => setSelectedBlockId(null)}
    >
      {blocks.sort((a, b) => a.zIndex - b.zIndex).map((block) => (
        <BlockItem key={block.id} block={block} isSelected={selectedBlockId === block.id} />
      ))}
    </div>
  );
}

function BlockItem({ block, isSelected }: { block: Block; isSelected: boolean }) {
  const { updateBlock, setSelectedBlockId } = useFreeformEditorStore();
  const [isEditing, setIsEditing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
      const range = document.createRange();
      range.selectNodeContents(textRef.current);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isEditing]);

  const getContinuousAnimation = () => {
    if (isEditing) return {};
    const type = block.effects?.continuous;
    switch (type) {
      case 'float':
        return {
          y: [0, -10, 0],
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } as any
        };
      case 'pulse':
        return {
          scale: [1, 1.05, 1],
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } as any
        };
      case 'bounce':
        return {
          y: [0, -15, 0],
          transition: { duration: 0.6, repeat: Infinity, ease: 'easeOut' } as any
        };
      case 'spin':
        return {
          rotate: [0, 360],
          transition: { duration: 4, repeat: Infinity, ease: 'linear' } as any
        };
      case 'flash':
        return {
          opacity: [1, 0.4, 1],
          transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' } as any
        };
      case 'wiggle':
        return {
          rotate: [0, -3, 3, -3, 0],
          transition: { duration: 0.5, repeat: Infinity, ease: 'linear' } as any
        };
      default:
        return {};
    }
  };

  const getEntryAnimation = () => {
    const type = block.effects?.entry || 'none';
    const duration = block.effects?.duration || 0.8;
    const delay = block.effects?.delay || 0;
    const ease = block.effects?.ease || 'easeOut';

    const baseTransition = { duration, delay, ease } as any;

    switch (type) {
      case 'fade':
        return { initial: { opacity: 0 }, whileInView: { opacity: block.styles?.opacity ?? 1 }, transition: baseTransition };
      case 'slideUp':
        return { initial: { opacity: 0, y: 50 }, whileInView: { opacity: block.styles?.opacity ?? 1, y: 0 }, transition: baseTransition };
      case 'slideDown':
        return { initial: { opacity: 0, y: -50 }, whileInView: { opacity: block.styles?.opacity ?? 1, y: 0 }, transition: baseTransition };
      case 'slideLeft':
        return { initial: { opacity: 0, x: 50 }, whileInView: { opacity: block.styles?.opacity ?? 1, x: 0 }, transition: baseTransition };
      case 'slideRight':
        return { initial: { opacity: 0, x: -50 }, whileInView: { opacity: block.styles?.opacity ?? 1, x: 0 }, transition: baseTransition };
      case 'zoomIn':
        return { initial: { opacity: 0, scale: 0.5 }, whileInView: { opacity: block.styles?.opacity ?? 1, scale: 1 }, transition: baseTransition };
      case 'zoomOut':
        return { initial: { opacity: 0, scale: 1.5 }, whileInView: { opacity: block.styles?.opacity ?? 1, scale: 1 }, transition: baseTransition };
      case 'rotateIn':
        return { initial: { opacity: 0, rotate: -180, scale: 0.5 }, whileInView: { opacity: block.styles?.opacity ?? 1, rotate: block.styles?.rotate || 0, scale: 1 }, transition: baseTransition };
      default:
        return {};
    }
  };

  const entryAnim = getEntryAnimation();

  const blockStyles = {
    position: 'absolute' as const,
    left: block.x,
    top: block.y,
    width: block.width,
    height: block.height,
    zIndex: block.zIndex,
    // transform: `rotate(${block.styles?.rotate || 0}deg)`, // Framer motion handles rotation better via rotate prop
    rotate: block.styles?.rotate || 0,
    opacity: block.styles?.opacity ?? 1,
    borderRadius: block.styles?.borderRadius || 0,
    borderWidth: block.styles?.borderWidth || 0,
    borderColor: block.styles?.borderColor || 'transparent',
    borderStyle: block.styles?.borderStyle || 'solid',
    boxShadow: block.styles?.shadowX !== undefined
      ? `${block.styles.shadowX}px ${block.styles.shadowY}px ${block.styles.shadowBlur}px ${block.styles.shadowSpread || 0}px ${block.styles.shadowColor}`
      : 'none',
    backgroundColor: block.styles?.backgroundColor || 'transparent',
    padding: `${block.styles?.padding || 0}px`,
    outline: isSelected ? '2px solid #e11d48' : 'none',
    cursor: isEditing ? 'text' : 'move',
    userSelect: 'none' as const,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const handleResize = (dir: string, deltaX: number, deltaY: number) => {
    let newX = block.x;
    let newY = block.y;
    let newWidth = block.width;
    let newHeight = block.height;

    if (dir.includes('e')) newWidth += deltaX;
    if (dir.includes('w')) { newWidth -= deltaX; newX += deltaX; }
    if (dir.includes('s')) newHeight += deltaY;
    if (dir.includes('n')) { newHeight -= deltaY; newY += deltaY; }

    updateBlock(block.id, {
      x: newX,
      y: newY,
      width: Math.max(20, newWidth),
      height: Math.max(20, newHeight)
    });
  };

  return (
    <motion.div
      drag={!isEditing}
      dragMomentum={false}
      onDragEnd={(e, info) => {
        updateBlock(block.id, { x: block.x + info.offset.x, y: block.y + info.offset.y });
      }}
      onTap={() => setSelectedBlockId(block.id)}
      onDoubleClick={() => block.type === 'text' && setIsEditing(true)}
      viewport={{ once: true }}
      {...(entryAnim as any)}
      style={blockStyles}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        animate={getContinuousAnimation()}
        className="w-full h-full flex items-center justify-center p-[inherit]"
        style={{
          borderRadius: block.styles?.borderRadius || 0,
        }}
      >
        {isSelected && !isEditing && (
          <>
            {/* Corner handles */}
            {['nw', 'ne', 'sw', 'se'].map(dir => (
              <div
                key={dir}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  const startX = e.clientX;
                  const startY = e.clientY;
                  const onMouseMove = (moveEvent: MouseEvent) => {
                    handleResize(dir, moveEvent.clientX - startX, moveEvent.clientY - startY);
                  };
                  const onMouseUp = () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                  };
                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp);
                }}
                className={`absolute w-3 h-3 bg-white border-2 border-rose-500 rounded-full z-[100] cursor-${dir}-resize`}
                style={{
                  top: dir.includes('n') ? -6 : 'auto',
                  bottom: dir.includes('s') ? -6 : 'auto',
                  left: dir.includes('w') ? -6 : 'auto',
                  right: dir.includes('e') ? -6 : 'auto',
                }}
              />
            ))}
          </>
        )}

        {block.type === 'text' && isEditing ? (
          <div
            ref={textRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              setIsEditing(false);
              updateBlock(block.id, { content: { ...block.content, text: e.currentTarget.innerText } });
            }}
            style={{
              width: '100%',
              height: '100%',
              outline: 'none',
              color: block.styles?.color || '#000000',
              fontSize: block.styles?.fontSize || 16,
              textAlign: (block.styles?.textAlign as any) || 'center',
              fontFamily: block.styles?.fontFamily || 'inherit',
              fontWeight: block.styles?.fontWeight || 'normal',
              whiteSpace: 'pre-wrap',
              textShadow: block.styles?.textShadow || 'none',
            }}
          >
            {block.content.text}
          </div>
        ) : (
          <RenderBlock block={block} />
        )}
      </motion.div>
    </motion.div>
  );
}

function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case 'text': return <TextBlock block={block} />;
    case 'image': return <ImageBlock block={block} />;
    case 'calendar': return <CalendarBlock block={block} />;
    case 'countdown': return <CountdownBlock block={block} />;
    case 'map': return <MapBlock block={block} />;
    case 'gift': return <GiftBlock block={block} />;
    case 'gallery': return <GalleryBlock block={block} />;
    default: return null;
  }
}

function TextBlock({ block }: { block: Block }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: block.styles?.color || '#000000',
      fontSize: block.styles?.fontSize || 16,
      textAlign: (block.styles?.textAlign as any) || 'center',
      fontFamily: block.styles?.fontFamily || 'inherit',
      fontWeight: block.styles?.fontWeight || 'normal',
      fontStyle: block.styles?.fontStyle || 'normal',
      textDecoration: block.styles?.textDecoration || 'none',
      letterSpacing: `${block.styles?.letterSpacing || 0}px`,
      lineHeight: block.styles?.lineHeight || 1.2,
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-word',
      textShadow: block.styles?.textShadow || 'none',
    }}>
      {block.content.text}
    </div>
  );
}

function ImageBlock({ block }: { block: Block }) {
  return <img
    src={block.content.url || 'https://placehold.co/400x400?text=Image'}
    className="w-full h-full"
    style={{
      borderRadius: block.styles?.borderRadius,
      objectFit: block.content.objectFit || 'cover'
    }}
    alt={block.content.alt || ''}
  />;
}

function CalendarBlock({ block }: { block: Block }) {
  const date = new Date(block.content.date || '2026-05-28');
  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const highlightColor = block.content.colors?.highlight || '#e11d48';

  return (
    <div className="bg-white p-3 border rounded shadow-sm text-center w-full h-full flex flex-col justify-center gap-1.5 overflow-hidden">
      <div className="font-bold text-[10px] uppercase tracking-widest pb-1 border-b" style={{ color: highlightColor }}>
        {monthNames[date.getMonth()]} / {date.getFullYear()}
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-[7px] font-bold text-gray-400">
        {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: firstDay }).map((_, i) => <span key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const isTarget = day === date.getDate();
          return (
            <span key={day} className={`text-[8px] p-0.5 flex items-center justify-center rounded-full transition-colors ${isTarget ? 'text-white font-bold' : 'text-gray-600'}`} style={{ backgroundColor: isTarget ? highlightColor : 'transparent' }}>
              {day}
            </span>
          );
        })}
      </div>
      {block.content.showLunar && <div className="text-[6px] text-gray-400 italic mt-0.5">Xem ngày tốt</div>}
    </div>
  );
}

function CountdownBlock({ block }: { block: Block }) {
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(block.content.targetDate || '2026-05-28T18:00:00').getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ d: '00', h: '00', m: '00', s: '00' });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        d: String(d).padStart(2, '0'),
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0')
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [block.content.targetDate]);

  const labels = block.content.labels || { d: 'Ngày', h: 'Giờ', m: 'Phút', s: 'Giây' };

  return (
    <div className="bg-rose-500 p-3 text-white text-center rounded-xl w-full h-full flex flex-col justify-center shadow-lg overflow-hidden">
      <div className="text-[9px] opacity-80 mb-1 font-bold">W E D D I N G</div>
      <div className="flex justify-center gap-1.5">
        {Object.entries(timeLeft).map(([k, v]) => (
          <div key={k} className="flex flex-col items-center">
            <span className="text-sm font-black leading-none">{v}</span>
            <span className="text-[6px] uppercase tracking-tighter opacity-70 mt-0.5">{labels[k as keyof typeof labels]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MapBlock({ block }: { block: Block }) {
  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden relative w-full h-full shadow-md flex flex-col">
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-2 text-center text-[10px] text-gray-400 italic">
        🌍 {block.content.address || 'Hà Nội, Việt Nam'}
      </div>
      <div className="p-2 border-t bg-white flex flex-col gap-1 items-center justify-center">
        <div className="text-[10px] font-black text-rose-500 truncate w-full text-center">📍 {block.content.placeName || 'Địa điểm tổ chức'}</div>
        <a
          href={block.content.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-rose-500 text-white text-[8px] px-3 py-1 rounded-full font-bold shadow-sm inline-block"
          onClick={(e) => e.stopPropagation()}
        >
          {block.content.buttonText || 'Xem bản đồ'}
        </a>
      </div>
    </div>
  );
}

function GiftBlock({ block }: { block: Block }) {
  return (
    <div className="bg-amber-50 p-3 border-2 border-amber-200 rounded-3xl text-center w-full h-full flex flex-col justify-center items-center gap-1 shadow-sm overflow-hidden">
      {block.content.qrUrl ? (
        <img src={block.content.qrUrl} className="w-12 h-12 object-contain rounded-lg shadow-sm border border-white" />
      ) : (
        <span className="text-xl">🎁</span>
      )}
      <div className="text-[10px] font-black text-amber-800 uppercase tracking-tight">{block.content.title || 'Gửi quà tặng'}</div>
      <div className="text-[8px] text-amber-900 border-t border-amber-200 pt-1 w-full font-bold">
        {block.content.bankName} - {block.content.accountNumber}
      </div>
      <div className="text-[7px] text-amber-600 uppercase italic opacity-80">{block.content.accountHolder}</div>
    </div>
  );
}

function GalleryBlock({ block }: { block: Block }) {
  const images = block.content.images || [];
  const columns = block.content.columns || 3;
  const gap = block.content.gap || 4;

  return (
    <div
      className="w-full h-full overflow-hidden p-2 bg-gray-50"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: `${gap}px`,
        alignContent: 'start'
      }}
    >
      {images.map((img: string, i: number) => (
        <img key={i} src={img} className="w-full aspect-square object-cover rounded-md shadow-sm" />
      ))}
      {images.length === 0 && (
        <div className="col-span-full h-full flex items-center justify-center text-[10px] text-gray-300">Chưa có ảnh</div>
      )}
    </div>
  );
}
