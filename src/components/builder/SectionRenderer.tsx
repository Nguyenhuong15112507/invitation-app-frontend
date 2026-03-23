'use client';

import { Section, SectionData } from '@/lib/sections';
import dynamic from 'next/dynamic';

const HeroSection        = dynamic(() => import('@/components/sections/HeroSection'));
const CoupleSection      = dynamic(() => import('@/components/sections/CoupleSection'));
const EventSection       = dynamic(() => import('@/components/sections/EventSection'));
const CountdownSection   = dynamic(() => import('@/components/sections/CountdownSection'));
const MessageSection     = dynamic(() => import('@/components/sections/MessageSection'));
const GallerySection     = dynamic(() => import('@/components/sections/GallerySection'));
const StorySection       = dynamic(() => import('@/components/sections/StorySection'));
const BankSection        = dynamic(() => import('@/components/sections/BankSection'));
const MapSection         = dynamic(() => import('@/components/sections/MapSection'));
const FooterSection      = dynamic(() => import('@/components/sections/FooterSection'));

function renderSection(section: Section) {
  const d = section.data as any;
  switch (section.type) {
    case 'hero':      return <HeroSection      key={section.id} data={d} />;
    case 'couple':    return <CoupleSection    key={section.id} data={d} />;
    case 'event':     return <EventSection     key={section.id} data={d} />;
    case 'countdown': return <CountdownSection key={section.id} data={d} />;
    case 'message':   return <MessageSection   key={section.id} data={d} />;
    case 'gallery':   return <GallerySection   key={section.id} data={d} />;
    case 'story':     return <StorySection     key={section.id} data={d} />;
    case 'bank':      return <BankSection      key={section.id} data={d} />;
    case 'map':       return <MapSection       key={section.id} data={d} />;
    case 'footer':    return <FooterSection    key={section.id} data={d} />;
    default:          return null;
  }
}

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  const visible = sections.filter((s) => s.visible);
  if (!visible.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-[#FDFBF7]">
        <p className="text-gray-300 text-sm">Chưa có section nào được hiển thị</p>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-full">
      {visible.map(renderSection)}
    </div>
  );
}
