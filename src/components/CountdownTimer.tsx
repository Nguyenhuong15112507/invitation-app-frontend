'use client';

import { useEffect, useRef, useState } from 'react';

interface CountdownTimerProps {
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
}

export default function CountdownTimer({ date, time }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isPast, setIsPast] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!date) return;

    const calculate = () => {
      const target = new Date(`${date}T${time || '00:00'}:00`);
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setIsPast(true);
        clearInterval(timerRef.current);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculate();
    timerRef.current = setInterval(calculate, 1000);
    return () => clearInterval(timerRef.current);
  }, [date, time]);

  if (!date) return null;

  if (isPast) {
    return (
      <div className="text-center py-4">
        <p className="text-rose-600 font-serif text-lg">🎊 Hôm nay là ngày trọng đại!</p>
      </div>
    );
  }

  const units = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <div className="py-6 px-4 text-center">
      <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Còn lại</p>
      <div className="flex justify-center gap-3">
        {units.map((u) => (
          <div key={u.label} className="flex flex-col items-center">
            <div className="bg-rose-50 border border-rose-200 rounded-xl w-14 h-14 flex items-center justify-center">
              <span className="text-2xl font-bold text-rose-700 font-mono tabular-nums">
                {String(u.value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
