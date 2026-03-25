'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import axiosClient from '@/api/axiosClient';
import { useFreeformEditorStore } from '@/store/useFreeformEditorStore';
import Sidebar from '@/components/freeform-builder/Sidebar';
import Canvas from '@/components/freeform-builder/Canvas';
import PropertiesPanel from '@/components/freeform-builder/PropertiesPanel';

export default function FreeformEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { blocks, globalStyles, loadConfig } = useFreeformEditorStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axiosClient.get(`/invitations/${id}/dashboard`) // Mượn API dashboard để check quyền/tải sơ bộ nếu cần, hoặc dùng API riêng
      .then(() => {
        // Thực tế nên có API GET /invitations/:id chi tiết
        return axiosClient.get('/invitations/my');
      })
      .then(res => {
        const inv = res.data.find((i: any) => i.id === Number(id));
        if (inv) {
          loadConfig(inv.configJson);
        }
        setLoading(false);
      })
      .catch(() => {
        router.push('/dashboard/invitations');
      });
  }, [id, router, loadConfig]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const configJson = JSON.stringify({ blocks, globalStyles });
      console.log('Saving configJson (Length):', configJson.length);
      console.log('Sending payload:', { configJson: configJson.substring(0, 100) + '...' });

      const response = await axiosClient.put(`/invitations/${id}`, { configJson });
      console.log('Save response:', response.data);

      alert('Đã lưu thành công!');
    } catch (err: any) {
      console.error('Save error:', err);
      const msg = err.response?.data?.message || err.message || 'Lỗi không xác định';
      alert(`Lỗi khi lưu dữ liệu: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải editor...</div>;

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Topbar */}
      <div className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-800 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </button>
          <h1 className="font-bold text-gray-800">Editor Tự Do (Beta)</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700 disabled:opacity-50 shadow-lg shadow-rose-200"
          >
            {saving ? 'Đang lưu...' : 'Lưu lại'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto p-12 flex justify-center bg-[#f3f4f6] custom-scrollbar">
          <Canvas />
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}
