'use client';

import { useEffect, useRef, useState } from 'react';
import { CountdownData } from '@/lib/sections';

export default function CountdownSection({ data }: { data: CountdownData }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!data.targetDate) return;
    const calc = () => {
      const target = new Date(`${data.targetDate}T${data.targetTime || '00:00'}:00`);
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setIsPast(true); clearInterval(ref.current); return; }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    ref.current = setInterval(calc, 1000);
    return () => clearInterval(ref.current);
  }, [data.targetDate, data.targetTime]);

  if (!data.targetDate) return null;

  if (isPast) return (
    <div className="py-8 text-center text-rose-600 font-serif text-lg">🎊 Hôm nay là ngày trọng đại!</div>
  );

  const units = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <div className="py-8 px-4 bg-rose-50/30 text-center">
      <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">{data.label || 'Còn lại'}</p>
      <div className="flex justify-center gap-3">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <div className="bg-white border border-rose-200 rounded-xl w-14 h-14 flex items-center justify-center shadow-sm">
              <span className="text-2xl font-black text-rose-700 font-mono tabular-nums">{String(u.value).padStart(2, '0')}</span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
