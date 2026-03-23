'use client';

import { Section, HeroData, CoupleData, EventData, CountdownData, MessageData, GalleryData, BankData, MapData, FooterData, StoryData, GlobalConfig, DEFAULT_GLOBAL_CONFIG } from '@/lib/sections';
import CountdownTimer from '@/components/CountdownTimer';
import BackgroundMusic from '@/components/builder/BackgroundMusic';
import { useState, useEffect } from 'react';

// --- Local Section Renderers for Song Long Theme ---

function SLHeroSection({ data }: { data: HeroData }) {
  return (
    <div className="relative w-full h-[600px] bg-[#8B0000] border-b-[8px] border-[#D4AF37] overflow-hidden flex flex-col justify-center items-center text-[#FDF5E6] font-serif">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ backgroundImage: `url(${data.coverImage || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/90 to-transparent" />
      
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <div className="mb-6 w-16 h-16 border-2 border-[#D4AF37] rounded-full flex items-center justify-center">
          <span className="text-3xl text-[#D4AF37]">囍</span>
        </div>
        <p className="text-sm tracking-[0.3em] uppercase text-[#E5C158] mb-4">Lễ Thành Hôn</p>
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg text-white font-serif">{data.title || 'Hoàng Nam & Thanh Tú'}</h1>
        <p className="text-md text-[#FDF5E6] mt-4 max-w-xs leading-relaxed italic border-t border-[#D4AF37]/50 pt-4">Trân trọng kính mời quý khách đến dự buổi tiệc chung vui cùng gia đình chúng tôi</p>
      </div>
    </div>
  );
}

function SLCoupleSection({ data }: { data: CoupleData }) {
  return (
    <div className="py-16 bg-[#FFF8EE] text-[#8B0000] font-serif text-center px-6 relative border-b border-[#D4AF37]/30">
      <div className="absolute top-0 left-0 w-full h-4 bg-repeat-x opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 2px, transparent 2.5px)', backgroundSize: '10px 10px' }}></div>
      <h2 className="text-2xl font-bold tracking-widest uppercase mb-10 text-[#5A0000] drop-shadow-sm">Tân Lang Tân Nương</h2>
      
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-t-full rounded-b-md overflow-hidden border-4 border-[#D4AF37] shadow-xl mb-4">
            <img src={data.groomPhoto || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300'} alt="Groom" className="w-full h-full object-cover" />
          </div>
          <p className="text-sm text-[#D4AF37] font-bold uppercase tracking-widest mb-1">Trưởng Nam</p>
          <h3 className="text-3xl font-bold font-serif">{data.groomName || 'Tên Chú Rể'}</h3>
        </div>
        
        <div className="flex justify-center items-center">
           <span className="text-[#D4AF37] text-4xl">❤️</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-t-full rounded-b-md overflow-hidden border-4 border-[#D4AF37] shadow-xl mb-4">
            <img src={data.bridePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300'} alt="Bride" className="w-full h-full object-cover" />
          </div>
          <p className="text-sm text-[#D4AF37] font-bold uppercase tracking-widest mb-1">Út Nữ</p>
          <h3 className="text-3xl font-bold font-serif">{data.brideName || 'Tên Cô Dâu'}</h3>
        </div>
      </div>
    </div>
  );
}

function SLEventSection({ data }: { data: EventData }) {
  if (!data.events?.length) return null;
  return (
    <div className="py-16 bg-[#8B0000] text-[#FDF5E6] font-serif px-6 shadow-inner relative">
       <h2 className="text-2xl font-bold tracking-widest text-[#E5C158] text-center uppercase mb-10">Chương Trình Đoán Khách</h2>
       <div className="space-y-6">
         {data.events.map(ev => (
           <div key={ev.id} className="bg-[#5A0000] p-6 rounded-xl border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
                <span className="text-6xl text-[#D4AF37]">囍</span>
             </div>
             <h3 className="text-xl font-bold text-[#E5C158] mb-2">{ev.name}</h3>
             <div className="w-12 h-[2px] bg-[#D4AF37] mb-4"></div>
             <p className="text-lg mb-1 tracking-wide" suppressHydrationWarning>{ev.date && new Date(ev.date).toLocaleDateString('vi-VN', { weekday:'long', day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
             <p className="text-[#E5C158] mb-3 font-semibold">{ev.time}</p>
             <p className="text-sm opacity-90 leading-relaxed italic max-w-xs">{ev.location}</p>
           </div>
         ))}
       </div>
    </div>
  );
}

function SLCountdownSection({ data }: { data: CountdownData }) {
  return (
    <div className="py-12 bg-[#FFF8EE] border-b border-[#D4AF37]/30 text-center px-4 font-serif">
      <h2 className="text-xl text-[#8B0000] font-bold uppercase tracking-widest mb-6">{data.label}</h2>
      <div className="scale-90 origin-center">
         <CountdownTimer date={data.targetDate} time={data.targetTime} />
      </div>
    </div>
  );
}

function SLMessageSection({ data }: { data: MessageData }) {
  return (
    <div className="py-16 bg-[#FFF8EE] text-[#5A0000] text-center px-8 font-serif">
      <div className="mb-6 mx-auto w-10 text-[#D4AF37]">
        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/></svg>
      </div>
      <p className="text-md leading-relaxed italic whitespace-pre-line tracking-wide drop-shadow-sm">{data.text}</p>
    </div>
  );
}

function SLGallerySection({ data }: { data: GalleryData }) {
  return (
    <div className="py-12 bg-[#8B0000] px-4 font-serif">
      <h2 className="text-xl font-bold tracking-widest text-[#E5C158] text-center uppercase mb-8">Album Cưới</h2>
      <div className={`grid grid-cols-${data.columns === 3 ? '3' : '2'} gap-2`}>
        {data.images.filter(Boolean).map((img, i) => (
          <div key={i} className="aspect-square bg-gray-200 border-2 border-[#D4AF37] rounded-sm overflow-hidden shadow-lg">
            <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SLBankSection({ data }: { data: BankData }) {
  if (!data.accounts?.length) return null;
  return (
    <div className="py-16 bg-[#FFF8EE] text-[#8B0000] px-6 text-center font-serif border-t-8 border-[#D4AF37]">
      <h2 className="text-2xl font-bold tracking-widest uppercase mb-8">Quà Mừng Cưới</h2>
      <div className="flex justify-center mb-6">
        <span className="text-[#D4AF37] text-4xl">🧧</span>
      </div>
      <div className="space-y-6">
        {data.accounts.map(acc => (
           <div key={acc.id} className="bg-white p-6 rounded-2xl border-2 border-[#D4AF37]/50 shadow-2xl relative">
             <img
                src={`https://img.vietqr.io/image/${acc.bankName}-${acc.accountNumber}-qr_only.png?amount=0&addInfo=MungCuoi`}
                width={180} height={180} alt="QR Bank"
                className="mx-auto rounded-lg mb-4"
              />
              <p className="font-bold text-lg mb-1">{acc.bankName}</p>
              <p className="text-[#D4AF37] font-semibold tracking-wider text-xl mb-1">{acc.accountNumber}</p>
              <p className="text-sm uppercase tracking-wide">{acc.accountName}</p>
           </div>
        ))}
      </div>
    </div>
  );
}

