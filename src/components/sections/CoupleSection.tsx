import { CoupleData } from '@/lib/sections';

export default function CoupleSection({ data }: { data: CoupleData }) {
  return (
    <div className="py-10 px-6 text-center bg-[#FDFBF7] font-serif">
      <p className="text-xs tracking-widest text-rose-400 uppercase mb-6">Save the Date</p>

      <div className="flex justify-center items-center gap-6 mb-6">
        {data.groomPhoto ? (
          <img src={data.groomPhoto} alt="Chú rể" className="w-20 h-20 rounded-full object-cover border-4 border-rose-100 shadow" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-rose-50 border-4 border-rose-100 flex items-center justify-center text-3xl">🤵</div>
        )}
        <span className="text-3xl text-rose-300">&</span>
        {data.bridePhoto ? (
          <img src={data.bridePhoto} alt="Cô dâu" className="w-20 h-20 rounded-full object-cover border-4 border-rose-100 shadow" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-rose-50 border-4 border-rose-100 flex items-center justify-center text-3xl">👰</div>
        )}
      </div>

      <h1 className="text-4xl text-gray-800 leading-tight">{data.groomName || 'Tên Chú Rể'}</h1>
      <p className="text-2xl text-rose-300 my-2">&</p>
      <h1 className="text-4xl text-gray-800 leading-tight">{data.brideName || 'Tên Cô Dâu'}</h1>
    </div>
  );
}
