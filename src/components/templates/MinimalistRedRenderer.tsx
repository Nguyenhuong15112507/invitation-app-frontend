'use client';

import { Section, HeroData, CoupleData, EventData, CountdownData, MessageData, GalleryData, BankData, FooterData, GlobalConfig, DEFAULT_GLOBAL_CONFIG } from '@/lib/sections';
import CountdownTimer from '@/components/CountdownTimer';
import BackgroundMusic from '@/components/builder/BackgroundMusic';
import { useState, useEffect } from 'react';

// --- Local Section Renderers for Minimalist Red Theme ---

function MRHeroSection({ data }: { data: HeroData }) {
  return (
    <div className="relative w-full h-[700px] bg-white overflow-hidden flex flex-col justify-end pb-20 items-center text-gray-800">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.coverImage || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
      
      <div className="relative z-10 text-center px-6">
        <div className="w-12 h-[1px] bg-[#B82B2B] mx-auto mb-6" />
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#B82B2B] mb-4 font-sans font-bold">The Wedding of</p>
        <h1 className="text-4xl font-light mb-2 text-gray-900 font-serif lowercase tracking-tight">
          {data.title || 'nam & tú'}
        </h1>
        <div className="w-12 h-[1px] bg-[#B82B2B] mx-auto mt-6" />
      </div>
    </div>
  );
}

