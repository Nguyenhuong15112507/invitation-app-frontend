'use client';
import { Suspense } from 'react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosClient from '@/api/axiosClient';

function NewInvitationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId') || '1';
  const [slug, setSlug] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosClient.post('/invitations', {
        templateId: Number(templateId),
        slug,
        configJson: '{"groomName":"","brideName":"","date":"","time":"","location":""}'
      });
      router.push(`/dashboard/${res.data.id}/editor`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi tạo thiệp. Slug có thể đã tồn tại.');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 flex flex-col gap-6 w-[400px] border shadow-xl rounded-2xl">
        <h2 className="text-2xl font-bold text-center">Tạo Thiệp Mới</h2>
        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700">Đường dẫn thiệp (Slug)</label>
            <div className="flex items-center mt-1 border rounded-lg overflow-hidden">
               <span className="bg-gray-100 px-3 py-2 text-sm text-gray-500">cuoi.com/</span>
               <input 
                 className="p-2 outline-none flex-1 text-sm font-medium" 
                 placeholder="minh-lan"
                 value={slug}
                 onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                 required
               />
            </div>
          </div>
          <button disabled={loading} type="submit" className="bg-rose-600 text-white font-bold py-3 rounded-lg hover:bg-rose-700 disabled:opacity-50">
            {loading ? 'Đang tạo...' : 'Tạo thiệp ngay'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function NewInvitation() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Đang tải...</div>}>
      <NewInvitationForm />
    </Suspense>
  );
}
