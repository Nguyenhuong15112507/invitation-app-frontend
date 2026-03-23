'use client';

import { Section, SectionType, EventItem, StoryItem, BankAccount } from '@/lib/sections';

interface Props {
  section: Section;
  onChange: (data: any) => void;
}

const inputCls = 'w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300';
const labelCls = 'block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1';

// ─── Sub-editors ──────────────────────────────────────────────

function HeroEditor({ data, onChange }: { data: any; onChange: any }) {
  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>Ảnh bìa (URL)</label>
        <input value={data.coverImage || ''} onChange={e => onChange({ ...data, coverImage: e.target.value })} placeholder="https://..." className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Tiêu đề phụ</label>
        <input value={data.title || ''} onChange={e => onChange({ ...data, title: e.target.value })} placeholder="VD: Thiệp cưới…" className={inputCls} />
      </div>
    </div>
  );
}

function CoupleEditor({ data, onChange }: { data: any; onChange: any }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelCls}>Chú rể</label>
          <input value={data.groomName || ''} onChange={e => onChange({ ...data, groomName: e.target.value })} className={inputCls} placeholder="Tên chú rể" />
        </div>
        <div>
          <label className={labelCls}>Cô dâu</label>
          <input value={data.brideName || ''} onChange={e => onChange({ ...data, brideName: e.target.value })} className={inputCls} placeholder="Tên cô dâu" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelCls}>Ảnh chú rể (URL)</label>
          <input value={data.groomPhoto || ''} onChange={e => onChange({ ...data, groomPhoto: e.target.value })} className={inputCls} placeholder="https://..." />
        </div>
        <div>
          <label className={labelCls}>Ảnh cô dâu (URL)</label>
          <input value={data.bridePhoto || ''} onChange={e => onChange({ ...data, bridePhoto: e.target.value })} className={inputCls} placeholder="https://..." />
        </div>
      </div>
    </div>
  );
}

