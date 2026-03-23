import { MessageData } from '@/lib/sections';

export default function MessageSection({ data }: { data: MessageData }) {
  if (!data.text) return null;
  return (
    <div className="py-8 px-8 bg-white text-center">
      <div className="border-l-2 border-rose-200 pl-5 text-left inline-block max-w-xs">
        <p className="text-gray-500 text-sm italic leading-relaxed font-serif whitespace-pre-line">{data.text}</p>
      </div>
    </div>
  );
}
