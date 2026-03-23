import { notFound } from 'next/navigation';
import ModernTemplateCard from '@/components/templates/ModernTemplateCard';
import RsvpModal from '@/components/RsvpModal';

async function getInvitation(slug: string) {
  const res = await fetch(`http://localhost:3001/invitations/public/${slug}`, { 
    next: { revalidate: 60 }
  });
  
  if (!res.ok) {
    if (res.status === 403) return 'EXPIRED';
    return null;
  }
  return res.json();
}

export default async function PublicInvitation({ params }: { params: { slug: string } }) {
  const data = await getInvitation(params.slug);

  if (!data) return notFound();
  if (data === 'EXPIRED') {
    return <div className="p-10 text-center text-red-500">Thiệp đã hết hạn dùng thử. Vui lòng liên hệ chủ tiệc.</div>;
  }

  return (
    <div className="w-full min-h-screen relative max-w-md mx-auto bg-white shadow-lg">
      <ModernTemplateCard config={data.config} />
      
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-50">
        <RsvpModal slug={params.slug} />
      </div>
    </div>
  );
}