function EventEditor({ data, onChange }: { data: any; onChange: any }) {
  const events: EventItem[] = data.events || [];

  const updateEvent = (idx: number, field: string, val: string) => {
    const updated = events.map((e, i) => i === idx ? { ...e, [field]: val } : e);
    onChange({ ...data, events: updated });
  };
  const addEvent = () => {
    onChange({ ...data, events: [...events, { id: `ev-${Date.now()}`, name: 'Sự kiện mới', date: '', time: '', location: '' }] });
  };
  const removeEvent = (idx: number) => {
    onChange({ ...data, events: events.filter((_, i) => i !== idx) });
  };

  return (
    <div className="space-y-4">
      {events.map((ev, idx) => (
        <div key={ev.id} className="bg-gray-50 rounded-xl p-3 space-y-2 relative">
          <div className="flex justify-between items-center mb-1">
            <input value={ev.name} onChange={e => updateEvent(idx, 'name', e.target.value)} className="text-sm font-bold bg-transparent border-b border-gray-200 outline-none flex-1 mr-2" placeholder="Tên sự kiện" />
            {events.length > 1 && <button onClick={() => removeEvent(idx)} className="text-red-400 text-xs hover:text-red-600">✕</button>}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className={labelCls}>Ngày</label>
              <input type="date" value={ev.date} onChange={e => updateEvent(idx, 'date', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Giờ</label>
              <input type="time" value={ev.time} onChange={e => updateEvent(idx, 'time', e.target.value)} className={inputCls} />
            </div>
          </div>
          <div>
            <label className={labelCls}>Địa điểm</label>
            <input value={ev.location} onChange={e => updateEvent(idx, 'location', e.target.value)} placeholder="Tên nhà hàng, địa chỉ..." className={inputCls} />
          </div>
        </div>
      ))}
      <button onClick={addEvent} className="w-full py-2 border-2 border-dashed border-rose-200 rounded-xl text-rose-400 text-xs hover:border-rose-400 hover:bg-rose-50 transition">
        + Thêm sự kiện
      </button>
    </div>
  );
}

function CountdownEditor({ data, onChange }: { data: any; onChange: any }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className={labelCls}>Ngày đích</label>
          <input type="date" value={data.targetDate || ''} onChange={e => onChange({ ...data, targetDate: e.target.value })} className={inputCls} />
        </div>
        <div>
          <label className={labelCls}>Giờ đích</label>
          <input type="time" value={data.targetTime || ''} onChange={e => onChange({ ...data, targetTime: e.target.value })} className={inputCls} />
        </div>
      </div>
      <div>
        <label className={labelCls}>Label</label>
        <input value={data.label || ''} onChange={e => onChange({ ...data, label: e.target.value })} placeholder="VD: Còn lại" className={inputCls} />
      </div>
    </div>
  );
}

function MessageEditor({ data, onChange }: { data: any; onChange: any }) {
  return (
    <div>
      <label className={labelCls}>Lời nhắn / Lời mời</label>
      <textarea value={data.text || ''} onChange={e => onChange({ ...data, text: e.target.value })} rows={4} placeholder="Trân trọng kính mời..." className={`${inputCls} resize-none`} />
    </div>
  );
}

function GalleryEditor({ data, onChange }: { data: any; onChange: any }) {
  const images: string[] = data.images || [];
  const setImages = (raw: string) => {
    const arr = raw.split('\n').map(u => u.trim()).filter(u => u.startsWith('http'));
    onChange({ ...data, images: arr });
  };

  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>URL ảnh (mỗi dòng 1 URL)</label>
        <textarea
          defaultValue={images.join('\n')}
          onBlur={e => setImages(e.target.value)}
          rows={4}
          placeholder={"https://example.com/1.jpg\nhttps://example.com/2.jpg"}
          className={`${inputCls} resize-none font-mono text-xs`}
        />
        {images.length > 0 && <p className="text-xs text-green-600 mt-1">✓ {images.length} ảnh hợp lệ</p>}
      </div>
      <div>
        <label className={labelCls}>Số cột</label>
        <select value={data.columns || 2} onChange={e => onChange({ ...data, columns: Number(e.target.value) as 2 | 3 })} className={inputCls}>
          <option value={2}>2 cột</option>
          <option value={3}>3 cột</option>
        </select>
      </div>
    </div>
  );
}

function StoryEditor({ data, onChange }: { data: any; onChange: any }) {
  const items: StoryItem[] = data.items || [];

  const updateItem = (idx: number, field: string, val: string) => {
    const updated = items.map((it, i) => i === idx ? { ...it, [field]: val } : it);
    onChange({ ...data, items: updated });
  };
  const addItem = () => onChange({ ...data, items: [...items, { id: `s-${Date.now()}`, date: '', title: '', description: '' }] });
  const removeItem = (idx: number) => onChange({ ...data, items: items.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={it.id} className="bg-gray-50 rounded-xl p-3 space-y-2">
          <div className="flex justify-between items-center">
            <input value={it.title} onChange={e => updateItem(idx, 'title', e.target.value)} className="text-sm font-bold bg-transparent border-b border-gray-200 outline-none flex-1 mr-2" placeholder="Cột mốc…" />
            {items.length > 1 && <button onClick={() => removeItem(idx)} className="text-red-400 text-xs">✕</button>}
          </div>
          <input type="date" value={it.date} onChange={e => updateItem(idx, 'date', e.target.value)} className={inputCls} />
          <textarea value={it.description} onChange={e => updateItem(idx, 'description', e.target.value)} rows={2} placeholder="Mô tả ngắn..." className={`${inputCls} resize-none`} />
        </div>
      ))}
      <button onClick={addItem} className="w-full py-2 border-2 border-dashed border-rose-200 rounded-xl text-rose-400 text-xs hover:border-rose-400 hover:bg-rose-50 transition">
        + Thêm kỷ niệm
      </button>
    </div>
  );
}

