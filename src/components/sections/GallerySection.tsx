import { GalleryData } from '@/lib/sections';

export default function GallerySection({ data }: { data: GalleryData }) {
  const images = data.images?.filter(Boolean) ?? [];
  if (!images.length) return null;
  const cols = data.columns === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className="py-6 px-3 bg-[#FDFBF7]">
      <p className="text-center text-xs tracking-widest text-gray-400 uppercase mb-3">Hình ảnh</p>
      <div className={`grid ${cols} gap-1`}>
        {images.map((url, i) => (
          <div key={i} className="aspect-square overflow-hidden rounded-lg">
            <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
