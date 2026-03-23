import { EventData } from '@/lib/sections';

export default function EventSection({ data }: { data: EventData }) {
  if (!data.events?.length) return null;

  return (
    <div className="py-10 px-6 bg-white">
      <p className="text-center text-xs tracking-widest text-rose-400 uppercase mb-6">Thông tin đám cưới</p>
      <div className="space-y-5">
        {data.events.map((ev) => (
          <div key={ev.id} className="border border-rose-100 rounded-2xl p-4 text-center bg-rose-50/40">
            <h3 className="font-bold text-gray-800 font-serif text-lg mb-2">{ev.name || 'Sự kiện'}</h3>
            {ev.date && (
              <p className="text-gray-700 font-medium">
                🗓️ {new Date(ev.date).toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            )}
            {ev.time && <p className="text-gray-500 text-sm mt-1">🕐 {ev.time}</p>}
            {ev.location && <p className="text-gray-600 text-sm mt-2">📍 {ev.location}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