function SLFooterSection({ data }: { data: FooterData }) {
  return (
    <div className="py-16 bg-[#8B0000] text-[#E5C158] text-center px-8 font-serif pb-32">
       <span className="text-5xl opacity-80 mb-6 block">囍</span>
       <p className="text-xl font-bold tracking-wider mb-2">{data.text}</p>
       <p className="text-xs tracking-[0.2em] uppercase mt-12 opacity-50">Thanks for coming</p>
    </div>
  );
}

// Map the specific sections or fallback to default
function renderSLSection(section: Section) {
  const d = section.data as any;
  switch (section.type) {
    case 'hero':      return <SLHeroSection      key={section.id} data={d} />;
    case 'couple':    return <SLCoupleSection    key={section.id} data={d} />;
    case 'event':     return <SLEventSection     key={section.id} data={d} />;
    case 'countdown': return <SLCountdownSection key={section.id} data={d} />;
    case 'message':   return <SLMessageSection   key={section.id} data={d} />;
    case 'gallery':   return <SLGallerySection   key={section.id} data={d} />;
    case 'bank':      return <SLBankSection      key={section.id} data={d} />;
    case 'footer':    return <SLFooterSection    key={section.id} data={d} />;
    
    // Fallbacks for maps, story if available
    default: return <div key={section.id} className="py-10 text-center italic text-[#D4AF37] bg-[#8B0000]">({section.type} chưa hỗ trợ trong theme Song Long)</div>;
  }
}

export default function SongLongRenderer({ sections, globalConfig = DEFAULT_GLOBAL_CONFIG }: { sections: Section[], globalConfig?: GlobalConfig }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const visible = sections.filter((s) => s.visible);
  if (!visible.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-[#FFF8EE]">
        <p className="text-[#8B0000] text-sm font-serif">Chưa có thông tin hiển thị</p>
      </div>
    );
  }

  return (
    <div className={`bg-[#FFF8EE] min-h-full ${globalConfig.fontFamily || 'font-serif'} overflow-hidden relative`} style={{ backgroundColor: globalConfig.bgColor || '#FFF8EE' }}>
      {isMounted && globalConfig.musicUrl && <BackgroundMusic url={globalConfig.musicUrl} />}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-50 mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/rice-paper-2.png')" }}></div>
      {visible.map(renderSLSection)}
    </div>
  );
}
