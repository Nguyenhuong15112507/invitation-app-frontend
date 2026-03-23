'use client';

import { Section, HeroData, CoupleData, EventData, CountdownData, MessageData, GalleryData, BankData, FooterData, GlobalConfig, DEFAULT_GLOBAL_CONFIG } from '@/lib/sections';
import CountdownTimer from '@/components/CountdownTimer';
import BackgroundMusic from '@/components/builder/BackgroundMusic';
import { useState, useEffect } from 'react';

function FloralLine() {
  return (
    <div className="flex items-center justify-center gap-2 my-3">
      <span className="text-pink-300 text-base">✿</span>
      <div className="h-[0.5px] w-10 bg-pink-200" />
      <span className="text-pink-200 text-sm">❀</span>
      <div className="h-[0.5px] w-10 bg-pink-200" />
      <span className="text-pink-300 text-base">✿</span>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="text-center mb-8">
      <FloralLine />
      <h2 className="text-[11px] uppercase tracking-[0.35em] text-[#b05070] font-semibold font-sans">{children}</h2>
      <FloralLine />
    </div>
  );
}

function CLHeroSection({ data }: { data: HeroData }) {
  return (
    <div className="relative w-full bg-white overflow-hidden">
      <div className="relative w-full h-[65vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${data.coverImage || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070'})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white" />
      </div>
      <div className="relative z-10 -mt-16 pb-10 text-center px-6">
        <p className="text-3xl text-[#c0507a] leading-none mb-3" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>We got married</p>
        <h1 className="text-3xl font-light tracking-wide text-[#5a1e2e] font-serif mb-1">{data.title || 'Nam & Tú'}</h1>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="h-[0.5px] w-10 bg-pink-300" />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#e8a0b0"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" /></svg>
          <div className="h-[0.5px] w-10 bg-pink-300" />
        </div>
      </div>
    </div>
  );
}

