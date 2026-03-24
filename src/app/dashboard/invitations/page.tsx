'use client';

import { useEffect, useState } from 'react';
import axiosClient from '@/api/axiosClient';
import Link from 'next/link';

type Invitation = {
  id: number;
  slug: string;
  status: string;
  trialEndsAt: string;
  template: { name: string; thumbnail: string };
  _count: { rsvps: number };
  configJson: string;
  editorType: 'BLOCK' | 'FREEFORM';
};

const statusLabel: Record<string, { label: string; color: string }> = {
  TRIAL: { label: '🕐 Dùng thử', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  PAID:  { label: '✅ Đã xuất bản', color: 'bg-green-50 text-green-700 border-green-200' },
  EXPIRED: { label: '🔒 Hết hạn', color: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export default function MyInvitationsPage() {
  const [data, setData] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axiosClient.get('/invitations/my')
      .then(res => setData(res.data))
      .catch(() => setError('Không thể tải danh sách thiệp. Vui lòng thử lại.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-2 border-rose-400 border-t-transparent" />
    </div>
  );

  if (error) return (
    <div className="max-w-2xl mx-auto mt-12 px-6 text-center">
      <p className="text-red-500 mb-4">{error}</p>
      <button onClick={() => window.location.reload()} className="text-sm text-rose-600 underline">Tải lại</button>
    </div>
  );

  const trialLeft = (endsAt: string) => {
    const diff = new Date(endsAt).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `Còn ${days} ngày dùng thử` : 'Đã hết hạn';
  };

  const getTitle = (inv: Invitation) => {
    try {
      const cfg = JSON.parse(inv.configJson);
      if (cfg.title) return cfg.title;
      if (cfg.groomName && cfg.brideName) return `${cfg.groomName} & ${cfg.brideName}`;
    } catch {}
    return `/${inv.slug}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thiệp của tôi</h1>
          <p className="text-sm text-gray-400 mt-1">{data.length} thiệp đã tạo</p>
        </div>
        <Link
          href="/templates"
          className="px-5 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition shadow"
        >
          + Tạo thiệp mới
        </Link>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-16 text-center">
          <div className="text-5xl mb-4">💌</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Chưa có thiệp nào</h3>
          <p className="text-gray-400 text-sm mb-6">Hãy tạo thiệp đầu tiên để chia sẻ với gia đình và bạn bè.</p>
          <Link href="/templates" className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 transition">
            Chọn mẫu thiệp
          </Link>
        </div>
      )}

      {/* Invitation list */}
      <div className="space-y-4">
        {data.map((inv) => {
          const s = statusLabel[inv.status] || statusLabel.TRIAL;
          return (
            <div key={inv.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <div className="flex">
                {/* Thumbnail */}
                <div className="w-24 h-full bg-gray-50 flex-shrink-0 hidden sm:block">
                  <img src={inv.template?.thumbnail} alt="" className="w-full h-full object-cover opacity-80" style={{ minHeight: 100 }} />
                </div>

                {/* Content */}
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-800 text-lg">{getTitle(inv)}</h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${s.color}`}>
                          {s.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        cuoi.com/<span className="font-mono">{inv.slug}</span>
                        {inv.status === 'TRIAL' && (
                          <span className="ml-2 text-amber-500">· {trialLeft(inv.trialEndsAt)}</span>
                        )}
                      </p>
                    </div>

                    {/* RSVP count badge */}
                    <div className="text-center flex-shrink-0">
                      <p className="text-3xl font-black text-rose-500">{inv._count?.rsvps ?? 0}</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">RSVP</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50">
                    <Link
                      href={`/dashboard/${inv.id}/rsvps`}
                      className="px-4 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold hover:bg-rose-100 transition"
                    >
                      📋 Xem RSVP
                    </Link>
                    <Link
                      href={inv.editorType === 'FREEFORM' ? `/dashboard/${inv.id}/freeform-editor` : `/dashboard/${inv.id}/editor`}
                      className="px-4 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-xs font-semibold hover:bg-gray-100 transition"
                    >
                      ✏️ Chỉnh sửa
                    </Link>
                    <Link
                      href={`/${inv.slug}`}
                      target="_blank"
                      className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition"
                    >
                      🔗 Xem thiệp
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
