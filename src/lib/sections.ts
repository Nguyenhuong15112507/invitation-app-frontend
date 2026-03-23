// ============================================================
// Section Types for the Invitation Builder
// ============================================================

export type SectionType =
  | 'hero'
  | 'couple'
  | 'event'
  | 'countdown'
  | 'message'
  | 'gallery'
  | 'story'
  | 'bank'
  | 'map'
  | 'footer';

// Per-section data shapes
export interface HeroData {
  coverImage: string;
  title: string;
}

export interface CoupleData {
  groomName: string;
  brideName: string;
  groomPhoto: string;
  bridePhoto: string;
}

export interface EventItem {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
}

export interface EventData {
  events: EventItem[];
}

export interface CountdownData {
  targetDate: string;
  targetTime: string;
  label: string;
}

export interface MessageData {
  text: string;
}

export interface GalleryData {
  images: string[];
  columns: 2 | 3;
}

export interface StoryItem {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface StoryData {
  items: StoryItem[];
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export interface BankData {
  accounts: BankAccount[];
}

export interface MapData {
  address: string;
  mapEmbedUrl: string;
}

export interface FooterData {
  text: string;
}

export type SectionData =
  | HeroData
  | CoupleData
  | EventData
  | CountdownData
  | MessageData
  | GalleryData
  | StoryData
  | BankData
  | MapData
  | FooterData;

export interface Section {
  id: string;
  type: SectionType;
  visible: boolean;
  data: SectionData;
}

export interface InvitationDoc {
  sections: Section[];
}

// ── Metadata for UI ──────────────────────────────────────────
export const SECTION_META: Record<SectionType, { label: string; icon: string; description: string }> = {
  hero:      { label: 'Ảnh bìa',         icon: '🖼️',  description: 'Ảnh cover và tiêu đề thiệp' },
  couple:    { label: 'Thông tin đôi',   icon: '💑',  description: 'Tên, ảnh cô dâu và chú rể' },
  event:     { label: 'Sự kiện',         icon: '📅',  description: 'Thời gian và địa điểm tổ chức' },
  countdown: { label: 'Đếm ngược',        icon: '⏳',  description: 'Đồng hồ đếm ngược đến ngày cưới' },
  message:   { label: 'Lời nhắn',         icon: '✉️',  description: 'Lời mời trân trọng' },
  gallery:   { label: 'Bộ sưu tập ảnh',  icon: '🖼️',  description: 'Gallery nhiều ảnh' },
  story:     { label: 'Chuyện tình yêu', icon: '💕',  description: 'Timeline các cột mốc kỷ niệm' },
  bank:      { label: 'Hộp mừng cưới',   icon: '🎁',  description: 'Thông tin tài khoản ngân hàng' },
  map:       { label: 'Bản đồ',           icon: '📍',  description: 'Địa điểm tổ chức' },
  footer:    { label: 'Lời cảm ơn',       icon: '🙏',  description: 'Lời kết và cảm ơn' },
};

// ── Factory Defaults ─────────────────────────────────────────
export function createDefaultSection(type: SectionType, indexSuffix: number | string = Date.now()): Section {
  const id = `${type}-${indexSuffix}`;
  const defaults: Record<SectionType, SectionData> = {
    hero:      { coverImage: '', title: '' },
    couple:    { groomName: '', brideName: '', groomPhoto: '', bridePhoto: '' },
    event:     { events: [{ id: `ev-${Date.now()}`, name: 'Lễ Thành Hôn', date: '', time: '', location: '' }] },
    countdown: { targetDate: '', targetTime: '', label: 'Đến ngày trọng đại' },
    message:   { text: 'Trân trọng kính mời quý khách đến dự lễ thành hôn...' },
    gallery:   { images: [], columns: 2 },
    story:     { items: [{ id: `s-${Date.now()}`, date: '', title: 'Lần đầu gặp nhau', description: '' }] },
    bank:      { accounts: [{ id: `b-${Date.now()}`, bankName: '', accountNumber: '', accountName: '' }] },
    map:       { address: '', mapEmbedUrl: '' },
    footer:    { text: 'Sự hiện diện của quý khách là niềm hạnh phúc lớn nhất của đôi chúng tôi.' },
  };
  return { id, type, visible: true, data: defaults[type] };
}

export function getDefaultSections(): Section[] {
  return [
    createDefaultSection('hero', 'default'),
    createDefaultSection('couple', 'default'),
    createDefaultSection('event', 'default'),
    createDefaultSection('countdown', 'default'),
    createDefaultSection('message', 'default'),
    createDefaultSection('bank', 'default'),
    createDefaultSection('footer', 'default'),
  ];
}