function CLCoupleSection({ data }: { data: CoupleData }) {
  return (
    <div className="py-16 bg-[#fff5f7] text-center px-6">
      <SectionLabel>Cô Dâu & Chú Rể</SectionLabel>
      <div className="flex justify-center items-center gap-6">
        <div className="flex flex-col items-center flex-1">
          <div className="w-28 h-36 rounded-[50%_50%_45%_45%] overflow-hidden border-2 border-pink-200 shadow-lg mb-3">
            <img src={data.groomPhoto || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300'} alt="Groom" className="w-full h-full object-cover object-top" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#b05070] font-sans">Chú rể</p>
          <h3 className="text-lg font-semibold text-[#5a1e2e] font-serif mt-1">{data.groomName || 'Chú Rể'}</h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-white shadow border border-pink-100 flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8a0b0"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" /></svg>
        </div>
        <div className="flex flex-col items-center flex-1">
          <div className="w-28 h-36 rounded-[50%_50%_45%_45%] overflow-hidden border-2 border-pink-200 shadow-lg mb-3">
            <img src={data.bridePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300'} alt="Bride" className="w-full h-full object-cover object-top" />
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#b05070] font-sans">Cô dâu</p>
          <h3 className="text-lg font-semibold text-[#5a1e2e] font-serif mt-1">{data.brideName || 'Cô Dâu'}</h3>
        </div>
      </div>
    </div>
  );
}

function CLEventSection({ data }: { data: EventData }) {
  if (!data.events?.length) return null;
  return (
    <div className="py-16 bg-white px-8">
      <SectionLabel>Thông Tin Lễ Cưới</SectionLabel>
      <div className="space-y-8">
        {data.events.map((ev, idx) => (
          <div key={ev.id} className="relative border border-pink-100 rounded-2xl p-6 bg-[#fff5f7] text-center">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#e8a0b0] flex items-center justify-center text-white text-xs font-bold">{idx + 1}</div>
            <h3 className="font-semibold text-[#5a1e2e] font-serif mt-2 mb-3">{ev.name}</h3>
            <p className="text-sm text-[#b05070]" suppressHydrationWarning>{ev.date && new Date(ev.date).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
            {ev.time && <p className="text-sm text-gray-500 mt-1">{ev.time}</p>}
            {ev.location && <p className="text-sm text-gray-600 italic mt-2 leading-relaxed">{ev.location}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function CLCountdownSection({ data }: { data: CountdownData }) {
  return (
    <div className="py-14 bg-[#fff5f7] text-center px-8">
      <SectionLabel>{data.label || 'Đếm Ngược Ngày Cưới'}</SectionLabel>
      <CountdownTimer date={data.targetDate} time={data.targetTime} />
    </div>
  );
}

function CLMessageSection({ data }: { data: MessageData }) {
  return (
    <div className="py-16 bg-white text-center px-10">
      <SectionLabel>Lời Mời</SectionLabel>
      <div className="relative max-w-xs mx-auto">
        <span className="absolute -top-2 -left-1 text-5xl text-pink-200 font-serif leading-none select-none">"</span>
        <p className="text-sm text-gray-600 italic leading-loose whitespace-pre-line px-4">{data.text}</p>
        <span className="absolute -bottom-4 -right-1 text-5xl text-pink-200 font-serif leading-none select-none">"</span>
      </div>
    </div>
  );
}

function CLGallerySection({ data }: { data: GalleryData }) {
  const imgs = data.images.filter(Boolean);
  if (!imgs.length) return null;
  return (
    <div className="py-14 bg-[#fff5f7] px-4">
      <SectionLabel>Album Cưới</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        {imgs.map((img, i) => (
          <div key={i} className={`overflow-hidden rounded-xl shadow-sm ${i === 0 && imgs.length > 1 ? 'col-span-2 h-52' : 'h-36'}`}>
            <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition duration-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CLBankSection({ data }: { data: BankData }) {
  if (!data.accounts?.length) return null;
  return (
    <div className="py-16 bg-white px-8 text-center">
      <SectionLabel>Gửi Quà Mừng</SectionLabel>
      <div className="space-y-8">
        {data.accounts.map(acc => (
          <div key={acc.id} className="border border-pink-100 rounded-2xl p-6 bg-[#fff5f7]">
            <img src={`https://img.vietqr.io/image/${acc.bankName}-${acc.accountNumber}-qr_only.png?amount=0&addInfo=QuaMungCuoi`} width={155} height={155} alt="QR" className="mx-auto rounded-lg mb-4 border border-pink-100" />
            <p className="text-xs uppercase tracking-widest text-[#b05070] font-semibold">{acc.bankName}</p>
            <p className="text-lg font-light text-[#5a1e2e] font-serif mt-1">{acc.accountNumber}</p>
            <p className="text-sm text-gray-500 mt-1">{acc.accountName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CLFooterSection({ data }: { data: FooterData }) {
  return (
    <div className="py-20 bg-[#fff5f7] text-center px-10 pb-32">
      <FloralLine />
      <p className="text-2xl text-[#c0507a] my-5" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>Thank you</p>
      <p className="text-sm text-gray-600 italic leading-relaxed max-w-xs mx-auto">{data.text}</p>
      <FloralLine />
    </div>
  );
}

function renderCLSection(section: Section) {
  const d = section.data as any;
  switch (section.type) {
    case 'hero':      return <CLHeroSection      key={section.id} data={d} />;
    case 'couple':    return <CLCoupleSection    key={section.id} data={d} />;
    case 'event':     return <CLEventSection     key={section.id} data={d} />;
    case 'countdown': return <CLCountdownSection key={section.id} data={d} />;
    case 'message':   return <CLMessageSection   key={section.id} data={d} />;
    case 'gallery':   return <CLGallerySection   key={section.id} data={d} />;
    case 'bank':      return <CLBankSection      key={section.id} data={d} />;
    case 'footer':    return <CLFooterSection    key={section.id} data={d} />;
    default:          return null;
  }
}

export default function CineloveRenderer({ sections, globalConfig = DEFAULT_GLOBAL_CONFIG }: { sections: Section[], globalConfig?: GlobalConfig }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const visible = sections.filter(s => s.visible);
  return (
    <div className="bg-white min-h-full overflow-hidden" style={{ fontFamily: "Georgia, 'Playfair Display', serif" }}>
      {isMounted && globalConfig.musicUrl && <BackgroundMusic url={globalConfig.musicUrl} />}
      {visible.map(renderCLSection)}
    </div>
  );
}
