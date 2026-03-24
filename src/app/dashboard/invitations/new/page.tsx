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
  const [editorType, setEditorType] = useState('BLOCK');
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
      const initialConfig = editorType === 'FREEFORM' 
        ? '{"blocks":[],"globalStyles":{"backgroundColor":"#ffffff","fontFamily":"Inter"}}'
        : '{"groomName":"","brideName":"","date":"","time":"","location":""}';

      const res = await axiosClient.post('/invitations', {
        templateId: Number(templateId),
        slug,
        configJson: initialConfig,
        editorType
      });
      
      const targetPath = editorType === 'FREEFORM' 
        ? `/dashboard/${res.data.id}/freeform-editor` 
        : `/dashboard/${res.data.id}/editor`;
      
      router.push(targetPath);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi tạo thiệp. Slug có thể đã tồn tại.');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 flex flex-col gap-6 w-full max-w-[450px] border shadow-2xl rounded-3xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Tạo Thiệp Mới</h2>
        <form onSubmit={handleCreate} className="flex flex-col gap-6">
          <div>
            <label className="text-sm font-bold text-gray-700 block mb-2">Đường dẫn thiệp (Slug)</label>
            <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden focus-within:border-rose-500 transition-colors">
               <span className="bg-gray-50 px-3 py-3 text-sm text-gray-400 border-r">cuoi.com/</span>
               <input 
                 className="p-3 outline-none flex-1 text-sm font-medium" 
                 placeholder="minh-lan"
                 value={slug}
                 onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                 required
               />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 block mb-3">Chọn loại Editor</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setEditorType('BLOCK')}
                className={`p-4 border-2 rounded-2xl text-left transition-all ${
                  editorType === 'BLOCK' 
                    ? 'border-rose-500 bg-rose-50' 
                    : 'border-gray-100 hover:border-rose-200'
                }`}
              >
                <div className={`font-bold text-sm ${editorType === 'BLOCK' ? 'text-rose-600' : 'text-gray-700'}`}>Editor Khối</div>
                <div className="text-xs text-gray-500 mt-1">Giao diện đơn giản, dễ sử dụng theo từng phần.</div>
              </button>
              <button
                type="button"
                onClick={() => setEditorType('FREEFORM')}
                className={`p-4 border-2 rounded-2xl text-left transition-all ${
                  editorType === 'FREEFORM' 
                    ? 'border-rose-500 bg-rose-50' 
                    : 'border-gray-100 hover:border-rose-200'
                }`}
              >
                <div className={`font-bold text-sm ${editorType === 'FREEFORM' ? 'text-rose-600' : 'text-gray-700'}`}>Editor Tự Do</div>
                <div className="text-xs text-gray-500 mt-1">Kéo thả linh hoạt như Canva, tùy chỉnh không giới hạn.</div>
              </button>
            </div>
          </div>

          <button 
            disabled={loading} 
            type="submit" 
            className="bg-rose-600 text-white font-bold py-4 rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 disabled:opacity-50 transition-all active:scale-95"
          >
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
