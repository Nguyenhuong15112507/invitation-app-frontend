import { notFound } from 'next/navigation';
import RsvpModal from '@/components/RsvpModal';
import SectionRenderer from '@/components/builder/SectionRenderer';
import SongLongRenderer from '@/components/templates/SongLongRenderer';
import MinimalistRedRenderer from '@/components/templates/MinimalistRedRenderer';
import CineloveRenderer from '@/components/templates/CineloveRenderer';
import PreviewCanvas from '@/components/builder/PreviewCanvas';
import FreeformViewer from '@/components/freeform-builder/FreeformViewer';
import { Section } from '@/lib/sections';

async function getInvitation(slug: string) {
  try {
    const res = await fetch(`http://127.0.0.1:4000/invitations/public/${slug}`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) {
      if (res.status === 403) return 'EXPIRED';
      return null;
    }
    return res.json();
  } catch {
    return null;
  }
}

export default async function PublicInvitation({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getInvitation(slug);

  if (!data) return notFound();

  if (data === 'EXPIRED') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex flex-col items-center justify-center p-8">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thiệp đã hết hạn</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Thiệp cưới này đã hết thời gian dùng thử. Vui lòng liên hệ cô dâu chú rể nếu cần thêm thông tin.
          </p>
        </div>
      </div>
    );
  }

  // Parse sections and globalConfig from configJson
  let sections: Section[] = [];
  let globalConfig = undefined;
  try {
    const cfg = data.config ?? {};
    if (cfg.sections && Array.isArray(cfg.sections)) {
      sections = cfg.sections;
    }
    if (cfg.globalConfig) {
      globalConfig = cfg.globalConfig;
    }
  } catch {}

  const editorType = data.editorType || 'BLOCK';

  return (
    <div className="min-h-screen bg-[#F1F0EF] flex flex-col items-center py-6">
      <PreviewCanvas height="min-h-screen">
        {editorType === 'FREEFORM' ? (
          <FreeformViewer config={data.config} />
        ) : sections.length > 0 ? (
          data.template === 'song-long-do' ? (
            <SongLongRenderer sections={sections} globalConfig={globalConfig} />
          ) : data.template === 'minimalist-red' ? (
            <MinimalistRedRenderer sections={sections} globalConfig={globalConfig} />
          ) : data.template === 'cinelove-premium' ? (
            <CineloveRenderer sections={sections} globalConfig={globalConfig} />
          ) : (
            <SectionRenderer sections={sections} globalConfig={globalConfig} />
          )
        ) : (
          <div className="p-10 text-center text-gray-400 text-sm">
            Thiệp đang được chuẩn bị...
          </div>
        )}
      </PreviewCanvas>

      {/* Floating RSVP button */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center z-50">
        <RsvpModal slug={slug} />
      </div>
    </div>
  );
}
