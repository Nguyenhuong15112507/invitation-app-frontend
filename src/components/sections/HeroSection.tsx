import { HeroData } from '@/lib/sections';

export default function HeroSection({ data }: { data: HeroData }) {
  return (
    <div className="relative w-full">
      <div
        className="w-full h-80 bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${data.coverImage || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40" />
      </div>
      {data.title && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-white text-sm tracking-widest uppercase drop-shadow">{data.title}</p>
        </div>
      )}
    </div>
  );
}