function MRCoupleSection({ data }: { data: CoupleData }) {
  return (
    <div className="py-24 bg-white text-gray-800 font-serif text-center px-8">
      <div className="max-w-xs mx-auto space-y-16">
        <div className="group">
          <div className="relative mx-auto w-48 h-64 border-[0.5px] border-[#B82B2B]/20 p-2 transform transition-transform duration-700 hover:scale-105">
            <img src={data.groomPhoto || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400'} alt="Groom" className="w-full h-full object-cover rounded-sm grayscale-[30%] group-hover:grayscale-0 transition-all" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-[1px] border-[#B82B2B] opacity-20" />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-light tracking-wide text-gray-900 mb-1">{data.groomName || 'Nam'}</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#B82B2B] opacity-70">Groom</p>
          </div>
        </div>

        <div className="text-[#B82B2B] text-2xl font-light opacity-40">&</div>

        <div className="group">
          <div className="relative mx-auto w-48 h-64 border-[0.5px] border-[#B82B2B]/20 p-2 transform transition-transform duration-700 hover:scale-105">
            <img src={data.bridePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'} alt="Bride" className="w-full h-full object-cover rounded-sm grayscale-[30%] group-hover:grayscale-0 transition-all" />
            <div className="absolute -top-4 -left-4 w-20 h-20 border-[1px] border-[#B82B2B] opacity-20" />
          </div>
          <div className="mt-8">
            <h3 className="text-2xl font-light tracking-wide text-gray-900 mb-1">{data.brideName || 'Tú'}</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#B82B2B] opacity-70">Bride</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MREventSection({ data }: { data: EventData }) {
  if (!data.events?.length) return null;
  return (
    <div className="py-24 bg-gray-50 text-gray-800 font-serif px-10 border-y border-gray-100">
       <div className="text-center mb-16">
         <p className="text-[10px] tracking-[0.4em] uppercase text-[#B82B2B] mb-2 font-sans font-bold">Save the Date</p>
         <h2 className="text-3xl font-light text-gray-900 lowercase tracking-tighter">chương trình lễ cưới</h2>
       </div>
       <div className="space-y-12">
         {data.events.map((ev, idx) => (
           <div key={ev.id} className="relative pl-8 border-l-[0.5px] border-[#B82B2B]/30">
             <div className="absolute -left-[3px] top-0 w-[6px] h-[6px] bg-[#B82B2B] rounded-full" />
             <h3 className="text-sm uppercase tracking-[0.2em] text-[#B82B2B] font-sans font-bold mb-4">{ev.name}</h3>
             <div className="space-y-1">
               <p className="text-lg font-light text-gray-900" suppressHydrationWarning>
                 {ev.date && new Date(ev.date).toLocaleDateString('vi-VN', { weekday:'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
               </p>
               <p className="text-md text-gray-500 font-light">{ev.time}</p>
               <p className="text-sm text-gray-600 font-sans mt-3 leading-relaxed whitespace-pre-line underline decoration-[#B82B2B]/20 underline-offset-4">{ev.location}</p>
             </div>
           </div>
         ))}
       </div>
    </div>
  );
}

function MRCountdownSection({ data }: { data: CountdownData }) {
  return (
    <div className="py-20 bg-white text-center px-10 font-serif">
      <h2 className="text-[11px] text-[#B82B2B] uppercase tracking-[0.3em] font-sans font-bold mb-8 italic">{data.label}</h2>
      <div className="flex justify-center transform scale-90">
         <CountdownTimer date={data.targetDate} time={data.targetTime} />
      </div>
    </div>
  );
}

function MRMessageSection({ data }: { data: MessageData }) {
  return (
    <div className="py-24 bg-white text-gray-700 text-center px-12 font-serif border-y border-gray-50">
      <div className="max-w-xs mx-auto">
        <span className="text-3xl text-[#B82B2B] opacity-10 block mb-6 font-sans">"</span>
        <p className="text-lg font-light italic leading-loose whitespace-pre-line tracking-tight lowercase">
          {data.text}
        </p>
        <span className="text-3xl text-[#B82B2B] opacity-10 block mt-6 transform rotate-180 font-sans">"</span>
      </div>
    </div>
  );
}

function MRGallerySection({ data }: { data: GalleryData }) {
  return (
    <div className="py-16 bg-white px-10 font-serif">
      <div className="text-center mb-12">
        <h2 className="text-xl font-light tracking-[0.3em] text-[#B82B2B] lowercase">gallery</h2>
      </div>
      <div className={`grid grid-cols-${data.columns === 3 ? '3' : '2'} gap-3`}>
        {data.images.filter(Boolean).map((img, i) => (
          <div key={i} className={`overflow-hidden bg-gray-50 border-[0.5px] border-gray-100 shadow-sm ${i % 3 === 0 ? 'aspect-[3/4] col-span-2' : 'aspect-square'}`}>
            <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition duration-700 grayscale-[20%] hover:grayscale-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MRBankSection({ data }: { data: BankData }) {
  if (!data.accounts?.length) return null;
  return (
    <div className="py-24 bg-gray-50 text-gray-900 px-10 text-center font-serif">
      <div className="mb-16">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#B82B2B] mb-2 font-sans font-bold">Gift Box</p>
        <h2 className="text-2xl font-light lowercase tracking-tighter">hộp mừng cưới</h2>
      </div>
      <div className="space-y-12">
        {data.accounts.map(acc => (
          <div key={acc.id} className="relative bg-white p-10 border-[0.5px] border-[#B82B2B]/10 shadow-sm">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[1px] bg-[#B82B2B]" />
            <img
              src={`https://img.vietqr.io/image/${acc.bankName}-${acc.accountNumber}-qr_only.png?amount=0&addInfo=MungCuoi`}
              width={160} height={160} alt="QR Bank"
              className="mx-auto rounded-sm mb-6 grayscale-[10%] opacity-90"
            />
            <p className="text-xs uppercase tracking-widest text-[#B82B2B] font-sans font-bold mb-2">{acc.bankName}</p>
            <p className="text-xl font-light text-gray-900 mb-1">{acc.accountNumber}</p>
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-sans">{acc.accountName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MRFooterSection({ data }: { data: FooterData }) {
  return (
    <div className="py-32 bg-white text-gray-900 text-center px-10 font-serif">
       <div className="w-[1px] h-12 bg-[#B82B2B]/30 mx-auto mb-8" />
       <p className="text-xl font-light italic mb-2 lowercase">{data.text}</p>
       <p className="text-[10px] tracking-[0.3em] uppercase mt-12 text-[#B82B2B] font-sans font-bold opacity-30">Our Special day</p>
    </div>
  );
}

function renderMRSection(section: Section) {
  const d = section.data as any;
  switch (section.type) {
    case 'hero':      return <MRHeroSection      key={section.id} data={d} />;
    case 'couple':    return <MRCoupleSection    key={section.id} data={d} />;
    case 'event':     return <MREventSection     key={section.id} data={d} />;
    case 'countdown': return <MRCountdownSection key={section.id} data={d} />;
    case 'message':   return <MRMessageSection   key={section.id} data={d} />;
    case 'gallery':   return <MRGallerySection   key={section.id} data={d} />;
    case 'bank':      return <MRBankSection      key={section.id} data={d} />;
    case 'footer':    return <MRFooterSection    key={section.id} data={d} />;
    default: return null;
  }
}

export default function MinimalistRedRenderer({ sections, globalConfig = DEFAULT_GLOBAL_CONFIG }: { sections: Section[], globalConfig?: GlobalConfig }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const visible = sections.filter((s) => s.visible);

  return (
    <div className={`bg-white min-h-full ${globalConfig.fontFamily || 'font-serif'} overflow-hidden relative`} style={{ color: globalConfig.textColor || '#333' }}>
      {isMounted && globalConfig.musicUrl && <BackgroundMusic url={globalConfig.musicUrl} />}
      {visible.map(renderMRSection)}
    </div>
  );
}
