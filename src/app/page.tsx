import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Navbar UI */}
      <nav className="border-b px-8 py-4 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-rose-600">Create Invitations</h1>
        <div className="space-x-8 font-medium">
          <Link href="/templates" className="hover:text-rose-600 transition">Mẫu Thiệp</Link>
          <Link href="/pricing" className="hover:text-rose-600 transition text-gray-400">Bảng Giá</Link>
          <Link href="/login" className="px-6 py-2 rounded-full border border-rose-600 text-rose-600 hover:bg-rose-50">Đăng Nhập</Link>
          <Link href="/register" className="px-6 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow-md transition">Bắt Đầu Ngay</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 py-20 text-center">
        <span className="bg-rose-100 text-rose-600 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest leading-loose">Digital Wedding Invitations</span>
        <h2 className="mt-6 text-6xl font-extrabold text-gray-900 leading-tight">
          Tạo thiệp cưới online <br /> <span className="text-rose-600">Đẹp - Nhanh - Hiện Đại</span>
        </h2>
        <p className="mt-8 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Tiết kiệm thời gian, quản lý RSVP thông minh, mừng tiền online bằng QR Code và chia sẻ dễ dàng qua Zalo, Messenger chỉ với 1 cú click.
        </p>
        <div className="mt-12 flex justify-center gap-4">
          <Link href="/templates" className="px-10 py-4 bg-rose-600 text-white text-lg font-bold rounded-xl shadow-xl hover:scale-105 transition transform">
            Khám phá 50+ Mẫu thiệp
          </Link>
          <Link href="/demo-slug" className="px-10 py-4 border-2 border-gray-200 text-gray-700 text-lg font-bold rounded-xl hover:bg-gray-50 transition">
            Xem Thiệp Mẫu
          </Link>
        </div>
      </main>

      {/* Feature Section */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="bg-rose-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl">✨</div>
            <h3 className="text-xl font-bold mb-3">Tự tay thiết kế</h3>
            <p className="text-gray-500">Chỉ cần điền thông tin, ảnh và video. Hệ thống tự render giao diện mượt mà.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="bg-rose-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl">📱</div>
            <h3 className="text-xl font-bold mb-3">Mobile First</h3>
            <p className="text-gray-500">Thiết kế tối ưu cho mọi thiết bị di động. Khách mời mở thiệp là bị hút hồn.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="bg-rose-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-4xl">💳</div>
            <h3 className="text-xl font-bold mb-3">Mừng cưới QR</h3>
            <p className="text-gray-500">Tích hợp VietQR, khách mời chỉ cần quét mã để gửi lời chúc và quà mừng.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
