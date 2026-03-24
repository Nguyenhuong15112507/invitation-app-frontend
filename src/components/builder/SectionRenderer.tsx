'use client';

import { Section, SectionData, GlobalConfig, DEFAULT_GLOBAL_CONFIG } from '@/lib/sections';
import BackgroundMusic from './BackgroundMusic';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

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

import { motion, AnimatePresence } from 'framer-motion';

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

export default function SectionRenderer({ sections, globalConfig = DEFAULT_GLOBAL_CONFIG }: { sections: Section[], globalConfig?: GlobalConfig }) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const visible = sections.filter((s) => s.visible);
  if (!visible.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-[#FDFBF7]">
        <p className="text-gray-300 text-sm">Chưa có section nào được hiển thị</p>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-full relative ${globalConfig.fontFamily || DEFAULT_GLOBAL_CONFIG.fontFamily} flex flex-col`}
      style={{ backgroundColor: globalConfig.bgColor || DEFAULT_GLOBAL_CONFIG.bgColor, color: globalConfig.textColor || DEFAULT_GLOBAL_CONFIG.textColor }}
    >
      {isMounted && globalConfig.musicUrl && <BackgroundMusic url={globalConfig.musicUrl} />}
      <AnimatePresence mode="popLayout">
        {visible.map((section) => (
          <motion.div
            key={section.id}
            layout="position"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {renderSection(section)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
