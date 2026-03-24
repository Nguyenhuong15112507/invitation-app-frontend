'use client';

import { useEffect, useCallback, use, useState, forwardRef } from 'react';
import Link from 'next/link';
import axiosClient from '@/api/axiosClient';
import SectionRenderer from '@/components/builder/SectionRenderer';
import SongLongRenderer from '@/components/templates/SongLongRenderer';
import MinimalistRedRenderer from '@/components/templates/MinimalistRedRenderer';
import CineloveRenderer from '@/components/templates/CineloveRenderer';
import SectionEditorPanel from '@/components/builder/SectionEditorPanel';
import GlobalStyleEditor from '@/components/builder/GlobalStyleEditor';
import PreviewCanvas from '@/components/builder/PreviewCanvas';
import { Section, SectionType, SECTION_META, createDefaultSection, getDefaultSections, InvitationDoc, GlobalConfig, DEFAULT_GLOBAL_CONFIG } from '@/lib/sections';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

// ─── Helpers ─────────────────────────────────────────────────
const debounce = <T extends (...args: any[]) => any>(fn: T, ms: number) => {
  let t: NodeJS.Timeout;
  return (...a: Parameters<T>) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

type SaveState = 'idle' | 'saving' | 'saved' | 'error';
type PublishState = 'idle' | 'loading' | 'done' | 'error';

// ─── Base Section Card UI ────────────────────────────────────
interface SectionCardUIProps {
  section: Section;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
  onChangeData?: (data: any) => void;
  dragHandleProps?: any;
  dragListeners?: any;
  isOverlay?: boolean;
}

const SectionCardUI = forwardRef<HTMLDivElement, SectionCardUIProps>(({
  section,
  isExpanded,
  onToggleExpand,
  onToggleVisible,
  onDelete,
  onChangeData,
  dragHandleProps,
  dragListeners,
  isOverlay = false,
  ...props
}, ref) => {
  const meta = SECTION_META[section.type];

  return (
    <div
      ref={ref}
      {...props}
      className={`rounded-xl border transition-all duration-200 bg-white ${
        isExpanded ? 'border-rose-300 bg-rose-50/30' : 'border-gray-100'
      } ${isOverlay ? 'shadow-2xl ring-2 ring-rose-300 ring-opacity-50 scale-[1.02] z-50 cursor-grabbing' : 'shadow-sm'} overflow-hidden relative`}
    >
      {/* Section header row */}
      <div className="flex items-center gap-1 px-3 py-2.5">
        {/* Drag Handle (≡) */}
        <div
          {...dragHandleProps}
          {...dragListeners}
          className={`px-1 py-2 flex items-center justify-center ${isOverlay ? 'cursor-grabbing' : 'cursor-grab'} hover:text-gray-600 text-gray-300 touch-none`}
          title="Kéo thả để di chuyển"
        >
          <svg className="w-5 h-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8h16M4 16h16" />
          </svg>
        </div>

        {/* Icon + Label */}
        <button
          className="flex items-center gap-2 flex-1 text-left py-1"
          onClick={onToggleExpand}
        >
          <span className="text-lg pointer-events-none">{meta.icon}</span>
          <div className="pointer-events-none">
            <p className="text-[12px] font-bold text-gray-800 leading-tight">{meta.label}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{meta.description}</p>
          </div>
        </button>

        {/* Eye toggle */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleVisible(); }}
          title={section.visible ? 'Ẩn section này' : 'Hiện section này'}
          className={`text-sm p-1.5 rounded transition hover:bg-gray-100 ${section.visible ? 'text-rose-400 hover:text-rose-600' : 'text-gray-200 hover:text-gray-400'}`}
        >
          {section.visible ? '👁️' : '🙈'}
        </button>

        {/* Delete */}
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-gray-200 hover:text-red-500 hover:bg-red-50 text-xs p-1.5 rounded transition"
          title="Xóa section này"
        >
          ✕
        </button>

        {/* Expand chevron */}
        <span className={`text-gray-400 text-xs transition-transform duration-300 ml-1 ${isExpanded ? 'rotate-180 text-rose-400' : ''}`}>▾</span>
      </div>

      {/* Section editor – expanded */}
      <AnimatePresence initial={false}>
        {isExpanded && !isOverlay && onChangeData && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="border-t border-rose-100 px-4 py-4 bg-white">
              <SectionEditorPanel
                section={section}
                onChange={onChangeData}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
SectionCardUI.displayName = 'SectionCardUI';

// ─── Sortable Section Card Component ──────────────────────────
function SortableSectionCard({
  section,
  isExpanded,
  onToggleExpand,
  onToggleVisible,
  onDelete,
  onChangeData,
}: {
  section: Section;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleVisible: () => void;
  onDelete: () => void;
  onChangeData: (data: any) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <SectionCardUI
        section={section}
        isExpanded={!isDragging && isExpanded}
        onToggleExpand={onToggleExpand}
        onToggleVisible={onToggleVisible}
        onDelete={onDelete}
        onChangeData={onChangeData}
        dragHandleProps={attributes}
        dragListeners={listeners}
      />
    </div>
  );
}

// ─── Drop Animation ───────────────────────────────────────────
const dropAnimationConfig: DropAnimation = {
  ...defaultDropAnimation,
  sideEffects: defaultDropAnimation.sideEffects,
};

// ─── Main Editor Component ───────────────────────────────────
export default function BuilderEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isMounted, setIsMounted]       = useState(false);
  const [sections, setSections]         = useState<Section[]>([]);
  const [expanded, setExpanded]         = useState<string | null>(null);
  const [invStatus, setInvStatus]       = useState('TRIAL');
  const [invSlug, setInvSlug]           = useState('');
  const [templateSlug, setTemplateSlug] = useState('modern-white');
  const [saveState, setSaveState]       = useState<SaveState>('idle');
  const [publishState, setPublishState] = useState<PublishState>('idle');
  const [addMenuOpen, setAddMenuOpen]   = useState(false);
  const [activeId, setActiveId]         = useState<string | null>(null);
  
  const [globalConfig, setGlobalConfig] = useState<GlobalConfig>(DEFAULT_GLOBAL_CONFIG);
  const [activeTab, setActiveTab]       = useState<'content' | 'style'>('content');
  const [previewMode, setPreviewMode]   = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ── Load invitation data on mount ────────────────────────────
  useEffect(() => {
    axiosClient.get('/invitations/my').then((res) => {
      const inv = res.data.find((i: any) => String(i.id) === id);
      if (!inv) {
        setSections(getDefaultSections());
        setExpanded('hero-default');
        return;
      }
      setInvStatus(inv.status);
      setInvSlug(inv.slug ?? '');
      setTemplateSlug(inv.template?.slug ?? 'modern-white');
      try {
        const doc: InvitationDoc = JSON.parse(inv.configJson);
        if (doc?.sections?.length) {
          setSections(doc.sections);
          setExpanded(doc.sections[0].id);
        } else {
          setSections(getDefaultSections());
          setExpanded('hero-default');
        }
        if (doc?.globalConfig) setGlobalConfig(doc.globalConfig);
      } catch {
        setSections(getDefaultSections());
        setExpanded('hero-default');
      }
    }).catch(() => {
      setSections(getDefaultSections());
      setExpanded('hero-default');
    });
  }, [id]);

  // ── Autosave ──────────────────────────────────────────────────
  const debouncedSave = useCallback(
    debounce(async (secs: Section[], gConf: GlobalConfig, invId: string) => {
      setSaveState('saving');
      try {
        const configJson: InvitationDoc = { sections: secs, globalConfig: gConf };
        await axiosClient.put(`/invitations/${invId}`, { configJson });
        setSaveState('saved');
        setTimeout(() => setSaveState('idle'), 2500);
      } catch {
        setSaveState('error');
      }
    }, 1500),
    []
  );

  useEffect(() => { 
    if (sections.length > 0) {
      debouncedSave(sections, globalConfig, id); 
    }
  }, [sections, globalConfig, debouncedSave, id]);

  // ── Drag & Drop handlers ──────────────────────────────────────
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (over && active.id !== over.id) {
      setSections((prev) => {
        const oldIndex = prev.findIndex((s) => s.id === active.id);
        const newIndex = prev.findIndex((s) => s.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const updateSectionData = (sectionId: string, newData: any) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, data: newData } : s));
  };

  const toggleVisible = (sectionId: string) => {
    setSections(prev => prev.map(s => s.id === sectionId ? { ...s, visible: !s.visible } : s));
  };

  const deleteSection = (sectionId: string) => {
    setSections(prev => prev.filter(s => s.id !== sectionId));
    if (expanded === sectionId) setExpanded(null);
  };

  const addSection = (type: SectionType) => {
    const newSec = createDefaultSection(type, Date.now());
    setSections(prev => [...prev, newSec]);
    setExpanded(newSec.id);
    setAddMenuOpen(false);
  };

  const handlePublish = async () => {
    setPublishState('loading');
    try {
      await axiosClient.put(`/invitations/${id}/publish`);
      setInvStatus('PAID');
      setPublishState('done');
    } catch { setPublishState('error'); }
  };

  const existingTypes = new Set(sections.map(s => s.type));
  const addableTypes = (Object.keys(SECTION_META) as SectionType[]).filter(
    t => !existingTypes.has(t) || ['event', 'bank', 'gallery', 'story', 'message'].includes(t)
  );

  const previewSections = isMounted ? sections : [];
  const activeSection = sections.find(s => s.id === activeId);

  if (!isMounted) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-rose-400 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans select-none">
      {/* ── Left: Sidebar Builder ── */}
      <div className={`w-[440px] flex-shrink-0 bg-white border-r flex flex-col z-20 shadow-xl relative ${previewMode ? 'hidden' : ''}`}>

        {/* Static Header */}
        <div className="px-6 py-5 border-b bg-white z-30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-black text-gray-900 tracking-tight">Cấu trúc Thiệp</h1>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5 opacity-70">ID: {id} • SLUG: {invSlug || 'loading'}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Status</p>
                <p className={`text-[11px] font-black ${saveState === 'error' ? 'text-red-500' : 'text-rose-500'}`}>
                   {saveState === 'saving' ? 'SAVING...' : saveState === 'saved' ? 'SYNCED ✓' : 'IDLE'}
                </p>
              </div>
              <button
                onClick={handlePublish}
                disabled={publishState === 'loading' || invStatus === 'PAID'}
                className={`px-5 py-2 rounded-xl text-[12px] font-black transition-all shadow-lg ${
                  invStatus === 'PAID'
                    ? 'bg-green-500 text-white cursor-default'
                    : 'bg-rose-600 text-white hover:bg-rose-700 active:scale-95 disabled:opacity-50'
                }`}
              >
                {invStatus === 'PAID' ? 'PUBLISHED' : 'PUBLISH'}
              </button>
            </div>
          </div>
          <div className="flex bg-gray-100 p-1 mt-4 rounded-lg">
            <button onClick={() => setActiveTab('content')} className={`flex-1 py-1.5 text-xs font-bold rounded-md ${activeTab === 'content' ? 'bg-white shadow text-rose-600' : 'text-gray-500'}`}>NỘI DUNG</button>
            <button onClick={() => setActiveTab('style')} className={`flex-1 py-1.5 text-xs font-bold rounded-md ${activeTab === 'style' ? 'bg-white shadow text-rose-600' : 'text-gray-500'}`}>TUỲ CHỈNH</button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-3 bg-gray-50/80 border-b flex items-center justify-between text-[11px] font-bold text-gray-500 z-30">
          <div className="flex gap-4">
            {invSlug ? (
              <Link href={`/${invSlug}`} target="_blank" className="text-blue-600 hover:text-blue-800 flex items-center gap-1.5 transition-colors">
                <span className="text-sm">🔗</span> TRANG PUBLIC
              </Link>
            ) : (
              <span className="text-gray-300 flex items-center gap-1.5 grayscale cursor-not-allowed">
                <span className="text-sm">🔗</span> TRANG PUBLIC (Loading...)
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-sm">⇅</span> KÉO THẢ ĐỂ ĐỔI THỨ TỰ
          </div>
        </div>

        {/* Draggable List */}
        {activeTab === 'content' && (
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 no-scrollbar bg-gray-50/30 relative">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={() => setActiveId(null)}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
          >
            <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {sections.map(section => (
                  <SortableSectionCard
                    key={section.id}
                    section={section}
                    isExpanded={expanded === section.id}
                    onToggleExpand={() => setExpanded(expanded === section.id ? null : section.id)}
                    onToggleVisible={() => toggleVisible(section.id)}
                    onDelete={() => deleteSection(section.id)}
                    onChangeData={(newData) => updateSectionData(section.id, newData)}
                  />
                ))}

                {/* Add Menu */}
                <div className="relative pt-4">
                  <button
                    onClick={() => setAddMenuOpen(v => !v)}
                    className="w-full py-4 border-2 border-dashed border-rose-200 rounded-2xl text-rose-500 text-sm font-black hover:bg-rose-50 hover:border-rose-400 transition-all active:scale-[0.98] shadow-sm bg-white"
                  >
                    + THÊM ELEMENT MỚI
                  </button>
                  {addMenuOpen && (
                    <div className="absolute bottom-full mb-3 left-0 right-0 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 p-3 grid grid-cols-2 gap-2 animate-in zoom-in-95 duration-200">
                      {addableTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => addSection(type)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-rose-50 text-left transition-all border border-transparent hover:border-rose-100 group"
                        >
                          <span className="text-2xl group-hover:scale-110 transition-transform">{SECTION_META[type].icon}</span>
                          <span className="text-[11px] font-black text-gray-700 tracking-tight uppercase leading-none">{SECTION_META[type].label}</span>
                        </button>
                      ))}
                      {addableTypes.length === 0 && (
                        <div className="col-span-2 p-4 text-center text-xs text-gray-400 italic">
                          Bạn đã thêm đầy đủ các thành phần!
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </SortableContext>

            {/* Drag Overlay - renders a ghost/portal element while dragging */}
            <DragOverlay dropAnimation={dropAnimationConfig}>
              {activeSection ? (
                <div className="w-[392px]"> {/* Match current width roughly minus padding */}
                  <SectionCardUI
                    section={activeSection}
                    isExpanded={false}
                    onToggleExpand={() => {}}
                    onToggleVisible={() => {}}
                    onDelete={() => {}}
                    isOverlay
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
        )}

        {/* Style & Music Builder */}
        {activeTab === 'style' && (
          <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50/30">
             <GlobalStyleEditor config={globalConfig} onChange={setGlobalConfig} />
          </div>
        )}
      </div>

      {/* ── Right: Device Preview ── */}
      <div className="flex-1 bg-[#F1F0EF] flex flex-col items-center justify-start pt-10 pb-20 overflow-y-auto no-scrollbar relative">
        <div className="sticky top-0 z-30 w-full flex justify-center pb-8 pt-4 -mt-10 bg-gradient-to-b from-[#F1F0EF] via-[#F1F0EF]/80 to-transparent pointer-events-none">
          <div className="px-6 py-2 bg-white/90 backdrop-blur-md rounded-full border border-gray-100 shadow-xl flex items-center gap-3 pointer-events-auto cursor-pointer" onClick={() => setPreviewMode(!previewMode)}>
            <span className={`flex h-2 w-2 rounded-full ${previewMode ? 'bg-purple-500' : 'bg-green-500'} animate-pulse`}></span>
            <span className="text-[10px] font-black text-gray-800 uppercase tracking-widest">{previewMode ? 'Thoát Preview Mode (Esc)' : 'Xem Demo (Preview)'}</span>
          </div>
        </div>

        {/* --- Unified Preview Canvas --- */}
        <PreviewCanvas height="min-h-[880px]">
          {templateSlug === 'song-long-do' ? (
            <SongLongRenderer sections={previewSections} globalConfig={globalConfig} />
          ) : templateSlug === 'minimalist-red' ? (
            <MinimalistRedRenderer sections={previewSections} globalConfig={globalConfig} />
          ) : templateSlug === 'cinelove-premium' ? (
            <CineloveRenderer sections={previewSections} globalConfig={globalConfig} />
          ) : (
            <SectionRenderer sections={previewSections} globalConfig={globalConfig} />
          )}
        </PreviewCanvas>

        {/* helper text */}
        <p className="mt-8 text-xs font-bold text-gray-400 opacity-50 uppercase tracking-[0.3em]">
          Powered by Chungdoi Builder Engine
        </p>
      </div>
    </div>
  );
}
