'use client';

import { InvitationConfig } from '@/lib/schema';
import CountdownTimer from '@/components/CountdownTimer';

export default function ModernTemplateCard({ config }: { config: Partial<InvitationConfig> }) {
  const galleryImages = config?.galleryImages?.filter(Boolean) ?? [];
  const hasBankInfo = config?.bankAccount?.accountNumber && config?.bankAccount?.bankName;

  return (
    <div className="flex flex-col items-center bg-[#FDFBF7] min-h-full font-serif">

      {/* Cover Image */}
      <div
        className="w-full h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${config?.coverImage || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80'})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-white">
          {config?.title && (
            <p className="text-sm tracking-widest uppercase opacity-80">{config.title}</p>
          )}
        </div>
      </div>

      {/* Names */}
      <div className="mt-8 text-center px-4">
        <p className="tracking-widest text-xs text-rose-400 uppercase mb-3">Save the Date</p>
        <h1 className="text-4xl text-gray-800">{config?.groomName || 'Tên Chú Rể'}</h1>
        <p className="text-3xl text-rose-300 my-2">&</p>
        <h1 className="text-4xl text-gray-800">{config?.brideName || 'Tên Cô Dâu'}</h1>
      </div>

      {/* Date & Location */}
      <div className="mt-8 border-t border-b border-rose-100 py-5 w-4/5 text-center space-y-1">
        <p className="text-lg font-medium text-gray-700">{config?.date ? new Date(config.date).toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Ngày cưới'}</p>
        {config?.time && <p className="text-gray-400 text-sm">{config.time}</p>}
        {config?.location && <p className="text-gray-600 text-sm mt-2">📍 {config.location}</p>}
      </div>

      {/* Countdown */}
      {config?.date && (
        <CountdownTimer date={config.date} time={config?.time} />
      )}

      {/* Invitation Message */}
      {config?.invitationMessage && (
        <div className="w-4/5 mt-4 mb-2 text-center">
          <div className="border-l-2 border-rose-200 pl-4 py-2">
            <p className="text-gray-500 text-sm italic leading-relaxed whitespace-pre-line">
              {config.invitationMessage}
            </p>
          </div>
        </div>
      )}

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <div className="w-full px-4 mt-6">
          <p className="text-center text-xs tracking-widest text-gray-400 uppercase mb-3">Hình ảnh</p>
          <div className="grid grid-cols-2 gap-1">
            {galleryImages.slice(0, 4).map((url, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded">
                <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bank QR */}
      {hasBankInfo && (
        <div className="mt-8 mb-4 text-center px-4 w-full">
          <div className="bg-rose-50 rounded-2xl p-4 mx-4">
            <p className="text-xs tracking-widest text-rose-400 uppercase mb-3">Hộp Mừng Cưới</p>
            <img
              src={`https://img.vietqr.io/image/${config!.bankAccount!.bankName}-${config!.bankAccount!.accountNumber}-qr_only.png?amount=0&addInfo=MungCuoi`}
              width={180} height={180} alt="QR Bank"
              className="mx-auto rounded-xl border border-rose-100"
            />
            <p className="mt-3 text-sm font-semibold text-gray-700">{config!.bankAccount!.accountName}</p>
            <p className="text-xs text-gray-400">{config!.bankAccount!.bankName} – {config!.bankAccount!.accountNumber}</p>
          </div>
        </div>
      )}

      <div className="h-24" />
    </div>
  );
}
