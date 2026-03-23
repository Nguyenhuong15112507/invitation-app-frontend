'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { rsvpSchema } from '@/lib/schema';
import axiosClient from '@/api/axiosClient';

export default function RsvpModal({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(rsvpSchema) });

  const onSubmit = async (data: any) => {
    try {
      await axiosClient.post(`/rsvps/public/${slug}`, data);
      setSuccess(true);
    } catch (e) {
      alert("Lỗi khi gửi RSVP");
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="bg-rose-500 text-white px-8 py-3 rounded-full shadow-lg font-bold">
        Xác Nhận Tham Dự
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm">
        {success ? (
          <div className="text-center text-green-600">
            <h3 className="text-xl font-bold">Cảm ơn bạn!</h3>
            <p>Xác nhận của bạn đã được gửi đến cô dâu chú rể.</p>
            <button onClick={() => setOpen(false)} className="mt-4 text-blue-500">Đóng</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
            <h2 className="text-xl font-bold">Gửi Xác Nhận</h2>
            <input {...register('guestName')} placeholder="Tên của bạn" className="w-full border p-2 rounded" />
            {errors.guestName && <p className="text-red-500 text-xs">{errors.guestName.message as string}</p>}
            
            <input {...register('phone')} placeholder="Số điện thoại" className="w-full border p-2 rounded" />
            
            <select {...register('status')} className="w-full border p-2 rounded text-gray-700">
              <option value="GOING">Chắc chắn tham gia</option>
              <option value="MAYBE">Có thể sẽ tới</option>
              <option value="NOT_GOING">Xin lỗi, không thể tới</option>
            </select>
            
            <input type="number" {...register('guestCount')} placeholder="Số người tham dự" defaultValue={1} className="w-full border p-2 rounded" />
            
            <textarea {...register('message')} placeholder="Lời chúc mừng..." className="w-full border p-2 rounded"></textarea>
            
            <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-rose-500 text-white py-2 rounded">Gửi</button>
              <button type="button" onClick={() => setOpen(false)} className="flex-1 bg-gray-200 py-2 rounded">Hủy</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
