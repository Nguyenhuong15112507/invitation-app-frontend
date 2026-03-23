'use client';

import { useEffect, useState, use } from 'react';
import axiosClient from '@/api/axiosClient';
import Link from 'next/link';

type RsvpEntry = {
  id: number;
  guestName: string;
  phone: string;
  status: 'GOING' | 'NOT_GOING' | 'MAYBE';
  guestCount: number;
  message?: string;
  createdAt: string;
};

type RsvpData = {
  summary: {
    total: number;
    going: number;
    maybe: number;
    notGoing: number;
    totalGuests: number;
  };
  rsvps: RsvpEntry[];
};

const statusDisplay: Record<string, { label: string; color: string; icon: string }> = {
  GOING:     { label: 'Tham dự', color: 'bg-green-50 text-green-700 border-green-200', icon: '✅' },
  MAYBE:     { label: 'Có thể', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: '🤔' },
  NOT_GOING: { label: 'Vắng', color: 'bg-red-50 text-red-600 border-red-200', icon: '❌' },
};

export default function RsvpsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<RsvpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'GOING' | 'MAYBE' | 'NOT_GOING'>('ALL');

  useEffect(() => {
    axiosClient.get(`/rsvps/invitation/${id}`)
      .then(res => setData(res.data))
      .catch(() => setError('Không thể tải dữ liệu RSVP.'))
      .finally(() => setLoading(false));
  }, [id]);

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

  const filtered = data?.rsvps.filter(r => filter === 'ALL' || r.status === filter) ?? [];

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/dashboard/invitations" className="hover:text-rose-500 transition">← Danh sách thiệp</Link>
        <span>/</span>
        <span className="text-gray-600 font-medium">RSVP (Thiệp #{id})</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Danh sách RSVP</h1>
        <Link href={`/dashboard/${id}/editor`} className="text-sm text-gray-400 hover:text-gray-700 transition">
          ✏️ Chỉnh sửa thiệp →
        </Link>
      </div>

      {/* Summary Cards */}
      {data && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Tổng RSVP', value: data.summary.total, color: 'bg-gray-50 text-gray-800', sub: 'phản hồi' },
            { label: 'Sẽ tham dự', value: data.summary.going, color: 'bg-green-50 text-green-700', sub: `≈ ${data.summary.totalGuests} khách` },
            { label: 'Có thể đến', value: data.summary.maybe, color: 'bg-amber-50 text-amber-700', sub: 'chưa chắc' },
            { label: 'Không đến', value: data.summary.notGoing, color: 'bg-red-50 text-red-600', sub: 'vắng mặt' },
          ].map((card) => (
            <div key={card.label} className={`${card.color} rounded-2xl p-4 border border-white shadow-sm`}>
              <p className="text-3xl font-black">{card.value}</p>
              <p className="text-xs font-semibold mt-1">{card.label}</p>
              <p className="text-[11px] opacity-70 mt-0.5">{card.sub}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(['ALL', 'GOING', 'MAYBE', 'NOT_GOING'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
              filter === f ? 'bg-rose-600 text-white border-rose-600' : 'bg-white text-gray-500 border-gray-200 hover:border-rose-300'
            }`}
          >
            {f === 'ALL' ? 'Tất cả' : statusDisplay[f].icon + ' ' + statusDisplay[f].label}
            <span className="ml-1 opacity-70">({
              f === 'ALL' ? data?.summary.total :
              f === 'GOING' ? data?.summary.going :
              f === 'MAYBE' ? data?.summary.maybe : data?.summary.notGoing
            })</span>
          </button>
        ))}
      </div>

      {/* RSVP list */}
      {filtered.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-400 text-sm">
            {data?.summary.total === 0
              ? 'Chưa có khách nào gửi xác nhận. Hãy chia sẻ link thiệp nhé!'
              : 'Không có RSVP nào trong nhóm này.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((rsvp) => {
            const s = statusDisplay[rsvp.status];
            return (
              <div key={rsvp.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-gray-800">{rsvp.guestName}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${s.color}`}>
                        {s.icon} {s.label}
                      </span>
                      {rsvp.guestCount > 1 && (
                        <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
                          {rsvp.guestCount} người
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">📞 {rsvp.phone}</p>
                    {rsvp.message && (
                      <p className="text-sm text-gray-500 mt-2 italic bg-gray-50 rounded-lg px-3 py-1.5">
                        &ldquo;{rsvp.message}&rdquo;
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[11px] text-gray-300">
                      {new Date(rsvp.createdAt).toLocaleDateString('vi-VN', {
                        day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
