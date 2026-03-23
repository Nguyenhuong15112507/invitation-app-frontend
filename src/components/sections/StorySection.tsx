import { StoryData } from '@/lib/sections';

export default function StorySection({ data }: { data: StoryData }) {
  const items = data.items?.filter(i => i.title) ?? [];
  if (!items.length) return null;

  return (
    <div className="py-8 px-6 bg-white">
      <p className="text-center text-xs tracking-widest text-rose-400 uppercase mb-6">Chuyện tình yêu</p>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-rose-100" />
        <div className="space-y-6 pl-10">
          {items.map((item, i) => (
            <div key={item.id || i} className="relative">
              <div className="absolute -left-7 top-1 w-4 h-4 rounded-full bg-rose-200 border-2 border-white shadow-sm" />
              {item.date && <p className="text-xs text-rose-400 mb-1">{item.date}</p>}
              <h4 className="font-bold text-gray-800 text-sm">{item.title}</h4>
              {item.description && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{item.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
