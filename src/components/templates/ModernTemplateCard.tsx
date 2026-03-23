import { InvitationConfig } from '@/lib/schema';

export default function ModernTemplateCard({ config }: { config: InvitationConfig }) {
  return (
    <div className="flex flex-col items-center bg-[#FDFBF7] min-h-full">
      <div 
        className="w-full h-96 bg-cover bg-center" 
        style={{ backgroundImage: `url(${config?.coverImage || 'https://via.placeholder.com/400x600?text=Cover'})` }}
      />
      
      <div className="mt-8 text-center px-4">
        <p className="tracking-widest text-sm text-gray-500 uppercase mb-2">Save the Date</p>
        <h1 className="text-4xl font-serif text-gray-800 mb-2">{config?.groomName || 'Chú Rể'}</h1>
        <p className="text-2xl font-serif text-gray-400">&</p>
        <h1 className="text-4xl font-serif text-gray-800 mt-2">{config?.brideName || 'Cô Dâu'}</h1>
      </div>

      <div className="mt-10 border-t border-b py-4 w-3/4 text-center">
        <p className="text-lg font-medium">{config?.date || 'DD-MM-YYYY'}</p>
        <p className="text-gray-500">{config?.time || '00:00'}</p>
      </div>

      <div className="mt-8 text-center px-6 pb-20">
        <p className="font-semibold text-gray-700">Tổ chức tại</p>
        <p className="text-gray-600 mt-2">{config?.location || 'Địa chỉ nhà hàng'}</p>
      </div>

      {config?.bankAccount?.accountNumber && (
        <div className="mt-4 mb-20 text-center">
          <h3 className="font-bold mb-2">Hộp Mừng Cưới</h3>
          <img 
            src={`https://img.vietqr.io/image/${config.bankAccount.bankName}-${config.bankAccount.accountNumber}-qr_only.png?amount=0&addInfo=MungCuoi`}
            width={200} height={200} alt="QR Bank"
            className="mx-auto rounded"
          />
        </div>
      )}
    </div>
  );
}
