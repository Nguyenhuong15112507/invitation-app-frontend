import Link from 'next/link';

export default async function Templates() {
  // Fetch từ backend localhost:4000
  let templates = [];
  try {
    const res = await fetch('http://localhost:4000/templates', { cache: 'no-store' });
    templates = await res.json();
  } catch (e) {
    console.error("Backend not running or error");
  }

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-white">
      <div className="mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900">Thư viện Mẫu Thiệp</h2>
        <p className="text-gray-500 mt-2">Chọn phong cách phù hợp nhất với ngày trọng đại của bạn.</p>
      </div>

      {templates.length === 0 ? (
        <div className="bg-orange-50 p-6 rounded-xl text-orange-700">
           Chưa có mẫu thiệp nào. Hãy chạy lệnh <b>npx ts-node prisma/seed.ts</b> ở Backend để khởi tạo.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {templates.map((t: any) => (
            <div key={t.id} className="group border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-300">
              <div className="h-72 overflow-hidden relative">
                 <img src={t.thumbnail} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                 {t.isPremium && <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">PREMIUM</span>}
              </div>
              <div className="p-6">
                 <h3 className="font-bold text-xl text-gray-800">{t.name}</h3>
                 <p className="text-sm text-gray-400 mt-1">Dễ dàng tùy chỉnh trong 5 phút</p>
                 <Link href={`/dashboard/invitations/new?templateId=${t.id}`} className="mt-6 block text-center py-3 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700 shadow-md">
                    Dùng mẫu này
                 </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
