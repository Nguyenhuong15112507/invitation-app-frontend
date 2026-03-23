'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { rsvpSchema } from '@/lib/schema';
import axiosClient from '@/api/axiosClient';

interface RsvpModalProps {
  slug: string;
}

export default function RsvpModal({ slug }: RsvpModalProps) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(rsvpSchema),
    defaultValues: { guestName: '', phone: '', status: 'GOING' as const, guestCount: 1, message: '' },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await axiosClient.post(`/rsvps/public/${slug}`, {
        ...data,
        guestCount: Number(data.guestCount),
      });
      setSuccess(true);
      reset();
    } catch {
      alert('Lỗi khi gửi xác nhận. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-rose-500 text-white px-8 py-3 rounded-full shadow-lg font-bold text-sm hover:bg-rose-600 transition active:scale-95"
      >
        💌 Xác Nhận Tham Dự
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 z-50">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-sm shadow-2xl">
        {success ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-gray-800">Cảm ơn bạn!</h3>
            <p className="text-gray-500 text-sm mt-2 leading-relaxed">
              Xác nhận của bạn đã được gửi đến cô dâu chú rể.
              <br />Hẹn gặp bạn trong ngày vui!
            </p>
            <button
              onClick={() => { setOpen(false); setSuccess(false); }}
              className="mt-5 w-full bg-gray-100 text-gray-700 py-2.5 rounded-xl font-medium text-sm"
            >
              Đóng
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="text-center mb-2">
              <h2 className="text-lg font-bold text-gray-800">Xác Nhận Tham Dự</h2>
              <p className="text-xs text-gray-400">Vui lòng điền thông tin để gửi xác nhận</p>
            </div>

            <div>
              <input
                {...register('guestName')}
                placeholder="Tên của bạn *"
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              {errors.guestName && <p className="text-red-500 text-xs mt-1">{errors.guestName.message as string}</p>}
            </div>

            <div>
              <input
                {...register('phone')}
                placeholder="Số điện thoại *"
                type="tel"
                className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
            </div>

            <select
              {...register('status')}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
            >
              <option value="GOING">✅ Chắc chắn tham gia</option>
              <option value="MAYBE">🤔 Có thể sẽ tới</option>
              <option value="NOT_GOING">❌ Xin lỗi, không thể tới</option>
            </select>

            <input
              type="number"
              {...register('guestCount', { valueAsNumber: true })}
              placeholder="Số người tham dự"
              min={1}
              max={20}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <textarea
              {...register('message')}
              placeholder="Lời chúc mừng... (tùy chọn)"
              rows={2}
              className="w-full border border-gray-200 p-3 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-rose-300"
            />

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-rose-500 text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60 hover:bg-rose-600 transition"
              >
                {loading ? '...' : 'Gửi xác nhận'}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-medium text-sm"
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
