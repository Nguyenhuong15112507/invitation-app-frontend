'use client';
import { useState, useRef, useEffect } from 'react';

export default function BackgroundMusic({ url }: { url: string }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play attempt on mount or user interaction
  useEffect(() => {
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.5;
          await audioRef.current.play();
          setPlaying(true);
        }
      } catch (err) {
        setPlaying(false);
      }
    };
    
    // Some browsers require interaction, so we attempt it and also attach to body once
    const handleInteraction = () => { playAudio(); document.removeEventListener('click', handleInteraction); };
    document.addEventListener('click', handleInteraction);
    
    playAudio();
    return () => document.removeEventListener('click', handleInteraction);
  }, [url]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio ref={audioRef} src={url} loop />
      <button 
        onClick={() => {
          if (playing) { audioRef.current?.pause(); setPlaying(false); }
          else { audioRef.current?.play(); setPlaying(true); }
        }}
        className={`w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex items-center justify-center text-xl text-rose-500 hover:scale-110 transition ${playing ? 'animate-pulse' : ''}`}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        {playing ? '🔊' : '🔇'}
      </button>
    </div>
  );
}
