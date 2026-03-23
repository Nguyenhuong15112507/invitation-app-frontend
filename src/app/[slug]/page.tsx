import { notFound } from 'next/navigation';
import RsvpModal from '@/components/RsvpModal';
import SectionRenderer from '@/components/builder/SectionRenderer';
import { Section } from '@/lib/sections';

async function getInvitation(slug: string) {
  try {
    const res = await fetch(`http://localhost:4000/invitations/public/${slug}`, {
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

  // Parse sections from configJson
  let sections: Section[] = [];
  try {
    const cfg = data.config ?? {};
    if (cfg.sections && Array.isArray(cfg.sections)) {
      sections = cfg.sections;
    }
  } catch {}

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl overflow-hidden relative">
        {sections.length > 0 ? (
          <SectionRenderer sections={sections} />
        ) : (
          <div className="p-10 text-center text-gray-400 text-sm">
            Thiệp đang được chuẩn bị...
          </div>
        )}
      </div>

      {/* Floating RSVP button */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center z-50">
        <RsvpModal slug={slug} />
      </div>
    </div>
  );
}
