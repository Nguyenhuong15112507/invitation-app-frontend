import { MapData } from '@/lib/sections';

export default function MapSection({ data }: { data: MapData }) {
  if (!data.address && !data.mapEmbedUrl) return null;

  return (
    <div className="py-8 px-4 bg-white">
      <p className="text-center text-xs tracking-widest text-rose-400 uppercase mb-4">Địa điểm</p>
      {data.address && (
        <div className="text-center mb-4">
          <p className="text-gray-700 text-sm">📍 {data.address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.address)}`}
            target="_blank" rel="noreferrer"
            className="text-xs text-blue-500 underline mt-1 inline-block"
          >
            Xem trên Google Maps →
          </a>
        </div>
      )}
      {data.mapEmbedUrl && (
        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-48">
          <iframe src={data.mapEmbedUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen />
        </div>
      )}
    </div>
  );
}
