import { BankData } from '@/lib/sections';

export default function BankSection({ data }: { data: BankData }) {
  const accounts = data.accounts?.filter(a => a.accountNumber && a.bankName) ?? [];
  if (!accounts.length) return null;

  return (
    <div className="py-8 px-4 bg-[#FDFBF7]">
      <p className="text-center text-xs tracking-widest text-rose-400 uppercase mb-6">Hộp Mừng Cưới</p>
      <div className="space-y-4">
        {accounts.map((acc) => (
          <div key={acc.id} className="bg-white rounded-2xl border border-rose-100 p-4 text-center shadow-sm">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">{acc.bankName}</p>
            <img
              src={`https://img.vietqr.io/image/${acc.bankName}-${acc.accountNumber}-qr_only.png?amount=0&addInfo=MungCuoi`}
              width={160} height={160} alt="QR"
              className="mx-auto rounded-xl border border-rose-100 mb-3"
              loading="lazy"
            />
            <p className="font-bold text-gray-800 text-sm">{acc.accountName}</p>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">{acc.accountNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
