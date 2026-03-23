'use client';

import { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { configSchema, InvitationConfig } from '@/lib/schema';
import { useEditorStore } from '@/store/useEditorStore';
import debounce from 'lodash/debounce';
import axiosClient from '@/api/axiosClient';
import ModernTemplateCard from '@/components/templates/ModernTemplateCard';

export default function EditorPage({ params }: { params: { id: string } }) {
  const { config, updateConfig, setSaving, isSaving } = useEditorStore();
  
  const { register, watch, formState: { errors } } = useForm<InvitationConfig>({
    resolver: zodResolver(configSchema),
    defaultValues: config,
  });

  const formData = watch();

  const debouncedSave = useCallback(
    debounce(async (data: InvitationConfig) => {
      setSaving(true);
      try {
        await axiosClient.put(`/invitations/${params.id}`, { configJson: data });
      } catch (error) {
        console.error('Save failed', error);
      } finally {
        setSaving(false);
      }
    }, 1500),
    []
  );

  useEffect(() => {
    updateConfig(formData);
    debouncedSave(formData);
  }, [formData, updateConfig, debouncedSave]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-1/3 p-6 bg-white border-r overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa Thiệp</h2>
        {isSaving && <span className="text-sm text-gray-500">Đang lưu...</span>}
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Chú rể</label>
            <input {...register('groomName')} className="w-full border p-2 rounded" />
            {errors.groomName && <p className="text-red-500 text-xs">{errors.groomName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Cô dâu</label>
            <input {...register('brideName')} className="w-full border p-2 rounded" />
            {errors.brideName && <p className="text-red-500 text-xs">{errors.brideName.message}</p>}
          </div>
          <div className="flex gap-2">
             <div className="w-1/2">
                <label className="block text-sm font-medium">Ngày</label>
                <input type="date" {...register('date')} className="w-full border p-2 rounded" />
             </div>
             <div className="w-1/2">
                <label className="block text-sm font-medium">Giờ</label>
                <input type="time" {...register('time')} className="w-full border p-2 rounded" />
             </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Địa điểm</label>
            <input {...register('location')} className="w-full border p-2 rounded" />
          </div>
        </form>
      </div>

      <div className="flex-1 p-8 flex justify-center items-center bg-gray-100">
         <div className="w-[375px] h-[812px] bg-white shadow-2xl overflow-y-auto border-4 border-gray-800 rounded-3xl">
            <ModernTemplateCard config={config} />
         </div>
      </div>
    </div>
  );
}
