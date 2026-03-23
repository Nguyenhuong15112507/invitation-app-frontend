'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

const navItems = [
  { href: '/dashboard/invitations', label: '💌 Thiệp của tôi' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top nav */}
      <header className="bg-white border-b h-14 flex items-center px-6 gap-6 fixed top-0 left-0 right-0 z-30">
        <Link href="/dashboard/invitations" className="font-bold text-rose-600 text-lg mr-4">
          💍 Create Invitations
        </Link>
        <nav className="flex items-center gap-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                pathname.startsWith(item.href)
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-gray-700 transition"
        >
          Đăng xuất
        </button>
      </header>

      {/* Page content */}
      <main className="pt-14 flex-1">
        {children}
      </main>
    </div>
  );
}
