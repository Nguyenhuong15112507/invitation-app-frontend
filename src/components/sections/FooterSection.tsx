import { FooterData } from '@/lib/sections';

export default function FooterSection({ data }: { data: FooterData }) {
  return (
    <div className="py-10 px-6 text-center bg-rose-50/40">
      <div className="text-3xl mb-3">🌸</div>
      <p className="text-gray-500 text-sm italic font-serif leading-relaxed max-w-xs mx-auto">
        {data.text || 'Sự hiện diện của quý khách là niềm hạnh phúc lớn nhất của đôi chúng tôi.'}
      </p>
      <p className="text-xs text-gray-300 mt-6">Made with ❤️ by Create Invitations</p>
    </div>
  );
}