function BankEditor({ data, onChange }: { data: any; onChange: any }) {
  const accounts: BankAccount[] = data.accounts || [];

  const updateAcc = (idx: number, field: string, val: string) => {
    const updated = accounts.map((a, i) => i === idx ? { ...a, [field]: val } : a);
    onChange({ ...data, accounts: updated });
  };
  const addAcc = () => onChange({ ...data, accounts: [...accounts, { id: `b-${Date.now()}`, bankName: '', accountNumber: '', accountName: '' }] });
  const removeAcc = (idx: number) => onChange({ ...data, accounts: accounts.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-3">
      {accounts.map((acc, idx) => (
        <div key={acc.id} className="bg-gray-50 rounded-xl p-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500">Tài khoản {idx + 1}</span>
            {accounts.length > 1 && <button onClick={() => removeAcc(idx)} className="text-red-400 text-xs">✕</button>}
          </div>
          <input value={acc.bankName} onChange={e => updateAcc(idx, 'bankName', e.target.value)} placeholder="Tên ngân hàng (VCB, MB, TCB...)" className={inputCls} />
          <input value={acc.accountNumber} onChange={e => updateAcc(idx, 'accountNumber', e.target.value)} placeholder="Số tài khoản" className={inputCls} />
          <input value={acc.accountName} onChange={e => updateAcc(idx, 'accountName', e.target.value)} placeholder="Tên chủ tài khoản" className={inputCls} />
        </div>
      ))}
      <button onClick={addAcc} className="w-full py-2 border-2 border-dashed border-rose-200 rounded-xl text-rose-400 text-xs hover:border-rose-400 hover:bg-rose-50 transition">
        + Thêm tài khoản
      </button>
    </div>
  );
}

function MapEditor({ data, onChange }: { data: any; onChange: any }) {
  return (
    <div className="space-y-3">
      <div>
        <label className={labelCls}>Địa chỉ</label>
        <input value={data.address || ''} onChange={e => onChange({ ...data, address: e.target.value })} placeholder="Nhà hàng ABC, 123 Đường XYZ, TP.HCM" className={inputCls} />
      </div>
      <div>
        <label className={labelCls}>Google Maps Embed URL (tùy chọn)</label>
        <textarea value={data.mapEmbedUrl || ''} onChange={e => onChange({ ...data, mapEmbedUrl: e.target.value })} rows={2} placeholder="https://www.google.com/maps/embed?..." className={`${inputCls} resize-none font-mono text-xs`} />
        <p className="text-[10px] text-gray-400 mt-1">Lấy từ Google Maps → Chia sẻ → Nhúng bản đồ → Copy URL</p>
      </div>
    </div>
  );
}

function FooterEditor({ data, onChange }: { data: any; onChange: any }) {
  return (
    <div>
      <label className={labelCls}>Lời cảm ơn</label>
      <textarea value={data.text || ''} onChange={e => onChange({ ...data, text: e.target.value })} rows={3} placeholder="Sự hiện diện của quý khách là..." className={`${inputCls} resize-none`} />
    </div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────
export default function SectionEditorPanel({ section, onChange }: Props) {
  const d = section.data as any;

  switch (section.type) {
    case 'hero':      return <HeroEditor data={d} onChange={onChange} />;
    case 'couple':    return <CoupleEditor data={d} onChange={onChange} />;
    case 'event':     return <EventEditor data={d} onChange={onChange} />;
    case 'countdown': return <CountdownEditor data={d} onChange={onChange} />;
    case 'message':   return <MessageEditor data={d} onChange={onChange} />;
    case 'gallery':   return <GalleryEditor data={d} onChange={onChange} />;
    case 'story':     return <StoryEditor data={d} onChange={onChange} />;
    case 'bank':      return <BankEditor data={d} onChange={onChange} />;
    case 'map':       return <MapEditor data={d} onChange={onChange} />;
    case 'footer':    return <FooterEditor data={d} onChange={onChange} />;
    default:          return null;
  }
}
