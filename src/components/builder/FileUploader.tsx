'use client';
import { useState, useRef } from 'react';
import axiosClient from '@/api/axiosClient';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label: string;
  accept?: string;
}

export default function FileUploader({ value, onChange, label, accept = 'image/*' }: Props) {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axiosClient.post('/uploads', formData);
      const urlPart = res.data.url;
      const apiBase = axiosClient.defaults.baseURL || 'http://127.0.0.1:4000';
      const cleanBase = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase;
      const cleanUrl = urlPart.startsWith('/') ? urlPart : '/' + urlPart;
      const finalUrl = cleanBase + cleanUrl;
      onChange(finalUrl);
    } catch (err: any) {
      console.error('Lỗi upload:', err?.response?.data || err.message);
      alert('Upload lỗi: ' + (err?.response?.data?.message || err.message));
    } finally {
      if (e.target) e.target.value = ''; // Reset input to allow re-selection and release chooser state
      setLoading(false);
    }
  };

  const triggerPicker = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-1 w-full" onClick={e => e.stopPropagation()}>
      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</label>
      <div className="flex gap-2">
        <input 
          value={value || ''} 
          onChange={e => onChange(e.target.value)} 
          placeholder="http://..." 
          className="flex-1 border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <button
          type="button"
          onClick={triggerPicker}
          disabled={loading}
          className={`flex-shrink-0 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-lg px-3 cursor-pointer hover:bg-gray-200 transition ${loading ? 'opacity-50' : ''}`}
        >
          <span className="text-xs font-bold text-gray-600">{loading ? '...' : 'Upload'}</span>
        </button>
        <input 
          type="file" 
          ref={fileInputRef}
          accept={accept} 
          className="hidden" 
          onChange={handleUpload} 
        />
      </div>
      {accept.startsWith('image') && value && (
         <div className="mt-2 h-20 bg-gray-50 border rounded-lg overflow-hidden shrink-0">
            <img src={value} className="h-full object-contain mx-auto" alt="preview" />
         </div>
      )}
      {accept.startsWith('audio') && value && (
         <audio controls className="mt-2 w-full h-10" src={value} />
      )}
    </div>
  );
}
